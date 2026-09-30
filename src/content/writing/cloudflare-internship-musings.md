---
title: "musings from the other side of the window: four months in cloudflare's sirt"
date: 2026-09-30
category: musings
description: "4 months in Cloudflare's SIRT: what I learned, what I built and failed to ship, and some observations from the peanut gallery."
draft: false
---

**tldr:** i yap about my time at Cloudflare - cool observations, problems i ran into (some solved, some very much not), and what i'm taking with me. this is NOT another "how to land a big tech internship" listicle. if you're an early career human trying to figure out what IR actually looks like on the inside, or a senior curious what a fresh face notices about the field, this is for you. maybe the real takeaway was the friends we made along the way.

## part 1: getting in

Quick context on how I got here, because I know that's what most of you clicked for. I promise the rest of the post is more interesting.

4 rounds of interviews in March: recruiter, hiring manager, then 2 rounds with teammates. The SOC analyst internship I did before this covered the fundamentals the role needed: alert triage, the IR process, networking concepts. That got me in the door.

What I _think_ made me stand out:

- I built this website on Cloudflare products (Workers + Pages) while prepping for interviews - felt weird to say "I want to work here" without using the products
- I was prepping for a BSides Tokyo talk in May on how game cheats and malware leave forensically similar trails, which gave me something to talk about that wasn't just "I have a Security+ and did X cyber courses in Uni!!"

I joined as a summer intern on the APJC SIRT team (dibs on being the OG intern in APJC 🫡), with counterparts covering the round-the-clock security model. While my initial internship was 12 weeks, I ended up staying for 4 months for reasons that'll make sense later in this post.

## part 2: what IR actually looks like

Before starting, my mental image of IR was Hollywood: flashing red lights, someone yelling "we've been breached!", analysts hunched over monitors furiously typing while prod is on fire and OP saves the day with what looks suspiciously like `npm install` output next to some digital rain.

Reality was more nuanced. Quick primer: SIRT owns the full IR lifecycle, so I started with alert triage (taking alerts and doing end to end investigations) and later jumped in to help with escalated incidents. Most of my early lessons came from triage, not from the shiny incident work.

**lesson 1: understand the _why_, not just the _how_.** Alert triage may sound mechanical from the outside: alert fires, you look at it, you close it. It's not. Every SIRT engineer has their own methodology, their own things they look for, their own reasoning for calling something benign vs. escalating it. Something about more than one way to skin a cat. Watching that gap between how different engineers approached the same alert forced me to stop asking _"how do I close this ticket"_ and start asking _"why does this alert exist, and what is it actually trying to tell us?"_

That jump from **operator to thinker** is the one I think matters most, especially now that AI can handle the "how do I do this" part faster than any human. What it can't do (yet) is ask good questions about _why_ the system is set up the way it is.

**lesson 2: communicate the conclusion first, technical details second.** This one I stole from my manager. When writing closing comments on a ticket or handover notes, the structure should be:

1. What did we find?
2. What needs to happen next?
3. _Then_ the technical detail, for anyone who wants to dig in.

Sounds obvious. It wasn't to me. My instinct was to walk the reader through the investigation chronologically: here's what I saw, here's what I checked, here's what I concluded. That's how I _thought_ about the problem, so it felt natural to write it that way.

Rather, I learned that technical detail exists to _provide context_ for someone who wants to interrogate the conclusion. But on a follow-the-sun team where someone in another timezone is picking up your ticket in 4 hours, they don't want your chronology. They want the current state, what's pending, and _why you took the actions you took._ Everyone on the team has the same raw data. What makes our actions differ is our thought process.

**lesson 3: calm beats speed.** About a month in I helped investigate my first real incident. Internal monologue was "awww fuck, this is bad, we gotta fix this ASAP." My team went for lunch.

It wasn't that they didn't care. They'd already scoped it, figured out the blast radius, and knew that panicking wouldn't speed up the investigation. Can't do shit if you're starving.

The incidents that go sideways aren't usually the ones where the responder was too slow. They're the ones where someone rushed a decision, missed context, or contained the wrong thing under pressure.

**lesson 4: the 80/20 on evidence gathering.** You don't need full forensics on every host. You need _enough_ evidence to make the next decision. Sometimes that's a memory dump. Sometimes it's checking one registry key and moving on. Figuring out which is which is a skill nobody teaches you in a cert (cough GCFA cough).

Also, and I don't see this said enough: IR is _fun._ You see weird, wacky, sometimes hilarious stuff. Some of it becomes an inside joke. Some of it (with company approval and a lot of vetting) becomes conference talks. The job has a texture no writeup can really capture. That's why I love it. (Maybe this will age badly but I stand by it right now.)

## part 3: the other 30% - i become bob the builder for security (and fail?)

Roughly 70% of my time was on daily IR ops. The other 30% went to a side project I'll call **Overwatch**. It tackled a problem you'll hear about at basically any security conference: threat hunting across the industry tends to skew reactive, and turning raw threat intel into hunt-ready queries at scale is a chronic pain point most teams are trying to solve in some form.

The pitch was simple: automate the boring middle bit. Take raw intel in, spit hunt-ready outputs out. What actually happened is a case study in almost every mistake you can make on an internal project.

1. **Scope creep:** the "simple" version turned into 4 different flavours as I kept finding adjacent problems that seemed easy to tack on. Each addition was individually justifiable. Together they made the project 3x its original size.
2. **Building for me, not for adoption:** I was so focused on the building that I under-invested in the thing that actually determines whether an internal tool lives or dies: does anyone want to use it? Getting an engineer to change their workflow is 10x harder than shipping code.
3. **A rapidly shifting environment:** priorities changed, tooling changed, team focus shifted. Things that were true when I scoped the project weren't true 2 months in, and I didn't rescope as early as I should have.
4. **Reliability of the automation layer:** the pipeline leaned heavily on automation that's non-deterministic by nature. I learned the hard way that "it worked in my last 5 tests" is not the same as "it works reliably enough to put in front of a teammate making a real decision."

Overwatch never fully shipped. It's not adopted. And honestly, that's the part I learned the most from, way more than if it had quietly gone into prod and I'd written a triumphant "here's what I built" LinkedIn post.

## part 4: what i noticed from the industry (from the peanut gallery)

Disclaimer: I'm an intern. Take this section with the appropriate grain of salt.

1. **The AI wave is turning every security team into a builder team.** Everyone has a pet project: automating something, wrapping an LLM around something, building a dashboard for something. The problems being solved are real (restrictive log limits, tedious manual work, poor visibility), but the sheer _volume_ of building is starting to feel like its own problem.
2. **If everyone is a builder, who's the maintainer?** Internal tools have a lifecycle. Someone has to own it, patch it, respond when it breaks at 2am, deprecate it when it stops mattering. I saw plenty of tools get built, but I saw very few conversations about who's going to keep them alive in 6 months when the person who built them has moved teams or left.
3. **Most internal tools don't survive, and that's probably meant to happen.** My rough gauge is that most of these internal projects don't make it. They're abandoned when the shinier thing appears, when the champion moves on, or when the environment shifts. The ones that survive tend to have three things: a real business need, senior stakeholder buy-in, and dedicated resourcing. Without all three, the tool's probably on borrowed time.
4. **Duplication of effort across distributed teams is worse than people admit.** While follow the sun models are great for coverage, there's also the unwanted possibility of 3 people in 3 timezones independently building the same tool because nobody had a shared view of what everyone was doing. This isn't a Cloudflare problem, it's a distributed team problem. But I hadn't seen it discussed much before I ran into it.

## part 5: what's next

Surprise surprise! If you've made it this far (fantastic attention span there mate), an easter egg: I'll be heading to Mandiant as an IR consultant next week. This is also why the internship extended past 12 weeks - the timing lined up.

It's been a dream since stumbling into this industry via _Sandworm_ by Andy Greenberg (and reading the APT1 report just last May) to work on major incidents, APTs, that kinda scary stuff. This honestly feels like a dream come true.

Things I'm taking with me from Cloudflare:

- Calm > speed (in most instances)
- Build for adoption and to solve a real problem, not for your own portfolio, and remember to watch the scope!
- "Why do we do it this way?" beats "how do I do this?"
- 80/20 on evidence gathering is a skill worth deliberately building

Huge thanks again to the SIRT team for putting up with my questions, and to the intern crew for making the office something to actually show up to. If you're an early career person figuring out IR and any of this was useful, or a senior and I got something wrong, my DMs are open. Always happy to yap :)