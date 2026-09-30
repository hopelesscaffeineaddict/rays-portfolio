# caffeineaddict

Source for [hopelesscaffeineaddict.com](https://hopelesscaffeineaddict.com), the writing hub and portfolio of Ray Goh (incident responder, Singapore). It holds research posts, musings, conference talks and projects, plus a landing page and an about page.

Astro 5 + Tailwind 3, pre-rendered to static HTML and served by a Cloudflare Worker. Dark theme (`#080808`, `#00dc32` accent), terminal and Monster Energy styling.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site to dist/
npm run preview   # serve dist/ (no Worker or middleware, so no headers or edge blocking)
npm run fmt       # Prettier
```

Node 22+ (wrangler 4 requires it; CI uses 22).

## Where to change things

| To change | Edit |
| --- | --- |
| Intro, bio, site description, nav links, social links | `src/consts.ts` |
| "Currently" rows on the back can | `src/content/site/currently.md` |
| Categories (add, rename) | `src/config/categories.ts` |
| Posts and talks | `src/content/writing/*.md` |
| Colours, fonts, glow utilities | `tailwind.config.mjs`, `src/styles/global.css` |
| Post page layout, contents sidebar, back button | `src/layouts/WritingPost.astro` |
| Loading animation | `src/components/CanLoader.astro` |

## Writing content

Add `src/content/writing/<slug>.md`. The filename is the URL (`/writing/<slug>`); it is flat and never nested under the category. Slugs must not equal a category id (`research`, `musings`, `talks`, `projects`); the build fails if they do.

```yaml
---
title: "Post title"
date: 2026-05-16
category: research          # research | musings | talks | projects
description: "One line shown in lists"
thumbnail: /blog-assets/x.png   # optional; list rows render fine without it
tags: [edr, windows]            # optional
lang: eng                       # default
draft: true                     # default false; hides the post everywhere, including RSS
updatedDate: 2026-06-01         # optional
---
```

Talks also take `venue` (required), `slides_url`, `video_url` and `abstract`. A talk with an empty body renders its abstract as the content.

Reading time is computed automatically. The schema is in `src/content.config.ts`; always load posts through `getPosts()` in `src/lib/writing.ts` so drafts stay hidden.

**MonsterFont only draws letters.** Its digits and punctuation are blank, so `global.css` limits it to A-Z and falls back to VCRosdNEUE for everything else.

## Routes

| Route | Source |
| --- | --- |
| `/` | `pages/index.astro`: Hero, latest 3 posts |
| `/writing` | all posts, with category tabs |
| `/writing/<category>` and `/writing/<slug>` | `pages/writing/[slug].astro` (serves both) |
| `/talks` | talks only |
| `/about` | bio, links, "stuff i like" |
| `/rss.xml`, `/sitemap-index.xml` | generated at build, drafts excluded |
| `/blog/*` | redirects to `/writing/*` (`public/_redirects`, `redirects` in `astro.config.mjs`) |

## Layout

```
src/
  components/   Hero (two cans), CanLoader (intro), Navbar (Writing dropdown),
                WritingList/WritingListItem, CategoryTabs, LatestWriting, Section
  config/       categories.ts
  content/      writing/ (posts), site/currently.md
  layouts/      Layout.astro (shell), WritingPost.astro (post page)
  lib/          writing.ts (getPosts)
  pages/        routes above
  consts.ts     site copy and nav
  middleware.ts security checks for astro dev/hosted runtimes
worker/index.js Cloudflare Worker: URL checks and security headers in front of dist/
public/         fonts, icons, blog-assets, _headers, _redirects, resume.pdf
```

`@/` maps to `src/`.

## Security

`worker/index.js` runs in front of the static assets. It decodes the URL and blocks SQL-injection patterns with a 403, logs path traversal and scanner user agents, and adds security headers (CSP, HSTS, X-Frame-Options and others). The same headers are in `public/_headers` and `src/middleware.ts`; keep the three in sync.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: `npm ci`, a TruffleHog secrets scan, `npm run build`, then `npx wrangler deploy`. It needs the `CLOUDFLARE_API_TOKEN` repository secret. `wrangler.toml` defines the Worker, the `dist/` asset directory and the custom domains.

`site` in `astro.config.mjs` sets sitemap, RSS and canonical URLs.
