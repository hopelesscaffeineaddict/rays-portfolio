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

Almost all personal content lives in **`src/consts.ts`** — this is the first place to look when updating bio, skills, nav links, quotes, or site metadata. Blog posts are Markdown/MDX files in `src/content/blog/` with frontmatter enforced by `src/content.config.ts` (required: `title`, `description`, `pubDate`; optional: `updatedDate`, `heroImage`).

### Layout hierarchy

```
Layout.astro          ← base shell (BaseHead + Navbar + Footer)
└── BlogPost.astro    ← blog article wrapper (uses Layout + Tailwind prose)
```

Pages (`src/pages/`) compose layouts and components. The homepage (`pages/index.astro`) pulls blog posts via `getCollection("blog")` and renders them alongside the tech stack and about sections.

### Component roles

- **`Section.astro`** — reusable full/partial-height section with a JSX-style `<Title />` heading and a `<slot />`
- **`BlogPostCard.astro`** — terminal-styled card (fake traffic-light dots) used on both `/` and `/blog`
- **`Breadcrumb.astro`** — pill badge, used for tech stack items in `KNOWN_TECH`
- **`Hero.astro`** — full-screen intro with CSS typewriter animation and JS-driven binary background
- **`Navbar.astro`** — fixed top nav; logo style inverts on scroll via inline JS; active link derived from `Astro.url.pathname`
- **`BaseHead.astro`** — all `<head>` content: OG/Twitter meta, font preload, sitemap, View Transitions `ClientRouter`

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

Auto-generated at build time: `/rss.xml` (via `src/pages/rss.xml.js`) and `/sitemap-index.xml` (via `@astrojs/sitemap`). Both pull from the `blog` content collection.
