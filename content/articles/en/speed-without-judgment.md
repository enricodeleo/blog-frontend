---
title: "Speed without judgment"
description: "Vibe coding didn't invent badly written software. It just removed the friction. And speed, without the time to evaluate, only produces faster mistakes."
date: "2026-07-12T12:00:00.000Z"
categories:
  - "dev"
  - "ai"
tags:
  - "ai"
  - "vibe-coding"
  - "engineering"
  - "build-in-public"
lang: "en"
translation: "/velocita-senza-giudizio"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/velocita-senza-giudizio.png"
sticky: false
---

_Vibe coding didn't invent badly written software. It just removed the friction._

_(This is an English adaptation of my Italian essay [Velocità senza giudizio](/velocita-senza-giudizio).)_

I once saw a backend with authentication hardcoded into the frontend. Admin password in plain text, visible to anyone who opened DevTools. That wasn't vibe coding — it was 2018, human devs, hired off Upwork.

I mention it because what's happening now **isn't new**. It's the same thing, faster.

I've seen Google Sheets used as a database. It collapsed at four concurrent users. The founders were surprised.

I've seen features declared "done" that were empty API endpoints with nothing behind them. I've seen human developers do it. I've seen Claude Opus 4.6 — Anthropic's most capable model right now — do it too. I've seen tests written to pass, not to verify.

> A system that certifies itself is more dangerous than one that fails openly.

The problem isn't the AI. It's that the speed it offers can make you forget that building software is **fundamentally a cognitive act** — not a writing one.

## Software is not text

This is the thing the enthusiasm around vibe coding systematically forgets.

Software is not text. It's a **formal model of reality** — a system of rules describing how a domain behaves, how states change, how exceptions are handled, how time, concurrency, and failure are treated.

Writing code was never the hard problem. The hard problem is understanding _what_ to write — and _why_. It's identifying the domain's boundaries, the invariants that must hold, the edge cases the business never told you about because it didn't know it had to, the implications a given architectural choice will have six months from now when the requirements change — **because they always change**.

That understanding isn't acquired quickly. It's acquired through iteration, conversation, mistakes, corrections, nights spent wondering why the thing isn't behaving the way it should. It's what Michael Polanyi called _tacit knowledge_ — knowing that can't be fully transferred into words, that lives in accumulated experience, in recognized patterns, in intuitions built across dozens of projects.

**The AI doesn't have this knowledge.** It has the statistical average of what's been written on the internet about problems similar to yours.

Which is not the same thing.

## The trap of apparent perfection

There's something specific about AI that makes all of this worse: **the code it produces always looks well written**.

It's well named, has comments in the right places, follows conventions, uses the correct patterns. It doesn't look like the code of someone who doesn't know what they're doing — it looks like the code of someone who knows _exactly_ what they're doing.

That's the problem.

Badly written wrong code stops you. You see it, you feel it, it makes you suspicious. It triggers your critical instinct before you've even understood what it does. **Well-written wrong code** sails through code review without tripping a single alarm, passes the tests, ships to production. And when it breaks — _because it breaks_ — its correct-looking form makes it harder, not easier, to locate the conceptual problem underneath.

You're looking for a bug in code that doesn't look buggy. You're looking for a wrong assumption in code that looks reasonable.

In 1986 Fred Brooks wrote that the essential difficulty of software isn't accidental — it isn't about syntax, compilers, typing speed. It's about the **intrinsic conceptual complexity** of the systems we build. Forty years later, AI has all but eliminated the accidental difficulty. The essential one is untouched.

> _"No silver bullet."_
> — Fred Brooks, 1986

And now that the accidental difficulty is gone, the essential difficulty is more exposed than ever. But it's also easier not to see, because the output hiding it looks so convincing.

## The model of reality

When you ask AI to build something, what you get back isn't a solution.

It's an **interpretation** of the problem you described.

The AI builds a model of reality based on what you told it — and what you told it is inevitably incomplete, because the domain knowledge in your head doesn't transfer whole into a prompt. The gap between the problem you have _in your head_ and the problem the AI _understood_ is always there. Sometimes it's negligible. Sometimes it's the difference between a system that holds and one that collapses at the first real edge case.

Speed doesn't give you time to measure that gap. Worse: speed, combined with the apparent perfection of the output, actively creates the illusion that the gap doesn't exist.

This is why **"it works" is never enough** as an acceptance criterion.

_Works against what?_

Against the tests the AI wrote to pass — built around the same cases it had in mind when it wrote the code, in a closed loop that includes no external reality? Against a demo with clean data and happy paths? Or against the actual domain logic, with all the edge cases only you know about because you've lived inside that domain?

Salvatore Sanfilippo — antirez, the creator of Redis — raised an analogous problem about code review: the mental state of the person who wrote the code doesn't transfer to the reviewer. The reviewer sees the text, not the reasoning that produced it. Either they flag superficial things, or they don't understand enough to see the real problem.

With AI, the problem radicalizes: **the AI has no mental state to transfer**. It produced output optimizing for the internal coherence of the text, not for correspondence with your reality. The reviewer — you — has to close that gap alone. If you don't stop to do it, nobody will.

## Let it sink

There's a practice every engineer with enough scar tissue has internalized: sleep on it.

Not out of laziness. Out of cognitive necessity.

The human brain doesn't process complex problems linearly and sequentially. It processes in parallel, often below the threshold of consciousness. That's why the best solutions arrive in the shower, in the car, first thing in the morning — not in front of the screen while you're actively hunting for the answer. The things you don't see in the moment surface later, when you come back with fresh eyes and the brain has had time to connect patterns that active focus can't see.

It's not mysticism. It's neuroscience. The brain's diffuse mode is essential for insight, for deep understanding, for noticing the inconsistencies that focused mode skips because it's too deep inside the problem.

With AI, that practice becomes even more important, and even easier to skip. Because in a few minutes you have something in front of you that looks complete. The effort you spent is minimal, so the sense of investment is low, so the bar for calling it done drops with it. **You didn't struggle to get there, so you don't feel the need to protect yourself from the possibility that the struggle was wasted.**

But "looks complete" and "is correct" are two different things — and the speed at which AI produces output has made that distinction subtler than ever.

> Stopping isn't losing the advantage of speed. It's the moment you verify that speed took you in the right direction.

Without that moment, you're just going fast toward the wrong place — and you get there sooner.

## Code review isn't enough

The instinctive response to all of this is: _"that's what code review is for."_

But code review, as practiced on most teams, doesn't solve the problem we're describing.

Traditional code review is great at catching syntax bugs, convention violations, obvious security issues. It's much less effective at evaluating whether the **architectural decisions are correct**, whether the domain model reflects reality, whether the implicit assumptions in the code are valid.

With AI the problem is amplified: the generated code is syntactically unimpeachable. The reviewer scans, finds nothing that trips the standard alarms, approves. The conceptual problem underneath goes through undetected.

Useful code review in this context isn't _"is this code well written?"_ — that answer is almost always yes. It's _"does this code do what it should do in the context of the real domain?"_ — and to answer that you need the domain knowledge the AI doesn't have, you need to have understood the requirements well enough to know what to check, you need to have let the solution sit long enough to see it with critical distance.

## The debt you don't see

Technical debt generated without judgment has one specific trait: **it's silent**.

It doesn't show up immediately. It accumulates in decisions the AI made by default, that weren't your decisions — but are now in the code, and the code is in production. In architectures that hold for the use case you described but not the next one. In implicit assumptions the AI made filling the gaps in your prompt with the average of what it saw in training.

Ward Cunningham, who coined the term "technical debt," meant something specific: _deliberate_ debt, consciously taken on to move faster now with the intention of paying it back later. Not _accidental_ debt — the kind you accumulate without knowing it because you didn't understand the problem well enough.

**Deliberate debt is a legitimate tool. Accidental debt is capitalized ignorance.**

Vibe coding without judgment produces almost exclusively accidental debt. Because speed prevents understanding, and without understanding you can't even consciously choose to go into debt — you just go into debt, without knowing it, without being able to quantify it, without a plan to pay it back.

And when it surfaces, it surfaces at the worst possible time. When there's traction. When there are real users. When the cost of fixing it is an order of magnitude higher than it would have been at the start.

> The bill always arrives. Speed only determines how fast you run it up.

## Speed is a means

AI in software development is extraordinary. I use it every day.

But speed is not the goal — it's a means. The goal is to build something that **reflects the logic you had in your head**, that holds up under the real domain's edge cases, that someone can understand and change a year from now without cursing whoever wrote it.

If speed keeps you from verifying that this is true, you're not going faster. You're just failing faster. With more lines of code. With more confidence. With less chance of noticing before it becomes expensive.

The difference between an engineer who uses AI well and one who uses it badly isn't technical. **It's cognitive.** It's the ability to stop, let things settle, come back with critical distance, and ask: does this actually reflect what I wanted? Or am I looking at something that _looks like_ what I wanted?

Those are uncomfortable questions to ask when you've just had a productive afternoon and the screen is full of new code and the tests are passing.

_Ask them anyway._
