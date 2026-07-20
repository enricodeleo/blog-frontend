# Visibility Playbook

This is the companion to `blog-style-guide.md`: where that guide governs how a post is *written*, this one governs which posts travel internationally and how Enrico builds visibility beyond the blog — as a peer-respected voice in engineering and AI, not as a lead funnel.

**Canonical voice**: still SOUL and `blog-style-guide.md`. This document assumes both and doesn't repeat them.

## Why this exists

Two ranked goals, in order:

1. **Peer and industry recognition** — being known and respected among senior engineers, OSS maintainers, and the AI/engineering-leadership crowd.
2. **Speaking and media opportunities** — podcast, conference, and panel invitations.

Explicitly not a lead-generation strategy. The Fractional CTO / AI Solutions Architect positioning (`AGENTS.md`) is the identity; this document is about how that identity becomes visible.

## What travels: porting-selection criteria

Not every Lane 1 essay gets international treatment. A post is a candidate for the `/en` section when:

- It has a **universal engineering or professional-judgment theme** — not something that only makes sense in the Italian market or context.
- It carries a **concrete, falsifiable claim or a lived episode** (SOUL's "no invented anecdotes" rule applies here too — if there's nothing specific to point at, it doesn't travel).

Two sourcing pipelines feed this:

- **Ported essays** — an Italian Lane 1 essay, adapted into English, `translation` frontmatter pointing back to the original. This is the default and covers most of the `/en` section today.
- **English-first essays** — written directly in English, no Italian original, no `translation` field. Reserved for pieces where the underlying event is itself international: an open-source contribution, a bug found and reported upstream, a released library. `narrowed-not-superseded` (published as "BullMQ in Rust: what the official client leaves me to build") is the first of these — it exists because the event it describes (a race condition found in `bullmq-rs`, reproduced and proposed as a fix in [bogardt/bullmq-rs#21](https://github.com/bogardt/bullmq-rs/pull/21), compared against BullMQ's newly-released official Rust client) has no Italian audience to begin with.

## Per-article distribution checklist

Run this once a piece qualifies above. Order isn't fixed — sequence by what fits the piece (HN before Reddit for HN-native technical content, for example).

- **LinkedIn** — native post, first person, never a bare link drop.
- **X/Twitter** — a thread or single post that leads with the single strongest claim, not a summary.
- **Hacker News** — title states the strongest concrete claim (not a clickbait rephrase); reserve "Show HN" for actual tools/projects, not essays.
- **Reddit** — exactly one relevant subreddit per piece (e.g. r/rust for a Rust-client comparison); reword the intro to fit that community's norms; never crosspost identical text to multiple subreddits the same day.
- **Newsletter** — queued into the next send, soft pointer only — no forced CTA, per the style guide's CTA doctrine.
- **GitHub/OSS** — when the piece references a PR or issue Enrico filed, link both directions: the article references the PR, and the PR thread gets a comment linking the writeup once it's live and adds something to that discussion.

## Ambient cadence (between publishes)

Bandwidth for this is moderate — not daily posting, not silence between articles either. On a loose monthly rhythm:

- Substantive comments on 2-3 relevant HN/Reddit threads — own the topics already written about, don't just wait for the next essay.
- LinkedIn/X engagement with peers in the same space — replies and discussion, not only self-promotion.
- Ongoing awareness of OSS contribution opportunities in tools already in daily use. The `bullmq-rs` piece is the template: using a tool deeply enough to find and fix a real bug produces both credibility and article material at once.
- Podcast/conference pitching isn't on a forced calendar (that reads as performative). It's triggered by a piece performing well — front page on HN, strong LinkedIn/X engagement — that's the signal to pitch it as a talk or episode topic.

## Success signals

Qualitative, not vanity metrics — consistent with the anti-hype stance the whole blog runs on:

- Being cited or quoted unprompted by someone else in the space.
- Inbound speaking or podcast invites.
- Direct engagement from OSS maintainers or peers — not just an upvote count.

## Review

Revisit this document roughly every 6 months, or sooner if a channel shifts meaningfully (an HN ranking change, a new channel added, an old one abandoned).
