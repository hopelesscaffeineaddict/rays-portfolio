export const SITE_TITLE = "caffeineaddict";
export const DISPLAY_NAME = "Ray Goh";
export const SITE_DESCRIPTION =
  "Ray Goh (caffeineaddict). Incident responder based in Singapore, writing about EDRs, anticheats, and whatever else i'm nerding out on.";

// Landing page copy. Edit here.
export const INTRO =
  "hey, i'm ray! i'm an incident responder in singapore, nerding out on EDRs, anticheats, and the space between them. this site is where i think out loud, drop the occasional deep dive, and keep track of what i'm figuring out along the way.";

// About page copy.
export const BIO =
  "i'm ray, an incident responder based in singapore. i spend my time on windows endpoint internals, EDRs, and the seam between malware and anticheats. i speak at conferences when they let me, and write things down here so i remember what i figured out.";

export const GITHUB_USERNAME = "hopelesscaffeineaddict";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ray-goh-l33t/";
export const EMAIL = "rayneorshine03@gmail.com";

export const NAV_LINKS: Array<{ title: string; href: string; external?: boolean }> = [
  { title: "Home", href: "/" },
  { title: "Writing", href: "/writing" },
  { title: "Talks", href: "/talks" },
  { title: "About", href: "/about" },
  { title: "LinkedIn", href: LINKEDIN_URL, external: true },
  { title: "GitHub", href: "https://github.com/" + GITHUB_USERNAME, external: true },
  { title: "Email", href: "mailto:" + EMAIL },
];
