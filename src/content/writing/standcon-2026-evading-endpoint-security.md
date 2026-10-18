---
title: "The Art of Not Being Seen: Evading Endpoint Security"
date: 2026-10-17
category: talks
description: "Briefly covered how EDRs operate on Windows endpoints and why attackers would consider evading one. I then dove into popular evasion techniques with cool case studies of their abuse in the wild, and finally walked through an incident responder's workflow when there's an incident involving an impaired EDR.
"
presented_at: "STANDCON 2026"
slides_url: "/blog-assets/STANDCON%202026_Evading%20Endpoint%20Security_Ray%20Goh.pdf"
video_url: ""
abstract: |
  If you have ever been banned for aimbotting, or watched someone else get banned, you have already met an EDR. Anti-cheat and endpoint security solve the same problem on the same operating system: watch everything a program does, decide what is normal, and act when it is not. Cheat developers and ransomware operators also break them in remarkably similar ways.

  For most people an EDR is a tray icon, or the thing that flagged their CTF payload. This talk goes underneath it. We look at what an EDR actually sees on your machine, how attackers bypass it, and why that effort is worthwhile. Then we cross to the other side: how incident responders pick apart a compromised endpoint, and what "the EDR was bypassed" really means when you're the one responding.
draft: false
---

## Abstract
If you have ever been banned for aimbotting, or watched someone else get banned, you have already met an EDR. Anti-cheat and endpoint security solve the same problem on the same operating system: watch everything a program does, decide what is normal, and act when it is not. Cheat developers and ransomware operators also break them in remarkably similar ways.

For most people an EDR is a tray icon, or the thing that flagged their CTF payload. This talk goes underneath it. We look at what an EDR actually sees on your machine, how attackers bypass it, and why that effort is worthwhile. Then we cross to the other side: how incident responders pick apart a compromised endpoint, and what "the EDR was bypassed" really means when you're the one responding.

## Slides

[Download the slides (PDF)](/blog-assets/STANDCON%202026_Evading%20Endpoint%20Security_Ray%20Goh.pdf)

## Recording
N/A (Talk was not recorded)

## References

- [EDR Evasion: How Threat Actors Bypass Endpoint Security](https://www.huntress.com/cybersecurity-101/topic/edr-evasion) (Huntress)
- [An Inside Look at the Black Market for EDR Killers on the Dark Web](https://www.extrahop.com/blog/Dark-web-market-for-EDR-Killers) (ExtraHop)
- [AMSI Demonstrations with Microsoft Defender for Endpoint](https://learn.microsoft.com/en-us/defender-endpoint/mde-demonstration-amsi) (Microsoft Learn)
- [AMSI Write Raid Bypass Vulnerability](https://www.offsec.com/blog/amsi-write-raid-0day-vulnerability/) (OffSec)
- [A Deep Dive Into Malicious Direct Syscall Detection](https://www.paloaltonetworks.com/blog/security-operations/a-deep-dive-into-malicious-direct-syscall-detection/) (Palo Alto Networks)
- [ACR Stealer: Two Observed Intrusion Chains Amid Increased Threat Activity](https://www.microsoft.com/en-us/security/blog/2026/07/16/acr-stealer-two-observed-intrusion-chains-amid-increased-threat-activity/) (Microsoft Security Blog)
- [What Is a BYOVD Attack? Bring Your Own Vulnerable Driver, Explained](https://www.picussecurity.com/resource/blog/what-are-bring-your-own-vulnerable-driver-byovd-attacks) (Picus Security)
- [PoC: evil-mhyprot-cli](https://github.com/kkent030315/evil-mhyprot-cli) (Kento Oki, GitHub)
- [PoC: Mhyprot2DrvControl](https://github.com/kagurazakasanae/Mhyprot2DrvControl) (kagurazakasanae, GitHub)
- [CVE-2020-36603](https://www.rapid7.com/db/vulnerabilities/cve-2020-36603/) (Rapid7)
- [Ransomware Actor Abuses Genshin Impact Anti-Cheat Driver to Kill Antivirus](https://www.trendmicro.com/en_us/research/22/h/ransomware-actor-abuses-genshin-impact-anti-cheat-driver-to-kill-antivirus.html) (Trend Micro)
- [Qilin Ransomware and the Hidden Dangers of BYOVD](https://blackpointcyber.com/blog/qilin-ransomware-and-the-hidden-dangers-of-byovd/) (Blackpoint Cyber)

### Further Reading

- [Evadere Classifications](https://jonny-jhnson.dev/blog/evadere-classifications/) (Jonathan Johnson)
- [A Technical Deep Dive: Comparing Anti-Cheat Bypass and EDR Bypass](https://whiteknightlabs.com/2024/02/09/a-technical-deep-dive-comparing-anti-cheat-bypass-and-edr-bypass/) (White Knight Labs)