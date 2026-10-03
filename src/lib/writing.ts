import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"writing">;

/** A frontmatter link, or undefined when it's empty or "n/a". */
export function realLink(url?: string): string | undefined {
  const v = url?.trim();
  return v && v.toLowerCase() !== "n/a" ? v : undefined;
}

/** Published posts, newest first. Drafts are excluded everywhere. */
export async function getPosts(category?: string): Promise<Post[]> {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  return posts
    .filter((p) => !category || p.data.category === category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
