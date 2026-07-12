---
title: "The CMS in C I never wrote"
description: "In 2015 I could have written a CMS in C. I chose WordPress instead. Six months later I had 9,000 signups, App of the Month on Italy's App Store, and €400K raised. Dev team: me."
date: "2026-07-12T09:00:00.000Z"
categories:
  - "dev"
  - "startup"
tags:
  - "wordpress"
  - "startup"
  - "engineering"
  - "indie"
  - "build-in-public"
lang: "en"
translation: "/il-cms-in-c-che-non-ho-mai-scritto"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/la-500-che-vinceva.png"
sticky: true
---

_In 2015 you were worth whatever language you used. This is the story of how I ignored that rule, and what happened next._

_(This is an English adaptation of my Italian essay [Il CMS in C che non ho mai scritto](/il-cms-in-c-che-non-ho-mai-scritto).)_

## The choice

In 2015 I spent a few days seriously considering **writing a CMS from scratch in C**.

It wasn't pure madness (okay, it was getting close). I had the skills to pull it off, if I'd wanted to. The real problem was something else: in the dev world of those years, **you were worth whatever language you used**. In the street-credibility narrative of the time, the steeper a language's learning curve, the more respect it commanded. C was, without question, respectable. PHP or JavaScript were for amateurs. **WordPress wasn't even worth mentioning.**

Then I said: _naaaaaah_.

I had to build a platform for selling digital comics. Users, content, payments, files protected from download. Alone, on a tight budget I needed to stretch to cover a place to sleep for me and my non-technical co-founder, plus the costs of landing the first contracts. Do-or-die deadline: six months to reach an investor day, presenting not just the app but user numbers to back it up.

**I took WordPress and bent it to what I needed.**

Not because it was the cooler choice. But because **I knew that codebase by heart**. I knew how it behaved under load, where it tended to break, how to extend it. And above all I knew where to look when something went wrong at 2 AM — which happens, always, invariably, at the worst possible moment.

A CMS in C, I'd probably still be writing it today.

## What came out of it

In six months, with a dev, UI, UX, and DevOps team consisting of... **me, alone**:

- The platform's backend
- REST API for the mobile app
- iOS app
- Asymmetric-key encryption system for file protection, **registered with SIAE** (Italy's copyright collection agency)
- Infrastructure on two load-balanced, synchronized machines, managed with Ansible
- HHVM for JIT-compiling PHP, since PHP 8 obviously didn't exist yet

The back office was "free" — the same old WordPress everyone on the team already knew how to use. Essentially zero onboarding: whoever needed to use it, used it, without ever opening a support ticket.

First week after launch: 9,000 signups. **App of the Month on Italy's App Store.** €400K raised from investors.

---
---

## The point

There's a difference between **not knowing the alternatives** and **knowing all of them and choosing the one that works** given the real context and the real constraints.

The risk isn't "I have to learn the syntax" or "the elegance of the solution." It's that **you don't know the failure modes yet**.

It's like choosing between racing with a car you've driven for ten years — you know the third gear grinds a little, how much force to put into the wheel, how it brakes on wet pavement — or with a brand-new vehicle you steer through something the manual calls trim vectoring.

**You're already asking: what's trim vectoring?**

**Exactly.**

And that's precisely the problem. With the new stack you're debugging in the dark, at 2 AM, something you don't even have a name for yet.

The CMS in C would have been a great story to tell at meetups.

**The 9,000 signups were better.**
