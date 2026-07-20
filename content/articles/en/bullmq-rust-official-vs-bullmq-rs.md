---
title: "BullMQ in Rust: bullmq-official vs bullmq-rs"
date: "2026-07-19T09:00:00.000Z"
categories:
  - "dev"
tags:
  - "rust"
  - "redis"
  - "bullmq"
  - "queues"
description: "A lock-expiry race in bullmq-rs can execute a job twice. I reproduced it, compared both Rust clients, and found where the community port still wins."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/bullmq-rust-official-vs-bullmq-rs-cover.png"
lang: "en"
---

A queue worker that claims a job before it has capacity to run it can execute that job twice.

Its Redis lock expires while it waits behind a saturated worker. The stalled-job check puts it back on the queue. A second worker runs it. Then the first worker gets capacity and runs the stale in-memory copy it was already holding. One job, two executions — emails sent twice, cards charged twice, state written twice.

I found exactly that race in `bullmq-rs`, the Rust port of BullMQ I've contributed to since before there was an alternative. Months before BullMQ shipped its own Rust client, `bullmq-rs` was the only way to run Rust workers against a BullMQ queue, and I'd put real work into its wire compatibility — the Lua scripts, the state transitions, the parts of the protocol a README never mentions. Then BullMQ shipped [`bullmq-official`](https://bullmq.io/news/260712/rust-release/), built by the team that owns that protocol.

That's the question this piece actually answers, and it's narrower than "which client is better": does the port still deserve the effort, or did the official client make it moot? I went looking for a real answer instead of a comfortable one, and found the race along the way — reproduced in [PR #21](https://github.com/bogardt/bullmq-rs/pull/21), which proposes the repair. At the time of writing, that PR is open: this is a defect in a crate I helped build, not a victory lap about a fix that has shipped.

That incident clarified a distinction that feature checklists tend to hide: in a distributed queue, the client is not a thin wrapper around Redis. It participates in the protocol that decides whether work is claimed, retried, recovered, or run again. The API can be elegant and still be the wrong thing to trust with side effects.

BullMQ has been my default queue for about five years, keeping request paths small — work that doesn't need to determine the HTTP response goes to the queue. `bullmq-rs` is where I put that experience into Rust. This is not a neutral audit: I have helped build one side of the comparison. But the conclusion held up anyway.

**For a new system where BullMQ compatibility is the contract, use the official client.** Not because its Rust orchestration has had more time in production — it has not — but because its authors own the state-transition protocol. For a Rust-only system, `bullmq-rs` still has the better type ergonomics. Those are different kinds of confidence, and only one of them was ever a fight fresh eyes could win against the team that writes the scripts.

The race, the type trade-off, and a benchmark of both clients are what actually answered my question.

## A double-execution race in the worker loop

This is where the audit started, and finding it in code I'd helped write was not a comfortable moment.

The official worker creates N fetch/process loops. Each loop first reserves its concurrency slot and **then** executes the Redis fetch/`moveToActive` path. When `moveToFinished` returns another job, the worker can chain straight into it without another round trip.

```text
official

acquire capacity
      │
      ▼
 moveToActive
      │
      ▼
   process
      │
      ▼
moveToFinished ──► next job
```

`bullmq-rs` v2.2.0 did those steps in the opposite order. Its main loop called `moveToActive` — claiming the job and taking the Redis lock — and only *then* waited for a semaphore permit. Worse, it inserted the job id into `active_jobs` (the set the lock-extender renews every `lock_duration/2`) only *after* the permit landed, inside the spawned task.

```text
bullmq-rs (≤ 2.2.0)

 moveToActive  ◄── job is ACTIVE + locked, lock timer running
      │
      ▼
wait for semaphore   ◄── can block here; lock NOT being renewed
      │
      ▼
register active job
      │
      ▼
    process
```

I've confirmed this against `bullmq-rs/src/worker.rs` @ 2.2.0: `move_to_active` (the fetch loop) → `semaphore.acquire_owned()` ("may block if at concurrency limit") → job inserted into `active_jobs` only inside the spawned task. The lock extender renews only the ids in `active_jobs`, every `lock_duration/2`.

### Why this is a real bug

```text
concurrency = 10
lockDuration = 30s
10 handlers are busy for 60s
```

The fetch loop claims job #11 through `moveToActive`, then blocks waiting for a permit. Job #11 is only added to `active_jobs` — the set the lock extender reads — *after* the permit arrives.

> **If job #11 waits for capacity longer than its lock duration, its lock is not renewed, even though the worker has already transitioned it to `active`.**

The stalled check then assumes the job was abandoned, re-queues it, and another worker picks it up and runs it. Meanwhile the original worker still holds the in-memory `Job<T>` — and once a slot frees up, it runs that stale copy too. **One job, two executions.** In default config that needs the worker saturated and a job waiting past `lockDuration`; uncommon, but exactly what sustained load produces. And jobs have side effects — emails sent, cards charged, rows written.

I wrote a repro: [`tests/lock_renewal_race.rs`](https://github.com/bogardt/bullmq-rs/blob/ea1e3457be366ed004f885095753be1a32e49327/tests/lock_renewal_race.rs) — two workers, `concurrency=1`, short `lockDuration`, a blocker holding the permit while the victim is claimed and left unrenewed. On v2.2.0 the victim is processed **twice**. [PR #21](https://github.com/bogardt/bullmq-rs/pull/21) proposes the correct ordering — permit before claim — and adds that file as an ignored, Redis-backed regression test. It becomes a fix for users only when it is merged and released.

The fix itself was straightforward: reserve capacity first, then claim, mirroring the official ordering. The harder question was what the bug implied about the port's odds against a team that owns the protocol outright.

## Why the official client wins anyway

Despite that fix being simple, `bullmq-official` has one overwhelming advantage that has little to do with API taste or who found which bug first: **it owns the protocol.**

```text
BullMQ changes protocol
       │
       ├──► bullmq-official
       │      same repository, same scripts, coordinated release
       │
       └──► bullmq-rs
              notice → port scripts → update marshalling → update tests → release
```

Both libraries are clients around a Redis state machine of Lua scripts. The hard part of BullMQ isn't `Queue::add()`; it is preserving atomic transitions across `wait`, `active`, `delayed`, `completed`, `failed`, priority sets, locks, dedup keys, schedulers, rate-limit keys, and parent dependencies. `bullmq-official` lives in the main BullMQ repo and uses the *same scripts* as the Node, Python and Elixir clients — change a script and the Rust client ships in the same release. `bullmq-rs` independently vendors v5 scripts and has to chase every upstream change forever. It does that well (23 ported scripts, bidirectional Node↔Rust CI), but "forever" is the cost.

That gap is tiny when maintainers are active. Over five years, it becomes the maintenance budget. It's also the honest answer to whether `bullmq-rs` still needs to compete on wire compatibility: no. That was never a fight fresh eyes were going to win against the team that writes the scripts.

## The one thing bullmq-rs got right: typed jobs

The port isn't just a slower-moving shadow of the original, though. There's one place fresh eyes did better than battle-tested experience: typed jobs.

It makes the worker generic: `Worker<T>` / `Job<T>`, with `T` deserialized into your own Rust type. The official client deliberately doesn't — its processor hands you a `Job` and expects a `serde_json::Value` back, which is friendlier for FFI and cross-language neutrality but pushes schema validation into your code. I prefer the typed side for something like:

```rust
#[derive(Serialize, Deserialize)]
struct SendInvoice {
    customer_id: CustomerId,
    invoice_id: InvoiceId,
}
```

You get compile-time expectations and one predictable deserialization boundary. The trade-off is real: a heterogeneous queue (`send-email`, `generate-pdf`, `sync-customer`) maps more naturally to the official's untyped `Value`; with `bullmq-rs` you'd wrap the variants in an enum, which is usually a *good* design but is a stronger opinion than BullMQ itself imposes.

**My take:** for a Rust-only service, `bullmq-rs` has the nicer API. For a polyglot shared queue, the official client's neutrality is arguably more appropriate.

## The rest, in one table

| Dimension | `bullmq-official` | `bullmq-rs` | Edge |
| --- | --- | --- | --- |
| BullMQ wire compatibility | Canonical upstream | Independently maintained | **Official** |
| Lua/state-transition correctness | Same upstream scripts, same repo | Ported/vendored v5 scripts | **Official** |
| Rust payload typing | `serde_json::Value` | Generic `Job<T>` / `Worker<T>` | **bullmq-rs** |
| Worker return values | Native JSON return value | Handler returns `Result<()>`, return hardcoded `{}` | **Official** |
| Worker fetch architecture | Concurrency slot before fetch; N loops | Central loop; claim before capacity in v2.2.0 (fix pending) | **Official today** |
| `wait_until_finished` | Intentionally absent | Implemented | **bullmq-rs** |
| Dynamic concurrency | Implemented | Fixed builder concurrency | **Official** |
| TLS (`rediss://`) | Supported | Not in current manifest | **Official** |
| Worker-level rate limiting and metrics | Implemented | Implemented | **Tie** |
| Dynamic/global limits, Prometheus, worker inspection | Implemented | Missing or narrower | **Official** |
| Long-term maintenance risk | Low protocol-drift risk | Must chase upstream | **Official** |
| Rust-runtime maturity | Very new | Independent track record | **Too early to call** |

For completeness: the official client also leads on dynamic/global rate limiting, Prometheus export, and worker inspection; `bullmq-rs` uniquely ships `wait_until_finished`, which the official client omits on purpose as a production footgun.

## The benchmark changes the diagnosis, not the decision

The official announcement benchmarks its Rust client against Node.js (≈6,900 jobs/s sequential, up to 27,000 jobs/s at high concurrency on an M2 Pro), not against `bullmq-rs`. There was no head-to-head between the two, so I ran one — same Redis, same payloads, same scenarios as the official suite, raw data committed: [bullmq-rust-bench](https://github.com/enricodeleo/bullmq-rust-bench).

The comparison covers `bullmq-official` 1.1.0, released `bullmq-rs` 2.2.0, and an unreleased build with the race fix applied. On an M4, the median of five runs says: the official client leads sequential adds (≈18.3k vs ≈13–15k jobs/s); `bullmq-rs` wins parallel adds (≈118k vs ≈95k jobs/s); and under a steady producer both sit at sub-millisecond p50 latency. These are localhost measurements of client-side overhead, not production capacity figures.

Bulk adds are where the comparison stops being about numbers and starts being about years. `bullmq-rs` is cleverer on paper there — it reserves every job id with a single `INCRBY`, one fewer Redis command per job — and still loses 2.6×. Both sources say why: the port's `add_bulk` awaits each job's script call in a for-loop, one round trip at a time, while the official's builds all the calls and runs them concurrently over its multiplexed connection — the code even carries the comment "for maximum throughput". A port can reach protocol parity, even out-optimize the visible metric. Knowing where to spend concurrency is what five years of profiling buys, and it lives in exactly the lines a feature checklist never shows.

The other dramatic gap — worker throughput on a pre-filled queue — is not slow processing but a single 5-second `BZPOPMIN` cold-start stall in the `bullmq-rs` fetch loop. After it wakes, it drains at a rate comparable to the official client. The patched build avoided that stall in three of five runs at concurrency 100, but not in the concurrency-10 scenario, so it is not a repair for the underlying cold-start behavior. And Redis commands per job came out identical everywhere, which is worth sitting with: the official client's edge is not wire efficiency, it is orchestration. The parallel-add win shows the trade still cuts both ways.

## So which should you actually use?

**Use the official client** when BullMQ compatibility is the contract, when workers need to coexist across languages, or when you do not want to validate Redis-level compatibility yourself. The win is not that its Rust is inherently better today — its orchestration is new — but that one team owns the protocol and every client.

**Use `bullmq-rs`** when the application is mostly Rust and compile-time typed payloads matter to you, when you want `wait_until_finished`, or when you're willing to own protocol-conformance testing. Its `Job<T>` is a real advantage, not cosmetic.

And if you already run `bullmq-rs` in production, don't migrate just because an official crate appeared. The official Redis semantics have pedigree, but its Rust orchestration is brand new.

## What I'm doing with bullmq-rs from here

Getting the race repair merged and released is the immediate task. Past that, I'm treating `bullmq-rs` as a compatibility contract rather than a feature race it can win: version-map releases to upstream BullMQ, port every script and API change, and make bidirectional Node↔Rust checks the evidence behind every compatibility claim. Upstream owns the protocol; my job is to make drift from it visible and expensive, not to pretend the port can out-run it.

The opportunity is the typed side of that contract — typed input *and* typed output (`Worker<TInput, TOutput>`), ergonomic enums, structured errors, Tokio-native cancellation. Parity gets users through the door; a better Rust API is the reason to stay.

That's the answer to the question I started with. Not superseded — narrowed. A queue doesn't care whether its client has a pleasant API when it decides a lost job is safe to rerun; it cares about the state machine, and that one belongs to the team that wrote it. What's still mine to build is a faithful, well-typed way to work with it.

## Sources

- [Announcing BullMQ for Rust (official)](https://bullmq.io/news/260712/rust-release/)
- [taskforcesh/bullmq — `rust/src/worker.rs`](https://github.com/taskforcesh/bullmq/blob/master/rust/src/worker.rs) (official worker architecture)
- [bogardt/bullmq-rs — `src/worker.rs`](https://github.com/bogardt/bullmq-rs/blob/main/src/worker.rs)
- [bogardt/bullmq-rs — `BULLMQ_V5_PARITY.md`](https://github.com/bogardt/bullmq-rs/blob/main/BULLMQ_V5_PARITY.md)
- [bogardt/bullmq-rs — fix PR #21](https://github.com/bogardt/bullmq-rs/pull/21)
- [bogardt/bullmq-rs (repo)](https://github.com/bogardt/bullmq-rs)
- [enricodeleo/bullmq-rust-bench](https://github.com/enricodeleo/bullmq-rust-bench) (the head-to-head benchmark: methodology, raw data, summary tables)
