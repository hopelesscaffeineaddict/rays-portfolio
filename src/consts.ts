import { CATEGORIES } from "@/config/categories";

export const SITE_TITLE = "caffeineaddict";
export const DISPLAY_NAME = "Ray Goh";
export const SITE_DESCRIPTION =
  "Ray Goh (caffeineaddict). Incident responder based in Singapore, writing about EDRs, anticheats, and whatever else i'm nerding out on.";

// Landing page copy. Edit here.
export const INTRO =
  "hey, i'm ray! i'm an incident responder in singapore who likes digging into how EDRs and anticheats work (they're more similar than you'd think!). this site is where i think out loud and keep track of what i'm figuring out along the way.";

// About page copy.
export const BIO =
  "i'm ray, an incident responder based in singapore. i spend my time on windows endpoint internals, EDRs, and anticheats. i speak at conferences when they let me, and write things down here so i remember what i figured out.";

export const GITHUB_USERNAME = "hopelesscaffeineaddict";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ray-goh-l33t/";
export const EMAIL = "rayneorshine03@gmail.com";

export const NAV_LINKS: Array<{
  title: string;
  href: string;
  external?: boolean;
  children?: Array<{ title: string; href: string }>;
}> = [
  { title: "Home", href: "/" },
  {
    title: "Writing",
    href: "/writing",
    // dropdown, generated from the categories config
    children: CATEGORIES.map((c) => ({ title: c.label, href: `/writing/${c.id}` })),
  },
  { title: "Talks", href: "/talks" },
  { title: "About", href: "/about" },
  { title: "LinkedIn", href: LINKEDIN_URL, external: true },
  { title: "GitHub", href: "https://github.com/" + GITHUB_USERNAME, external: true },
  { title: "Email", href: "mailto:" + EMAIL },
];
