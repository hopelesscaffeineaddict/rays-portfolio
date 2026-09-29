// Single source of truth for writing categories.
// To add one: add an entry here and set `category: <id>` in a post's frontmatter.
export const CATEGORIES = [
  { id: "research", label: "Research", blurb: "technical teardowns and deep dives." },
  { id: "musings", label: "Musings", blurb: "reflections on work, industry and career." },
  { id: "talks", label: "Talks", blurb: "abstracts, slides and recordings." },
  { id: "projects", label: "Projects", blurb: "builds and tinkering." },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as [CategoryId, ...CategoryId[]];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
