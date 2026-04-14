export const SITE_TITLE = "caffeineaddict — Ray Goh";
export const DISPLAY_NAME = "ray goh";
export const SITE_DESCRIPTION =
  `Ray's blog — security analyst and CS student based in Australia, writing about cybersecurity, digital forensics, CTFs, and whatever else is on my mind.`.trim();

export const KNOWN_TECH = [
  {
    category: "CTFs",
    items: ["Web", "Pwn", "Rev",]
  },
  {
    category: "Tools",
    items: ["Wireshark", "Splunk", "ELK", "LogRhythm", "Burp Suite", "Binary Ninja", "IDA Pro"]
  },
  {
    category: "Languages",
    items: ["Python", "SQL", "C", "Bash", "PowerShell"]
  },
  {
    category: "DFIR",
    items: ["Volatility", "Autopsy"]
  }
];

export const ABOUT_ME =
  `hey, i'm ray! I'm a security analyst and CS student based in Australia, currently obsessed with digital forensics, threat intelligence, and the cool overlap between security and games. this is also my fourth attempt at a website :,)`.trim();
export const GITHUB_USERNAME = "hopelesscaffeineaddict";
export const QUOTE = "Security Analyst, Gamer, and CS Student";

export const NAV_LINKS: Array<{ title: string; href?: string; target?: string; rel?: string }> = [
  { title: "Blog" },
  { title: "Linkedin", href: "https://www.linkedin.com/in/ray-goh-l33t/", target: "_blank", rel: "noopener noreferrer" },
  { title: "Github", href: "//github.com/" + GITHUB_USERNAME, target: "_blank", rel: "noopener noreferrer" },
  { title: "Email", href: "mailto:rayneorshine03@gmail.com" },
  { title: "Resume", href: "resume.pdf", target: "_blank", rel: "noopener noreferrer" },
];