---
title: "A port is not a translation"
description: "Porting BullMQ to Rust taught me that the real interface of a system is never its API. It's whatever crosses the boundary — and someone is always watching it."
date: "2026-07-12T09:00:00.000Z"
categories:
  - "dev"
  - "open-source"
tags:
  - "rust"
  - "bullmq"
  - "open-source"
  - "porting"
  - "engineering"
  - "english"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/linterfaccia-che-non-si-vede.png"
sticky: false
---

_A port is not a translation. It's an exercise in discovering what, in a system, is actually the contract. It's almost never what you think._

_(This is an English adaptation of my Italian essay [L'interfaccia che non si vede](/bullmq-rs-porting).)_

A while ago a PR I opened against [`bullmq-rs`](https://github.com/bogardt/bullmq-rs) — a Rust implementation of BullMQ — got merged upstream. The diff is large: roughly eleven thousand lines added, two thousand removed, shipped as a breaking v2.0.0 release.

Rereading the PR description after the fact, I realized the most informative section wasn't the list of what the PR included. It was the list of **what I had deliberately left out**.

That's the only part worth writing about.

## What happened

BullMQ is a Node library for distributed queues on top of Redis. It's widely used, it has a mature ecosystem around it — Bull Board, dashboards, monitoring — and it has a de facto specification for how data is structured inside Redis. There is no formal standard: there's the library's code, and there's the behavior that external tooling expects to observe.

`bullmq-rs` is the Rust implementation. The idea is simple: if you want workers in Rust, you should be able to write workers in Rust without rebuilding the infrastructure around them. The dashboard stays. Jobs created from Node are readable from Rust, and vice versa. Metrics keep working. You migrate one service at a time without turning anything else off.

In the previous version of the library, the Rust API had converged toward BullMQ's — but the **wire format**, the exact shape of the data landing in Redis, diverged in subtle ways. Lists where there should have been sorted sets. Hash fields with different names. Stream events whose payloads didn't match what Node tooling expects to read.

The concrete result: external tooling didn't work. Bull Board couldn't inspect queues created from Rust — Redis answered its list operations with `WRONGTYPE`. A Node worker sharing a queue with a Rust worker couldn't see the other's jobs. (That was [the issue](https://github.com/bogardt/bullmq-rs/issues/2) that started all of this.)

The Rust API was clean. What came out of Redis was something else.

## The scenario this is for

To be concrete, the typical scenario looks like this.

You run a Node system with BullMQ in production. It works. Bull Board shows you the queues, the alerts are wired, the SRE knows where to look when something smokes at night.

At some point one job type stops keeping up. Video encoding. Image processing. A CPU-bound pipeline. The Node worker does what it can, but the throughput isn't there anymore. You'd like to rewrite _just that worker_ in Rust and leave the rest of the infrastructure where it is.

Without wire compatibility you have two options. Rewrite everything in Rust and lose the Node tooling. Or maintain a translation layer between the two, and carry the complexity of keeping it aligned with every BullMQ release.

With wire compatibility there's a third option. The same job produced by a Node producer gets processed by a Rust worker. The dashboard doesn't know two runtimes are calling it. The metrics don't change shape. The SRE paged at 3 AM sees exactly what they saw before.

There's also a property that emerges naturally in Rust and simply doesn't exist in Node: the job payload is typed. You write `Job<EncodingTask>` and the worker receives an `EncodingTask` already deserialized and checked at compile time. Change the schema and the compiler stops you before the deploy. For jobs where payload correctness actually matters — payments, expensive side effects, critical state transitions — that's a concrete guarantee, not an aesthetic detail.

It's not a keynote use case. It's the kind that matters after the deploy.

## Hyrum's Law, applied to porting

There's a formulation attributed to Hyrum Wright, who spent years at Google working on large-scale refactoring tooling:

> _With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody._

With enough users, **what you claim to promise doesn't matter**. What matters is everything the system does, including the parts you never would have chosen to promise. Somebody, somewhere, is leaning on every one of them.

In a port, this has a very precise corollary: the real interface of the system you're porting **is not its API**. It's the set of externally observable behaviors — data structures, serialization formats, side effects, event ordering — that someone outside the system has built on to make their own things work.

For BullMQ, that interface is the Redis layout. Not a function signature. The exact shape of a hash, of a sorted set, of a stream entry.

When you port a system like this, every choice falls into one of two categories:

1. **What you cannot change** — the wire format. Changing it breaks everything sitting on top without the caller noticing, until the next deploy when they discover the dashboard is empty or half the jobs are missing.
2. **What you can change** — the API in the target language. That one is free. Nobody outside is observing it.

Confusing the two categories is the most reliable way to produce a port that _looks finished_ and isn't.

## What the PR put in

The first part of the work was flattening the wire format under BullMQ v5's:

- lists for `wait`, `active`, `paused`
- sorted sets for `prioritized`, `delayed`, `completed`, `failed`, `waiting-children`, `marker`
- a hash for metadata, a stream for events
- job hash fields with the same names and formats as Node (`atm`, `ats`, `processedOn`, `pb`, JSON-encoded `opts`)

On top of that, ports of the atomic Lua scripts BullMQ uses for state transitions. A job transition — `wait` to `active`, `active` to `completed`, recovering a stalled job — cannot be implemented as a sequence of Redis commands. It has to be atomic, and BullMQ gets atomicity by delegating to Lua. Rewriting those by hand in Rust would mean inventing race conditions the original code doesn't have. So you port them line by line, and verify the observed behavior is identical.

Above that, the runtime: a marker-based worker loop on `BZPOPMIN`, token-based locks with TTLs, stalled-job recovery, a `moveToFinished` fast path, and a prefetch fix so jobs don't end up orphaned in `active` when a worker dies uncleanly.

Above that, the Rust API surface: Queue, Job, QueueEvents, FlowProducer with cross-queue parent/child trees.

That's enough to use in production, and enough to talk to an existing Node cluster with no translation layer in between.

## What the PR deliberately left out

A list, in the body of the PR:

- no `JobScheduler` (cron-style repeatable jobs)
- no bulk queue operations (`addBulk`, `clean`, `obliterate`, `retryJobs`, `promoteJobs`)
- no worker-level pause/resume (queue-level: yes)
- no rate limiting
- no deduplication
- no debouncing
- no metrics

All things BullMQ has. All things that would need to be added.

But not in this PR.

## Why

Because a port that tries to do everything in one shot ends one of two ways: it never gets merged, or it gets merged with hidden compromises.

Hidden compromises are the ones you don't see in the description but that live in the code. Conventions invented where the spec was unclear. Edge cases left behind out of fatigue. Behaviors that silently diverge from the original system and surface months later, when a user reports that _"it works with Node, not with Rust."_

That's Cunningham's _accidental_ debt — the kind you accumulate without knowing, because you didn't understand the problem well enough. You can't quantify it. You can't pay it down. You don't even know where it is.

The way to avoid it, in a port, is to invert the instinct: **declare first what you are not doing**.

Not at the bottom of the PR, in small print. In the description, in a dedicated section, with the precise names of the missing APIs and behaviors. Publicly, before anyone asks.

That transforms the exact same situation — _"a library with missing features"_ — from accidental debt into **deliberate debt**: the legitimate tool Cunningham was actually talking about. I know what's missing. It's written down. It's tracked. The next PR knows where to land. Users of the library know what to expect and what not to.

> Deliberate debt is a scoping tool. Accidental debt is scope that manages you.

## The temptation to port everything

There's a specific temptation in any port or reimplementation — and it's the same one that AI-assisted development speed makes easier to indulge: trying to do _everything_ in one shot, because technically you could.

The original system has a hundred features. The port can imitate all of them. The LOC scale. The PR balloons. Review becomes impossible. The decisions about the parts you never really understood end up being made by default — by generated code, by analogy with other systems, by whatever seemed reasonable at three in the morning.

And when that PR gets merged, the resulting system has the surface area of the original and a bug surface nobody has mapped. It _looks_ complete. And as I've written elsewhere, _looks complete_ and _is correct_ have never been the same thing.

The alternative is less glamorous. Port what's structural first — the wire format, the runtime, the atoms — then add surface one piece at a time, additively, writing down in plain sight what's still missing and why.

Nothing is proven by porting more. Something is almost always lost by porting without declaring what's in and what's out.

## The interface you don't see

This holds outside of ports, too.

In almost every system that shares state with something external — another application, another team, another runtime, another language — the interface that actually matters is not the one in a function signature. It's the one that crosses the boundary. A JSON payload. A row in a table. An event on a stream.

It's the one the caller observes. It's the one that, changed silently, breaks things far away from where you changed them, at an hour when you're not at the screen.

Inside a closed system you have the luxury of renaming, restructuring, refactoring at will. When the system has a boundary someone else observes, that luxury is gone. **The language API is ephemeral. The real contract is whatever crosses the boundary.**

For the BullMQ port, that boundary was Redis. Once the boundary is right, everything else is additive. If the boundary is wrong, every feature you add on top is one more lie to maintain.

And lies in systems don't expire. They wait.

## References

- Merged PR: [bogardt/bullmq-rs#3](https://github.com/bogardt/bullmq-rs/pull/3)
- The issue that started it: [bogardt/bullmq-rs#2](https://github.com/bogardt/bullmq-rs/issues/2)
- The library, by [@bogardt](https://github.com/bogardt): [bullmq-rs](https://github.com/bogardt/bullmq-rs)

_The most honest port is the one that declares first what it is not porting._
