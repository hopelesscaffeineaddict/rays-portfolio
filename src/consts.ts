export const SITE_TITLE = "caffeineaddict";
export const DISPLAY_NAME = "ray goh";
export const SITE_DESCRIPTION =
  `Ray's Portfolio.`.trim();

export const KNOWN_TECH = [
  {
    category: "Security",
    items: ["Web", "Pwn", "Rev",]
  },
  {
    category: "Tools",
    items: ["Wireshark", "Splunk", "Burp Suite", "Binary Ninja", "IDA Pro"]
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
  `sup, I'm ray! I'm a security analyst and CS student in Australia! I'm really interested in digital forensics and threat intelligence, especially in the context of games. It's also my third attempt at making a website :,)

`.trim();
export const GITHUB_USERNAME = "hopelesscaffeineaddict";
export const QUOTE = "Security Analyst, Gamer, and CS Student";

export const NAV_LINKS: Array<{ title: string; href?: string; target?: string; rel?: string }> = [
  { title: "Blog" },
  { title: "Linkedin", href: "https://www.linkedin.com/in/ray-goh-l33t/", target: "_blank", rel: "noopener noreferrer" },
  { title: "Github", href: "//github.com/" + GITHUB_USERNAME, target: "_blank", rel: "noopener noreferrer" },
  { title: "Email", href: "mailto:rayneorshine03@gmail.com" },
  { title: "Resume", href: "resume.pdf", target: "_blank", rel: "noopener noreferrer" },
];