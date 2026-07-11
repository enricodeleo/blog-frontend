# Blog Style Guide

This guide defines how to write posts for Lisergico (blog.enricodeleo.com).

**Canonical voice document**: `SOUL_Enrico_Deleo.md` (SOUL). Where this guide and SOUL disagree, SOUL wins. This guide operationalizes SOUL for the blog and adds the one thing SOUL doesn't cover: the distinction between the two content lanes the blog actually runs on.

## The two lanes

Every post belongs to exactly one lane. Decide the lane before writing a word — they have different jobs, different structures, and different success metrics.

### Lane 1 — Essays (the voice)

The reason the blog exists. Reflections born from real work: AI and judgment, engineering culture, trade-offs, the craft. These build the author's voice and reputation; they are distributed directly (LinkedIn, newsletter, HN for English adaptations) and are not expected to earn search traffic.

- **Structure** (SOUL §10): concrete episode → technical or human observation → general principle → practical consequence → dry closing, never triumphant.
- **Length**: whatever the idea needs. No cap. The best ones have run 600–2,000 words.
- **Closing**: a sentence that carries weight. Never a call to action. Never a question fishing for comments.
- **Headings**: only where the essay naturally breaks. No target count.
- **First person, from lived experience.** If the episode didn't happen, the essay doesn't get written (SOUL §12: no invented stories).
- **Test**: could a thousand other founders publish this? If yes, rewrite or discard.

### Lane 2 — How-to / decision posts (the traffic)

Query-shaped posts answering something people actually type into a search engine (the git-ingest, NanoPi, RetroArch, WooCommerce genre — the only posts Google indexes and shows, per measured Search Console data). These serve discovery, not voice.

- **Structure**: hook (real problem + why now) → context (who it's for) → method in clear sections → checklist/steps/framework → explicit recommendation.
- **Length**: 500–1,200 words. Long enough to be the best answer, short enough to respect the reader.
- **Title**: matches the query, outcome-oriented. This is the one lane where "Come fare X con Y" is correct.
- **Headings**: 4–10; bullets and numbered steps welcome — here they are structure, not filler.
- **Include 1–2 concrete examples** with real commands, numbers, or configs.
- **Closing**: the recommendation, stated plainly. A soft pointer to a related essay or the newsletter is fine; a hard CTA is not.

When in doubt about the lane: if the title matches a search query, it's Lane 2. If the title only makes sense after reading, it's Lane 1.

## Voice and tone (both lanes — from SOUL)

- Riflessivo, tecnico ma umano, concreto, asciutto, anti-hype. The tone of someone who has built enough to know that almost everything is a trade-off.
- Italian-first. English technical terms only where they add precision (`workflow`, `wire format`, `LLM`, `failure modes`).
- Alternate short sentences with more articulated ones. Use an isolated sentence when something needs weight — sparingly, or it becomes a tic.
- Don't over-explain. Leave room for the reader.
- Not moralist, not guru, not motivational, not creator.

## CTA doctrine (SOUL §14 — replaces any previous rule)

No forced calls to action, in either lane.

Acceptable, when natural:
- "Mi interessa parlarne con chi ci sta lavorando davvero."
- "Sono curioso di vedere se questa cosa regge anche fuori dal nostro contesto."
- A dotted-underline link to a related post or the newsletter.

Never:
- "Cosa ne pensi?" / "Scrivimi nei commenti." / "Seguimi per altri contenuti." / "Link in bio."
- "Sono entusiasta di annunciare…"

## Lexicon (SOUL §11)

**Lean on**: attrito, giudizio, contesto, struttura, sistema, mestiere, responsabilità, trade-off, sedimentazione, dominio, failure modes, manutenzione, loop, soglie, review, decision support, valore misurabile.

**Earn before using**: rivoluzione, disruption, innovazione, trasformazione digitale, scalabilità, ecosistema, empowerment, democratizzazione, futuro, visionario.

**Never**: game changer, unlock, supercharge, guru, hustle, mindset, "ti spiego perché", "ecco 5 lezioni", "non crederai a cosa è successo".

## Guardrails (both lanes)

- Max 2 rhetorical questions per post; max 1 exclamation mark.
- Bold only for concepts that must survive a skim.
- No AI-as-buzzword: the word "AI" must be doing work in the sentence, or cut it.
- No invented anecdotes, no engagement bait, no corporate press-release tone.
- Slang/profanity: near zero.
- Personal topics (piano, musica classica, libri, New York, abitudini di lavoro) are welcome when they stay true — never bent into "what X taught me about AI" (SOUL §13).

## Frontmatter conventions

- `description`: always filled, ~120–155 chars, reads like a natural sentence (it's the SERP snippet and the social preview).
- `coverImage`: strongly preferred; without it the site falls back to the default portrait for social cards.
- `lang: "en"` + `translation: "/<italian-slug>"` for English adaptations (file goes in `content/articles/en/`), with the reciprocal `translation` field on the Italian original.
- English adaptations are Lane 1 only, chosen deliberately for international distribution — see the porting selection criteria in the visibility playbook.

## Pre-publish checklist (SOUL §20, adapted)

1. Does it sound written by someone who has built real things?
2. Is there a real trade-off, or just a nice sentence?
3. Is the word "AI" necessary or decorative?
4. Could a thousand other founders publish it? (Lane 1 kill criterion)
5. Is there at least one detail that makes it specific?
6. Does the closing add weight, or beg for applause?
7. Lane 2 only: does it fully answer the query in the title?
8. Would Enrico read it without embarrassment?

## Open positioning note

SOUL introduces Enrico as "CTO e co-founder di Traction Group / technical founder"; the sites (landing, blog tagline, llms.txt, JSON-LD) currently say "Fractional CTO & AI Solutions Architect". These are different frames. Until reconciled deliberately: blog content follows SOUL's voice (founder, not consultant); site-level positioning strings stay as they are. Do not mix the two inside a post.
