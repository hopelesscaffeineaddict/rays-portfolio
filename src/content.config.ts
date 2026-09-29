import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { CATEGORY_IDS } from "@/config/categories";

const writing = defineCollection({
  // Every post lives in src/content/writing/. The filename is the URL slug.
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(CATEGORY_IDS),
      description: z.string(),
      thumbnail: z.string().optional(),
      lang: z.string().default("eng"),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      // talk-only fields
      venue: z.string().optional(),
      slides_url: z.string().optional(),
      video_url: z.string().optional(),
      abstract: z.string().optional(),
    })
    .refine((d) => d.category !== "talks" || !!d.venue, {
      message: "talks require a `venue`",
      path: ["venue"],
    }),
});

// Small "currently" panel on the landing page: src/content/site/currently.md
const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.md" }),
  schema: z.object({
    items: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});

export const collections = { writing, site };
