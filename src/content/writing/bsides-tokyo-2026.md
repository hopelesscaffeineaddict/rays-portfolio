---
title: "Cheaters Leave Footprints: Forensics of Cheats in Modern Games"
date: 2026-05-16
category: talks
description: "Game cheats behave like malware. This talk walks through three samples and their forensic footprints, as well as when the detection model breaks."
venue: "BSides Tokyo 2026"
slides_url: "/blog-assets/bsides-tokyo-2026.pdf"
video_url: ""
abstract: |
  Cheating in modern competitive games isn't a gameplay problem. It's a digital forensics problem. Using popular multiplayer titles in Asia (League of Legends, Valorant, Apex Legends), this talk examines how cheats behave like malware implants and leave persistent forensic artefacts across memory, disk, and telemetry.
  
  We walk through three real cheat samples, reconstruct each incident from prefetch, amcache, Sysmon logs, and memory artefacts, and show where that reconstruction breaks down, as DMA cheats leave nothing on the target machine. TLDR: Anti-cheat and EDR are solving the same problem with the same tools, and both are being pushed toward behavioural detection for the same reason.
draft: false
---

## Abstract

Cheating in modern competitive games isn't a gameplay problem. It's a digital forensics problem. Using popular multiplayer titles in Asia (League of Legends, Valorant, Apex Legends), this talk examines how cheats behave like malware implants and leave persistent forensic artefacts across memory, disk, and telemetry.

We walk through three real cheat samples, reconstruct each incident from prefetch, amcache, Sysmon logs, and memory artefacts, and show where that reconstruction breaks down, as DMA cheats leave nothing on the target machine. TLDR: Anti-cheat and EDR are solving the same problem with the same tools, and both are being pushed toward behavioural detection for the same reason.

## Slides

[Download the slides (PDF)](/blog-assets/bsides-tokyo-2026.pdf)

## Recording

N/A. This talk wasn't recorded.

## Key Points

1. **Game cheats and malware are the same shape.** They share the same pattern (bypass + payload), same techniques (DLL injection, memory reads, hooking), and only differ in intent.
2. **That means the same forensic toolkit works**: Prefetch, Amcache, Sysmon EIDs, memory forensics. The artefacts cheats leave behind are also the artefacts malware leaves behind, and incidents can therefore be reconstructed the same way.
3. **Three cheat samples with three tiers of stealth:** While `apexdream` reads game memory externally through Win32 APIs, `1v1.lol DEMON` injects a DLL via SharpMonoInjector. Meanwhile `PCILeech` runs the cheat on a separate machine entirely and reads RAM over PCIe, and each cheat leaves progressively fewer forensic artefacts behind on the target box.
4. **DMA breaks the model:** With no process/disk artefacts, and nothing on the game machine, detection has to move server-side, to behavioural telemetry like aim patterns and reaction times, which is simply user and entity behaviour analytics (UEBA).
5. **CV/AI cheats are next, and they don't touch the game process at all:** When a camera or screen capture is able to feed an AI model that can parse the live content and move the mouse accordingly, the process boundary that anti-cheats have spent years defending becomes obsolete. Thus, both anti-cheats and EDRs end up falling back on the same question: is this entity biologically plausible?

## References

### Cheat samples analysed

- [apexdream (Apex Legends)](https://github.com/CasualX/apexdream/tree/master)
- [1v1.lol DEMON internal cheat (LoL DLL injector/loader)](https://www.unknowncheats.me/forum/other-fps-games/676527-1v1-lol-internal-cheat-aimbot-esp.html)
- [PCILeech (DMA PoC)](https://github.com/ufrisk/pcileech)

### Analysis artefacts

- [VirusTotal report: loader.exe from the LoL DLL injector](https://www.virustotal.com/gui/file/d1bd47bc8c7a262cedaf34f6eaec05accfeea18898086b2d48896fd3ea6b7978/behavior)

### Further reading

- [Emerging Threats to Game Integrity: Unpacking the DMA Cheat Conundrum](https://intl.anticheatexpert.com/resource-center/content-68.html) (AntiCheatExpert)
- [The Comprehensive Guide to In-Game Cheating Typologies](https://quago.io/blog/the-comprehensive-guide-to-in-game-cheating-typologies/) (Quago)
- [Common Game Hacks Explained](https://www.thegamer.com/common-game-hacks-explained/) (TheGamer)
