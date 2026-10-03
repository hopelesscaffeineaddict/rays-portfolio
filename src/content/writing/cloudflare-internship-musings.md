---
title: "musings from the other side of the window: four months in cloudflare's sirt"
date: 2026-09-30
category: musings
description: "what I learned and some observations from the peanut gallery from spending 4 months in Cloudflare's SIRT team"
draft: false
---

**tldr:** i yap about my time at Cloudflare - cool observations, problems i ran into (some solved, some very much not), and what i'm taking with me. this is NOT another "how to land a big tech internship" listicle. maybe the one piece was the friends we made along the way.

## part 1: getting in

Quick context on how I got here, because I know that's what most of y'all clicked for. I promise the rest of the post is more interesting.

I had 4 rounds of interviews in March: recruiter, hiring manager, then 2 rounds with teammates. The SOC analyst internship I did before this covered the fundamentals the role needed, namely alert triage, the IR process, networking concepts, and that helped me get my foot through the door.

What I _think_ made me stand out:

- I built this website on Cloudflare products (Workers + Pages) while prepping for interviews so I'd be able to yap about my personal experience using Cloudflare's products 
- I was prepping for a BSides Tokyo talk in May on how game cheats and malware leave forensically similar trails, which gave me something to talk about that wasn't just "I have a Security+ and did X cyber courses in Uni!!"

I joined as a summer intern on the APJC SIRT team (dibs on being the OG intern in APJC 🫡). While my initial internship was 12 weeks, I ended up staying for 4 months for reasons that'll make sense later in this post.

## part 2: what IR actually looks like

Before starting, my mental image of IR was Hollywood: flashing red lights, someone yelling "we've been breached!", analysts furiously typing while prod is on fire and OP saves the day with what looks suspiciously like `npm install` output.

Reality was more nuanced. As a primer, SIRT owns the full IR lifecycle, so I started with alert triage (taking alerts and doing end to end investigations) and later jumped in to help with escalated incidents, and this experience translated into the 4 following takeaways:

**lesson 1: understanding the _why_, not just the _how_:** While alert triage may sound mechanical from the outside: (1) alert fires, (2) you look at it, (3) you close it, I think that it's a lot more than that. Every SIRT engineer has their own methodology, their own signals they look for, their own reasoning for calling something benign versus escalating it. Something about more than one way to skin a cat, and watching how different engineers approached the same alert forced me to stop asking _"how do I close this ticket"_ and start asking _"why does this alert exist, and what is it actually trying to tell us?"_ 

Using this reframe in questioning helped me make the jump from **operator to thinker**, and I think it's something of utmost importance especially since AI can now handle the "how do I do this?" part faster than any human. However, what it can't do yet is ask good questions about _why_ the system is set up the way it is.

**lesson 2: communicate the conclusion first, then the technical details second:** This one I stole from my manager: when writing closing comments on a ticket or handover notes, the structure should follow:

1. What did we find?
2. What needs to happen next?
3. _Then_ the technical detail, for anyone who wants to find out more.

While this may sound obvious, it initially wasn't to me. My initial instincts were to walk the reader through the investigation chronogically: here's what I saw, here's what I checked, and here's what I concluded, as that's how I thought about the problem/process, and it felt natural to write it that way. Through example, I quickly learned that technical detail exists to _provide context_ for someone who wants to understand the conclusion. Because, on a follow-the-sun model where someone in another timezone needs to pick up a bunch of tickets and quickly understand the individual situations, they don't want the chronology. They want the current state, what's pending, and _why you took the actions you took._ Everyone on the team has the same raw data, but what makes our actions differ is our thought process.

**lesson 3: haste makes waste:** About a month in, I helped investigate my first incident. At the time, my internal monologue was "aww fuck, this is bad, we gotta fix this ASAP". Meanwhile, my team went for lunch. It wasn't out of indifference. Rather, they had already scoped the situation, figured out the blast radius, and knew that panicking wouldn't speed up the investigation. I learned that the incidents that go sideways aren't typically the ones where the responder was too slow. Instead, they're often the ones where a decision was rushed, context was missed, or the wrong/incomplete thing was contained under pressure.

**lesson 4: the 80/20 on evidence gathering:** You don't often need a full blown forensic investigation on every host, and that's typically the last resort rather than the first solution. You just need _enough_ evidence to make the decision. That could be memory dump, checking command line arguments, specific registry keys, packet captures, and then moving on. Figuring out the move that gets you 80% of the context with 20% of the effort is a skill no certification will imbue (_cough GCFA cough_)

Also, and I don't see this said enough: IR is _fun._ We see weird, wacky, if not downright hilarious stuff sometimes. Some of it becomes an inside joke, while some of it (with company approval and a lot of vetting) becomes conference talks. This job has a texture that no writeup can fully capture, and that's why I love it. (Maybe this will age badly, but I stand by it right now)

## part 3: the other 30% - i become bob the builder for security (and fail?)
While I spent roughly 70% of my time on daily security operations, the other 30% went to a side project I'll call **Overwatch**. It aimed to tackle a problem you'll hear about at almost every security conference: that threat hunting across the industry tends to be more reactive, and a workflow that's able to semi-accurately turn raw threat intel into queries ready for hunting in your enterprise environment is a chronic pain point most teams are trying to solve. 

The initial pitch was simple: automate the boring middle bit, digest raw intel, output hunt-ready queries. Unfortunately, what ended up happening is a case study of the most common pitfalls of an internal project:

1. **Scope creep:** The proof of concept evolved in multiple directions, different flavours, cool "add-on features", as I kept finding adjacent problems that seemed easy to tack on. While each addition was individually justifiable, the result was a Frankenstein of a project that was 3x its intended size.
2. **Building for me, not for adoption:** I was so focused on the building that I under-invested in the thing that actually determines whether an internal tool lives or dies: does anyone want to use it? Getting an engineer to change their workflow is infinitely harder than shipping code.
3. **A rapidly shifting environment:** priorities changed, tooling changed, and team focus shifted. Things that were true when I scoped the project weren't true 2 months in, and I didn't rescope as early as I should have.
4. **Reliability of the automation layer:** the pipeline leaned heavily on automation that's non-deterministic by nature, and I learned the hard way that "it worked in my last 5 tests" is not the same as "it works reliably enough to put in front of a teammate making a real decision."

As a result, Overwatch was never fully shipped, nor was it adopted, and this failure is probably what I learned the most from, way more than if it had quietly gone into prod and I'd written a proud "here's what I shipped" LinkedIn post.

## part 4: what i noticed about the industry (from the peanut gallery)

Disclaimer: I'm an intern. Take this section with the appropriate grain of salt.

1. **The AI wave may be turning every security team into a builder team:** Within the SIRT team in Cloudflare, everyone has a pet project: automating something, wrapping an LLM around something, building a dashboard for something. While the problems being solved are real (restrictive log limits, tedious manual work, poor visibility), the sheer _volume_ of building is starting to feel like its own problem.
2. **If everyone is a builder, who's the maintainer?** Internal tools have a lifecycle: someone has to own it, patch it, respond when it suddenly breaks, and deprecate it when it stops mattering. I saw plenty of tools get built, but I saw very few conversations about who'd be keeping the lights on when the person who built them has moved teams or left.
3. **Most internal tools don't survive, and that's probably meant to happen:** My rough gauge is that most of these internal projects don't make it. They're abandoned when the next shiny thing appears, when the champion moves on, or when the environment shifts. The ones that survive tend to have three things: a real business need, senior stakeholder buy-in, and dedicated resourcing. Without all three, the tool's probably on borrowed time.
4. **Duplication of effort across distributed teams is a real issue:** While follow the sun models are great for coverage, there's also the unwanted possibility of 3 people in 3 timezones independently building the same tool because nobody had a shared view of what everyone was doing. This isn't a Cloudflare problem, it's a distributed team problem, but I hadn't seen it discussed much before I ran into it.

## part 5: what's next

Surprise surprise! If you've made it this far (fantastic attention span there mate), an easter egg: I'll be heading to Mandiant as an IR consultant next week. This is also why the internship extended past 12 weeks - the timing lined up.

It's been a dream since stumbling into this industry via _Sandworm_ by Andy Greenberg (and reading the APT1 report just last May) to work on major incidents, APTs, that kinda scary stuff. This honestly feels like a dream come true.

Things I'm taking with me from Cloudflare:

- Calm > speed (in most instances)
- Build for adoption and to solve a real problem, not for your own portfolio, and remember to watch the scope!
- "Why do we do it this way?" beats "how do I do this?"
- 80/20 on evidence gathering is a skill worth building

Huge thanks again to the SIRT team for putting up with my questions, and to the intern crew for making the office something to actually show up to. If you're an early career person figuring out IR and any of this was useful, or a senior and I got something wrong, my DMs are open. Always happy to yap :)