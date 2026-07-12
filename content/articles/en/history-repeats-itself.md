---
title: "History repeats itself"
description: "In 2015, graph databases were the future. Today I use Postgres for almost everything. In between: MongoDB, mixed ObjectIds, and the usual bill that arrives later. It's happening again with vector databases."
date: "2026-07-12T10:00:00.000Z"
categories:
  - "dev"
tags:
  - "postgres"
  - "database"
  - "engineering"
  - "tech-debt"
  - "build-in-public"
lang: "en"
translation: "/la-storia-si-ripete"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/la-storia-si-ripete.png"
sticky: false
---

_Graph databases, MongoDB, dedicated vector databases. The pattern is always the same. Only the names change._

_(This is an English adaptation of my Italian essay [La storia si ripete](/la-storia-si-ripete).)_

In the [previous post](/en/the-cms-in-c-i-never-wrote) I told the story of how, in 2015, I chose "boring old" WordPress to build a platform used by tens of thousands of people. But there's another story from that era worth telling.

## 2015: graph databases were the future, NoSQL was the present

Every conference, every blog post, every enthusiastic dev. "Foreign keys don't scale. Joins are old stuff. The world is made of connections." Neo4j, Cypher, slide decks full of colorful nodes and arrows.

On the same anti-relational-database war footing, millions of people piled onto a single combo that had practically become a synonym for "startup": Node.js + MongoDB.

I used to attend a lot of technical demo days where CTOs of other startups explained how they'd set up their stack. I still remember one opening with the classic line of the era: "we're using Node paired with Mongo!" Then he started describing the domain: _"the relationship with"_, _"the relationship of"_, _"this is connected to that through that other thing."_

I said: **"Wouldn't it have been crazy to store relationships in a... relational database?"**

Today I use Postgres for almost everything. When I need something extra, I reach for extensions on top of the same database: pgvector for vectors, TimescaleDB for time series, pg_textsearch for full text with ranking.

Graph databases: zero.

## What happened

Nothing dramatic. **Postgres kept moving forward.**

Recursive CTEs, jsonb, extensions for everything. It cannibalized 90% of the use cases without adding one more infrastructure component to maintain, sync, monitor, and pay for. The operational cost of a dedicated graph database isn't trivial: sharding is complicated, and the mental model differs from the relational one most developers have already internalized.

Result: a great tool for specific niches — enterprise-scale fraud detection, knowledge graphs in large organizations. For 95% of projects: **overkill**.

## The same story, earlier

Before graph databases, there was MongoDB.

_"Joins don't scale"_ — repeated like a mantra by people who'd never actually had a scale problem. Two years later: an array of userIds inside the order document, some strings, some numbers, some ObjectIds, and 3% of the references missing, and nobody knows why.

MongoDB was genuinely useful for certain use cases, and I used it a lot myself (more often alongside something else than as a replacement). The problem was that it got used for everything, because it was new, because it was cool, because using it felt like a modern choice.

## The pattern is always the same

1. New technology solves real problems in specific cases
2. It's presented with use cases from companies at a scale 99% of teams will never reach
3. It gets adopted as a general-purpose solution
4. Whoever uses the "boring" technology looks like a fossil
5. The reckoning arrives
6. The boring technology is still there; someone proposes a refactor "to harden things" (read: go back to solid schemas and contracts), and it takes a year

There's a concept called the **Lindy effect**: a technology that's existed for twenty years will probably exist for another twenty. Coming from someone who's a tinkerer and an enthusiast by nature: know everything, experiment with everything, but in production... it depends.

Our job is to **identify the contexts where a professional judgment call is actually needed**, factoring in risk areas like long-term support, the availability (and therefore cost) of people already skilled in that technology as the team grows, knowledge transfer, and the availability of extensions and libraries that are already battle-tested.

**And yes, I know reusing something you've used for 20 years is boring**, but sometimes it's also the most professional service we can render. For the thrill of novelty, a bit of patience is enough, and the universe will eventually send you the project where the new thing actually makes sense. In the meantime there are personal side projects, just for fun, as an outlet.

## It's happening again now

Pinecone, Weaviate, Chroma. Dedicated vector databases, presented as a necessary component of any AI architecture.

Same story here: it's not that they're useless. It's that in the vast majority of cases **you don't need one**.

Hybrid full-text search with BM25 + pgvector solves most of it — with the advantage of having everything in the same database, relationships intact, zero synchronization, zero extra components to maintain. Up to roughly half a million records, the performance difference against a dedicated vector database is negligible. And most projects will never reach half a million records.

The cost of exotic infrastructure is always paid later, never up front. And "later" almost always coincides with the worst possible moment: real traction, investors watching, users complaining.

**History is cyclical. Only the names change.**

## My mantra

> Minimum diff, less moving parts.

I carry one rule with me across projects: **minimum diff, less moving parts**. Every additional component is a dependency, something that can break, something with side effects that are sometimes implicit. Something someone has to understand, maintain, upgrade. **The cost is never only technical — it's cognitive, operational, economic.**

Choosing the most straightforward technology that solves the problem isn't a shortcut. It's the job.
