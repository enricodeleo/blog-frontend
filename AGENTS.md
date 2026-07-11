# AGENTS.md

Canonical agent context for this repository. `CLAUDE.md` is a symlink to this file — edit here only.

## Common Development Commands

```bash
# Install dependencies (uses bun as package manager — NOT npm or yarn; bun.lock is the only lockfile)
bun install

# Development server with hot reload at localhost:3000
bun run dev

# Type checking (optional, disabled by default)
bun run typecheck

# Lint
bun run lint

# Build for production (static site generation)
bun run build

# Generate static site with CDN replacement
bun run generate

# Preview production build
bun run preview
```

## Architecture Overview

This is a **Nuxt 4 static site** blog using **@nuxt/content** for markdown-based article management. The site generates a static blog with SEO optimization and matches the minimal design style of the personal-landing site (`../personal-landing`).

### Design Philosophy

**Minimal & Professional** - Clean, typography-focused design inspired by personal-landing style:
- **Component-light** - Prefer pure Tailwind CSS v4 utilities (no component libraries; DaisyUI is NOT used)
- **Focus on readability** - max-w-prose (65ch) for content
- **Subtle amber accents** - Used sparingly for borders and hover states
- **Clean typography** - Font-extrabold headings, text-lg body
- **Minimal borders** - Simple gray dividers, amber accent borders
- **No gradients, no shadows** - Flat, solid colors only

### Project Structure

```
blog-frontend/
├── app/                      # Source directory (srcDir)
│   ├── assets/css/main.css   # Tailwind v4 configuration + custom theme
│   ├── components/           # Vue components (auto-imported)
│   │   ├── Featured.vue      # Featured posts section
│   │   ├── Footer.vue        # Site footer
│   │   ├── Header.vue        # Site navigation
│   │   ├── LanguageSwitcher.vue  # IT/EN switch bar (client-only)
│   │   └── Post.vue          # Article card component
│   ├── composables/          # Auto-imported composables (useFormatDate, useJsonLd)
│   ├── layouts/              # default.vue, error.vue
│   └── pages/                # File-based routing
│       ├── [slug].vue        # Single article page (Italian)
│       ├── en/
│       │   ├── index.vue     # English cornerstone shelf
│       │   └── [slug].vue    # Single article page (English)
│       ├── category/[slug].vue
│       ├── tag/[slug].vue
│       ├── page/[page].vue   # Paginated homepage
│       ├── index.vue         # Homepage (Italian)
│       └── search.vue
├── content/                  # Nuxt Content v3 root
│   └── articles/             # Italian posts (*.md)
│       └── en/               # English adaptations (path becomes /en/<slug>)
├── content.config.ts         # Articles collection schema
├── docs/
│   └── blog-style-guide.md   # Writing guide (two lanes; defers to SOUL)
├── server/routes/            # Prerendered endpoints
│   ├── feed.xml.ts           # Italian RSS (excludes lang=en)
│   ├── en/feed.xml.ts        # English RSS (lang=en only)
│   └── sitemap.xml.ts        # Sitemap (both languages; lastmod = updated || date)
├── static/                   # Public assets (publicDir): robots.txt, llms.txt, humans.txt, logo.svg
├── nuxt.config.ts            # Nuxt 4 config (nitro preset 'static'; prerender routes incl. /en)
└── AGENTS.md                 # This file (CLAUDE.md symlinks here)
```

### Technology Stack

- **Nuxt 4** (Vue 3 `<script setup>`, JavaScript in components — user prefers JS; TS only in server routes/config)
- **Nitro** preset `static` (SSG; pages discovered by crawling + explicit prerender routes)
- **Tailwind CSS v4** via @tailwindcss/vite, CSS-first configuration
- **@nuxt/content v3** (`queryCollection`, `queryCollectionSearchSections`, `<ContentRenderer>`)
- **@nuxt/scripts** (Disqus), **@nuxtjs/critters** (critical CSS)
- **@vueuse/core** (`useColorMode` for dark mode — NOT @vueuse/nuxt)
- **better-sqlite3** (content DB at `.data/content/contents.sqlite`, read by feed/sitemap routes at build time)

## Bilingual Content (/en)

The blog is Italian-first with an English cornerstone section, mirroring personal-landing's i18n pattern:

- **Italian posts**: `content/articles/*.md`, root slugs (`/<slug>`), the whole editorial flow (homepage, pagination, categories, tags, `/feed.xml`).
- **English adaptations**: `content/articles/en/*.md` → `/en/<slug>`. Cornerstone-only, deliberately chosen for international distribution (HN, r/rust, …). Listed ONLY on `/en` and `/en/feed.xml` — every flow query filters `.where('lang', '=', 'it')` so English never leaks into the Italian stream.
- **Pairing**: `lang: "en"` + `translation: "/<italian-slug>"` on the EN post, reciprocal `translation: "/en/<slug>"` on the IT original. This drives hreflang alternates (it-IT / en / x-default→IT) on both article pages, `workTranslation`/`translationOfWork` in JSON-LD, and the LanguageSwitcher.
- **LanguageSwitcher**: client-only bar, appears when browser language differs from page language (or stored `preferredLocale`); homepage↔`/en` always, articles only when `translation` exists.
- Per-page `<html lang>` and JSON-LD `inLanguage` are derived from `post.lang`.

## Content Structure

**Article frontmatter** (schema in `content.config.ts`):

```yaml
---
title: "Article Title"
date: "2024-01-01T10:00:00.000Z"
updated: "2026-07-08"          # Optional: drives sitemap lastmod + JSON-LD dateModified
categories:
  - "category-name"            # lowercase kebab-case ONLY (links/sitemap lowercase them)
tags:
  - "tag-name"
description: "Article description for SEO"   # ALWAYS filled, ~120-155 chars
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/..."  # optional; social cards fall back to portrait
sticky: true                   # Optional: homepage featured (bento)
legacy: true                   # Optional: pre-2023 archive; lower sitemap priority, excluded from recent
lang: "en"                     # Optional: default 'it'; 'en' posts live in content/articles/en/
translation: "/other-slug"     # Optional: path of the paired translation (reciprocal)
---
```

**Slugs**: ASCII kebab-case only — smart quotes/en-dashes in filenames break page generation (a smart-quote slug once shipped a sitemap URL that 404ed).

**Content Access (Nuxt Content v3)**:
- Single post: `queryCollection('articles').path(slug).first()`
- Listings: `queryCollection('articles').where('lang', '=', 'it').order('date', 'DESC').skip(n).limit(m).all()`
- Search: `queryCollectionSearchSections()`
- Render: `<ContentRenderer :value="post" />`

## Page Routing

**Nuxt 4 conventions**: bracket files (`[slug].vue`, never `_slug.vue`); params via `route.params.slug` (never `route.slug`); `useAsyncData` (never `asyncData`).

Routes: `/`, `/:slug`, `/en`, `/en/:slug`, `/category/:slug`, `/tag/:slug`, `/page/:page`, `/search`, plus prerendered `/feed.xml`, `/en/feed.xml`, `/sitemap.xml`.

## SEO & GEO

- **Canonicals** self-referencing on every page; category links lowercased everywhere (case-insensitive LIKE would otherwise create duplicates).
- **noindex, follow**: tag pages, search, `/page/N` for N>1. These are also excluded from the sitemap.
- **Sitemap** (`server/routes/sitemap.xml.ts`): posts (lastmod = `updated || date`), lowercase category pages, `/` and `/en`. changefreq reflects real cadence (Google ignores it; lastmod is what counts).
- **JSON-LD** via `useJsonLd` composable: WebSite+Organization+Person on home (Person `sameAs` links the landing's `https://enricodeleo.com/#person` — reciprocal, for entity unification); BlogPosting+BreadcrumbList on articles; CollectionPage on listings.
- **llms.txt** (`static/llms.txt`): must follow the llmstxt.org spec — H1, blockquote summary, free-form prose, then H2 sections containing ONLY `- [name](url): description` link lists. Note: llms.txt has no measured effect on LLM citations; keep valid, don't invest further.
- **Default og:image**: pages/posts without coverImage fall back to `https://enricodeleo.com/enricodeleo.jpg` (twitter card downgrades to `summary`).
- **robots.txt** is a static file (`static/robots.txt`), NOT a server route.
- Google Analytics G-TPN05GHCDK (gtag); Disqus shortname 'lisergico' (EN pages use `en-<slug>` identifiers).

## Development Notes

**Async data pattern**:
```javascript
const { data: post } = await useAsyncData(
  `post-${slug}`,
  () => queryCollection('articles').path(slug).first()
)
```

**Date formatting**: `useFormatDate()` composable → it-IT long dates; EN pages format inline with `en-US`.

**Dark mode**: `@custom-variant dark (&:where(.dark, .dark *))` + `useColorMode` from `@vueuse/core`; dark bg `#0F172A`; every color needs a dark variant.

**Error handling**: throw `createError({ statusCode: 404, message: 'Pagina non trovata.' })` when a post is missing; EN pages also 404 when `post.lang !== 'en'`.

## Brand Guidelines

**Color Palette** (exact Brand Manual hex values):

Light: text `#3c4858`; surface `#F5F5F5`; borders `#c0ccda`; link hover `amber-700` (#b45309); section borders `amber-600` (#d97706); focus ring `blue-500`.

Dark: text `#F8FAFC` / `#E5E7EB`; bg `#0F172A` (main), `#111827` (secondary); borders gray-600/700; link hover `amber-400` (#fbbf24).

Social hovers: Facebook `#1877f2`, Instagram `#e1306c`, LinkedIn `#0077b5`, GitHub `#333`.

**Typography**: H1 `text-2xl md:text-3xl font-extrabold leading-tight`; H2 `text-lg md:text-xl font-extrabold`; body `text-lg`; meta `text-sm`; links `underline decoration-dotted underline-offset-4`.

**Layout patterns**: content `max-w-prose`; container `px-5 md:px-12`; section headers `border-l-4 border-amber-600 px-4 py-2`; dividers `border-b border-[#c0ccda] dark:border-gray-700`.

**Common patterns**:

```vue
<!-- Section header -->
<div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
  <h2 class="text-lg md:text-xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">Title</h2>
</div>

<!-- Link -->
<NuxtLink to="/path" class="underline decoration-dotted underline-offset-4 text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Text</NuxtLink>

<!-- Input -->
<input class="px-4 py-2 border border-[#c0ccda] dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-[#3c4858] dark:text-[#F8FAFC] placeholder-[#c0ccda] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
```

## Brand Voice & Content

- Confident, pragmatic, **Italian-first**; personal-brand positioning: "Fractional CTO & AI Solutions Architect" / "AI pragmatica che accelera business e prodotti".
- **Writing guide**: `docs/blog-style-guide.md` — two lanes (essays vs. query-shaped how-tos), CTA doctrine, lexicon. It defers to the SOUL document (kept OUTSIDE this public repo) for voice; SOUL is company-context, so its Traction framing never overrides the personal-brand positioning here.
- English adaptations are Lane-1 essays only, chosen for international distribution.

## Image Handling

- Storage: AWS S3 at `enricodeleo.s3.eu-south-1.amazonaws.com`; resize via query string, e.g. `coverImage + '?w=1088&h=612&strip=all'`.
- No placeholder when coverImage is missing (social cards use the portrait fallback instead).

## Build Process

1. `bun run build` → Nitro static preset, prerenders by crawling from `/` plus explicit routes (`/sitemap.xml`, `/feed.xml`, `/en`, `/en/feed.xml`).
2. `bun run generate` → build + CDN replacement script. Output in `.output/public/`.
3. `nitro.prerender.failOnError: false` — check the build log for `[404]`/`Server Error` lines anyway; a page silently missing from `.output/public/` is the main SSG failure mode.
4. Feed/sitemap routes read `.data/content/contents.sqlite` at build time.

## Environment Variables

- `NUXT_ENV_FRONTEND_URL` — base URL (default https://blog.enricodeleo.com; local builds show localhost URLs in canonicals/JSON-LD, which is expected)
- `NUXT_PUBLIC_GA_ID` — Google Analytics ID

## Testing Guidelines

No automated tests. Before declaring work done: `bun run lint`, optionally `bun run typecheck`, then manually verify `/`, `/[slug]`, `/en`, `/en/[slug]`, `/tag/[slug]`, `/category/[slug]`, `/search`, `/feed.xml`, `/en/feed.xml`, `/sitemap.xml`. For SEO-affecting changes, grep the generated `.output/public/` HTML (canonical, hreflang, JSON-LD) rather than trusting source.

## Git Workflow

**CRITICAL**: do NOT run `git add` / `git commit` / `git push` unless the user explicitly asks in the current conversation. When asked, use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`) with scoped subjects, e.g. `fix(seo): normalize category URLs to lowercase kebab-case`. Never commit the user's untracked drafts in `content/articles/` — add files explicitly, not with `git add -A`. PRs include a summary, commands run, and screenshots for UI changes.

## DO / DON'T

**DO**: bracket routes; `route.params.slug`; `queryCollection` + `<ContentRenderer>`; `.where('lang', '=', 'it')` on every Italian flow query; lowercase category links; `useColorMode` from @vueuse/core; ClientOnly for client-only features; max-w-prose; dotted underlines; amber accents sparingly; bun.

**DON'T**: `_slug.vue` / `route.slug` / `queryContent` / `asyncData` (Nuxt 2 relics); TypeScript in components; npm/yarn; component libraries (no DaisyUI); gradients or shadows; capitalized or spaced category values in frontmatter; smart quotes in filenames; commit without being asked.

## Maintenance Notes

When updating styles, check `../personal-landing` for consistency (same palette, spacing, dark mode). When adding features: keep minimal, test both themes, follow Nuxt Content v3 patterns, and keep the bilingual invariants (lang filters, translation reciprocity, hreflang both sides).
