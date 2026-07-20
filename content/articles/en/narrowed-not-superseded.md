---
title: "BullMQ in Rust: what the official client leaves me to build"
date: "2026-07-19T09:00:00.000Z"
categories:
  - "dev"
tags:
  - "rust"
  - "redis"
  - "bullmq"
  - "queues"
description: "BullMQ shipped an official Rust client. The community port I helped build still beats it on parallel adds. On what fresh eyes can and cannot win."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/bullmq-rust-official-vs-bullmq-rs-cover.png"
lang: "en"
---

The team that makes BullMQ shipped an official Rust client. The community port I've contributed to since before that client existed beats it on parallel adds — about 118,000 jobs a second to its 95,000, same machine, same Redis, same payloads.

That number is the point of this piece. Not because a benchmark win decides which client you should use — it doesn't, and I'll tell you to pick the official one for most systems anyway — but because of who found the faster path and how. `bullmq-rs` is not the work of the BullMQ team. It's a port, built from the outside, from nothing but the wire format and the published Lua scripts, months before an official Rust client was available. I put real work into that wire compatibility: the scripts, the state transitions, the parts of the protocol a README never mentions.

So when [`bullmq-official`](https://bullmq.io/news/260712/rust-release/) shipped, the reasonable assumption was that the port was finished — superseded by the people who own the protocol. I went looking for a real answer instead of a comfortable one, and the answer turned out to be more specific: on the axis that belongs to the owners, the port never had a chance. On the axes where it was free to think for itself, it's ahead — in one place, measurably.

## What fresh eyes found

Porting a system you didn't design forces an unusual way of reading it. The original team carries five years of accumulated intent; a porter has only what crosses the wire. Nothing is habit yet. Every command the client sends has to be justified from scratch — and sometimes the justification comes up short, so you do it differently.

That's how `bullmq-rs` ends up reserving job ids the way it does: its bulk path claims every id it needs with a single `INCRBY`, one fewer Redis command per job than the official client spends. Nobody told the port how it was supposed to be done, so it did something the original never bothered to.

It's also how it ends up ahead on parallel adds. When a producer fires adds concurrently, the port's connection multiplexes them measurably better than the official client's — the number at the top of this piece. The plumbing an outsider built from scratch, holding up against plumbing the protocol's owners had years to tune, and winning on this path.

And it's how the worker ended up generic where the official one deliberately isn't: `Worker<T>` / `Job<T>`, with `T` deserialized into your own Rust type.

```rust
#[derive(Serialize, Deserialize)]
struct SendInvoice {
    customer_id: CustomerId,
    invoice_id: InvoiceId,
}
```

The official processor hands you a `Job` and expects a `serde_json::Value` back — friendlier for FFI and cross-language neutrality, but schema validation becomes your problem. The trade-off is real: a heterogeneous queue (`send-email`, `generate-pdf`, `sync-customer`) maps more naturally to the untyped `Value`, and with `bullmq-rs` you'd wrap the variants in an enum — usually a *good* design, but a stronger opinion than BullMQ itself imposes. For a Rust-only service, the typed side is simply the better API. An official client couldn't have made that choice: it has to stay legible across Node, Python, Elixir, and Rust at once. A fork answers to one language, so it gets to be opinionated.

None of these came from being smarter than the BullMQ team. They came from not being the BullMQ team.

## What ownership still wins

The counterweight is just as concrete: `bullmq-official` owns the protocol.

```text
BullMQ changes protocol
       │
       ├──► bullmq-official
       │      same repository, same scripts, coordinated release
       │
       └──► bullmq-rs
              notice → port scripts → update marshalling → update tests → release
```

Both libraries are clients around a Redis state machine of Lua scripts. The hard part of BullMQ isn't `Queue::add()`; it's preserving atomic transitions across `wait`, `active`, `delayed`, `completed`, `failed`, priority sets, locks, dedup keys, schedulers, rate-limit keys, and parent dependencies. `bullmq-official` lives in the main BullMQ repo and uses the *same scripts* as the Node, Python and Elixir clients — change a script and the Rust client ships in the same release. `bullmq-rs` independently vendors those scripts and has to chase every upstream change forever. It does that well (23 ported scripts, bidirectional Node↔Rust CI), but "forever" is the cost, and over five years it becomes the whole maintenance budget.

Fresh eyes cut the other way here too. Auditing our own worker loop, I found a double-execution race: under saturation, a job claimed before the worker had capacity to run it could outwait its Redis lock, get re-queued by the stalled-job check, and execute twice — emails sent twice, cards charged twice. I wrote a [failing test that reproduces it](https://github.com/bogardt/bullmq-rs/blob/ea1e3457be366ed004f885095753be1a32e49327/tests/lock_renewal_race.rs) and [proposed the fix](https://github.com/bogardt/bullmq-rs/pull/21) — reserve capacity first, then claim, the ordering the official client already had. Routine maintenance a fork owes its users, and a reminder of what carrying a distributed-state protocol without its designers actually means: in a queue, the client is not a thin wrapper around Redis. It participates in the protocol that decides whether work is claimed, retried, recovered, or run again.

## The benchmark nobody had run

The official announcement benchmarks its Rust client against Node.js (≈6,900 jobs/s sequential, up to 27,000 jobs/s at high concurrency on an M2 Pro), not against `bullmq-rs`. There was no head-to-head between the two, so I ran one — same Redis, same payloads, same scenarios as the official suite, raw data committed: [bullmq-rust-bench](https://github.com/enricodeleo/bullmq-rust-bench).

On an M4, the median of five runs: the official client leads sequential adds (≈18.3k vs ≈13–15k jobs/s); `bullmq-rs` wins parallel adds (≈118k vs ≈95k); and under a steady producer both sit at sub-millisecond p50 latency. These are localhost measurements of client-side overhead, not production capacity figures.

Bulk adds are where five years of profiling shows. `bullmq-rs` is cleverer on paper there too — the single-`INCRBY` id reservation, one fewer Redis command per job — and still loses 2.6×. The reason is scheduling, not the wire: the port's `add_bulk` awaits each job's script call in a for-loop, one round trip at a time, while the official client builds every call up front and runs them concurrently over its multiplexed connection — its source even says so: "Run all add_job calls concurrently since the connection is multiplexed." The port has the same capability, proven by its own parallel-add win, and doesn't spend it in its own bulk path. Design insight and profiling discipline are different assets. The fork has the first; the owners have the second.

The other dramatic gap — draining a pre-filled queue — is a single 5-second `BZPOPMIN` cold-start stall in the port's fetch loop, not slow processing; once it wakes, it drains at a rate comparable to the official client. And Redis commands per job came out identical everywhere, which is worth sitting with: the official client's edge is not wire efficiency, it is orchestration — except on the one path where the port already orchestrates better.

## The rest, in one table

| Dimension | `bullmq-official` | `bullmq-rs` | Edge |
| --- | --- | --- | --- |
| BullMQ wire compatibility | Canonical upstream | Independently maintained | **Official** |
| Lua/state-transition correctness | Same upstream scripts, same repo | Ported/vendored v5 scripts | **Official** |
| Rust payload typing | `serde_json::Value` | Generic `Job<T>` / `Worker<T>` | **bullmq-rs** |
| Parallel-add throughput (measured) | ≈95k jobs/s | ≈118k jobs/s | **bullmq-rs** |
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

## So which should you actually use?

**Use the official client** when BullMQ compatibility is the contract, when workers need to coexist across languages, or when you do not want to validate Redis-level compatibility yourself. The win is not that its Rust is inherently better today — on at least one measured path it is not — but that one team owns the protocol and every client.

**Use `bullmq-rs`** when the application is mostly Rust, when compile-time typed payloads matter to you, when your producers add in parallel, or when you're willing to own protocol-conformance testing. Its `Job<T>` and its parallel-add path are real advantages, not cosmetic ones.

And if you already run `bullmq-rs` in production, don't migrate just because an official crate appeared. The official Redis semantics have pedigree, but its Rust orchestration is brand new.

## What I'm doing with bullmq-rs from here

The first item is the one the benchmark hands me: make `add_bulk` use the multiplexing the parallel-add path already proves — build every call up front, run them concurrently. The capability exists; it just isn't spent everywhere yet.

Then the typed side of the contract: typed input *and* typed output (`Worker<TInput, TOutput>`), ergonomic enums, structured errors, Tokio-native cancellation — the places a single-language client can move faster and be more opinionated than one built to stay uniform across four runtimes.

Parity with upstream stays table stakes: version-map releases to BullMQ, port every script change, keep the bidirectional CI honest, ship fixes like the race repair. That work doesn't justify the fork. The other work does.

Not superseded — narrowed. The state machine belongs to the team that wrote it, and for most systems their client is the right default. What the port keeps is the thing it had before there was an official client at all: the freedom to look at the same wire with no habits, and sometimes find the faster way through it.

## Sources

- [Announcing BullMQ for Rust (official)](https://bullmq.io/news/260712/rust-release/)
- [taskforcesh/bullmq — `rust/src/worker.rs`](https://github.com/taskforcesh/bullmq/blob/master/rust/src/worker.rs) (official worker architecture)
- [bogardt/bullmq-rs — `src/worker.rs`](https://github.com/bogardt/bullmq-rs/blob/main/src/worker.rs)
- [bogardt/bullmq-rs — `BULLMQ_V5_PARITY.md`](https://github.com/bogardt/bullmq-rs/blob/main/BULLMQ_V5_PARITY.md)
- [bogardt/bullmq-rs — fix PR #21](https://github.com/bogardt/bullmq-rs/pull/21)
- [bogardt/bullmq-rs (repo)](https://github.com/bogardt/bullmq-rs)
- [enricodeleo/bullmq-rust-bench](https://github.com/enricodeleo/bullmq-rust-bench) (the head-to-head benchmark: methodology, raw data, summary tables)
