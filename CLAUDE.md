# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run fmt       # Format all files with Prettier
```

## Architecture

**Astro 5** static site deployed to Cloudflare Workers. All pages are pre-rendered at build time (`output: "static"`).

### Where to make content changes

- **Copy and links** (tagline, intro, bio, nav, socials): `src/consts.ts`.
- **"Currently" panel** on the landing page: `src/content/site/currently.md` (label/value pairs in frontmatter).
- **Categories**: `src/config/categories.ts` (single source of truth; adding one is a one-line change).
- **Posts**: Markdown/MDX in `src/content/writing/`; the filename is the URL slug (`/writing/<slug>`, flat, never nested under category). Schema in `src/content.config.ts`: required `title`, `date`, `category`, `description`; optional `thumbnail`, `lang`, `tags`, `draft`, `updatedDate`, and talk-only `venue`, `slides_url`, `video_url`, `abstract`. `draft: true` hides a post everywhere (use `getPosts()` from `src/lib/writing.ts`, never `getCollection` directly). Slugs must not equal a category id.

### Routes

`/` landing, `/writing` (all), `/writing/<category>` and `/writing/<slug>` (both served by `pages/writing/[slug].astro`), `/talks` (talks only), `/about`. Old `/blog/*` redirects to `/writing/*` via `public/_redirects` and `redirects` in `astro.config.mjs`.

### Layout hierarchy

```
Layout.astro           ← base shell (BaseHead + Navbar + Footer)
└── WritingPost.astro  ← post wrapper (TOC, talk metadata, prev/next within category)
```

Landing (`pages/index.astro`) composes `Hero` → `LatestWriting`. The hero's back can shows the "currently" rows from `src/content/site/currently.md`.

### Component roles

- **`Section.astro`**: section with a JSX-style `<Title />` heading and a `<slot />`
- **`WritingListItem.astro` / `WritingList.astro`**: post rows used on `/`, `/writing`, category pages and `/talks`. Thumbnail renders only if `thumbnail` is set.
- **`CategoryTabs.astro`**: All/Research/Musings/Talks/Projects links, generated from the categories config
- **`Hero.astro`**: left: name, `<caffeineaddict />` handle, intro; right: front can plus back can listing the "currently" rows
- **`Navbar.astro`**: fixed top nav driven by `NAV_LINKS`
- **`BaseHead.astro`**: all `<head>` content: OG/Twitter meta, font preload, sitemap, View Transitions `ClientRouter`

### Styling conventions

- **Theme**: Monster Energy redesign — `#080808` base (`bg-monster-dark`), `#00dc32` accent (`text-monster`/`bg-monster`), dark surfaces `#1a1a1a`/`#2a2a2a` (`bg-surface`/`bg-surface-2`)
- **Fonts** (all declared in `src/styles/global.css`):
  - `font-monster` → `MonsterFont` (from `public/fonts/monster.woff2` + `.ttf`) — display headings, uppercase
  - `font-vcr` → `VCRosdNEUE` (from `public/fonts/VCRosdNEUE.ttf`) — fallback mono
  - `font-barlow` → `Barlow Condensed Italic 700` (Google Fonts) — name accent in hero
  - `font-mono` → `Share Tech Mono` (Google Fonts) — body/UI text
- **Scanline overlay**: `body::after` in `global.css` — fixed, `pointer-events: none`, z-index 9998
- **Glow utilities**: `shadow-monster`, `shadow-monster-sm`, `shadow-monster-lg` in Tailwind config; inline `text-shadow` style for green glow on headings
- Blog prose styled with `@tailwindcss/typography` (`prose prose-invert` + Monster overrides in `BlogPost.astro`)
- Path alias `@/` maps to `src/` (configured in `tsconfig.json`)

### Middleware

`src/middleware.ts` runs on every request and does two things:
1. Detects SQLi, path traversal, and scanner UAs — blocks high-severity hits with `403`
2. Injects security response headers (HSTS, CSP, `X-Frame-Options`, etc.)

This runs at the edge on Cloudflare Workers. Note: the site is `output: "static"` so middleware only applies when hosted on a runtime like Cloudflare — it has no effect during `astro preview`.

### RSS & Sitemap

Auto-generated at build time: `/rss.xml` (via `src/pages/rss.xml.js`) and `/sitemap-index.xml` (via `@astrojs/sitemap`). Both pull from the `writing` content collection (drafts excluded).
