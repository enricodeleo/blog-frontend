# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies (uses npm as package manager)
npm install

# Development server with hot reload at localhost:3000
npm run dev

# Type checking (optional, disabled by default)
npm run typecheck

# Build for production (static site generation)
npm run build

# Generate static site with CDN replacement
npm run generate

# Preview production build
npm run preview
```

## Architecture Overview

This is a **Nuxt 4 static site** blog using **@nuxt/content** for markdown-based article management. The site generates a static blog with SEO optimization and matches the minimal design style of the personal-landing site.

### Design Philosophy

**Minimal & Professional** - Clean, typography-focused design inspired by personal-landing style:
- **No component library** - Pure Tailwind CSS v4 (no DaisyUI)
- **Focus on readability** - max-w-prose (65ch) for content
- **Subtle amber accents** - Used sparingly for borders and hover states
- **Clean typography** - Font-extrabold headings, text-lg body
- **Minimal borders** - Simple gray dividers, amber accent borders
- **No gradients** - Flat, solid colors only
- **No shadows** - Clean, flat design

### Project Structure

```
blog-frontend/
├── app/                      # Source directory (srcDir)
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css      # Tailwind v4 configuration + custom theme
│   │   └── images/           # Asset images
│   ├── components/           # Vue components (auto-imported)
│   │   ├── Featured.vue      # Featured posts section
│   │   ├── Footer.vue        # Site footer
│   │   ├── Header.vue        # Site navigation
│   │   └── Post.vue          # Article card component
│   ├── layouts/
│   │   ├── default.vue       # Main layout
│   │   └── error.vue         # Error page (Composition API)
│   └── pages/                # File-based routing
│       ├── [slug].vue        # Single article page
│       ├── category/
│       │   └── [slug].vue    # Category listing
│       ├── tag/
│       │   └── [slug].vue    # Tag listing
│       ├── page/
│       │   └── [page].vue    # Paginated homepage
│       ├── index.vue         # Homepage
│       └── search.vue        # Search functionality
├── content/                  # @nuxt/content markdown files
│   └── articles/             # Blog posts in Markdown
├── static/                   # Public assets (publicDir)
├── nuxt.config.ts            # Nuxt 4 configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Legacy (not used, v4 uses CSS)
└── CLAUDE.md                 # This file
```

### Technology Stack

**Core Framework:**
- **Nuxt 4** - Latest Nuxt with Vue 3 Composition API
- **Nitro** - Server engine (preset: 'static')
- **Vue 3** - Using `<script setup>` syntax (JavaScript, not TypeScript)

**Styling:**
- **Tailwind CSS v4** - Via @tailwindcss/vite plugin with CSS-first configuration
- **NO DaisyUI** - Pure Tailwind CSS matching personal-landing style
- **Custom dark mode** - Using `.dark` class with @custom-variant

**Key Modules:**
- **@nuxt/content** - Markdown-based content management
- **@nuxt/icon** - Icon components (MDI, etc.)
- **@nuxt/scripts** - Third-party script management (Disqus)
- **@vite-pwa/nuxt** - PWA support (minimal config, to be implemented later)

### Brand Guidelines

**Color Palette** (matching personal-landing):

**Light Mode:**
- Primary text: `gray-900` (#111827)
- Secondary text: `gray-700` (#374151)
- Tertiary text: `gray-600` (#4B5563)
- Muted text: `gray-500` (#6B7280)
- Background: `white` (#FFFFFF)
- Borders: `gray-200` (#E5E7EB), `gray-300` (#D1D5DB)
- Accent (sparingly): `amber-600` (#D97706)

**Dark Mode:**
- Primary text: `#F8FAFC`
- Secondary text: `#E5E7EB`
- Tertiary text: `gray-300` (#CBD5E1)
- Muted text: `gray-400` (#94A3B8)
- Background: `#0F172A` (main), `#111827` (secondary)
- Borders: `gray-600` (#4B5563), `gray-700` (#374151)
- Accent: `amber-500` (#F59E0B)

**Typography Scale:**
- H1 (Page titles): `text-2xl md:text-3xl font-extrabold leading-tight`
- H2 (Section titles): `text-lg md:text-xl font-extrabold leading-tight`
- Body: `text-lg`
- Small/Meta: `text-sm`
- Links: `underline decoration-dotted underline-offset-4`

**Layout Patterns:**
- Content width: `max-w-prose` (65ch) for readability
- Container: `container mx-auto px-5`
- Section headers: `border-l-4 border-amber-600 px-4 py-2`
- Dividers: `border-b border-gray-200 dark:border-gray-700`
- Spacing: `pb-3` for paragraphs, `mb-6 mt-4` for sections

**Component Patterns:**
- Cards: No cards, just clean dividers
- Buttons: Minimal bordered buttons with hover states
- Forms: Clean inputs with `border-gray-300 dark:border-gray-600`
- Accent borders: Use `border-l-4 border-amber-600` for callouts

### Content Structure

**Articles Location**: `content/articles/*.md`

**Article Frontmatter**:
```yaml
---
title: "Article Title"
date: 2024-01-01
categories:
  - category-name
tags:
  - tag-name
description: "Article description for SEO"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/..."
sticky: true  # Optional: for homepage featured posts
---
```

**Content Access via @nuxt/content**:
- Use `queryContent('articles', slug).findOne()` for single post
- Use `queryContent('articles').where(...).sort(...).find()` for listings
- Articles include `.text` property for full content (search, reading time)

### Page Routing

**Nuxt 4 Dynamic Routes**:
- File naming: `[slug].vue` NOT `_slug.vue`
- Parameter access: `route.params.slug` NOT `route.slug`

**Available Routes**:
- `/` - Homepage with featured and recent posts
- `/:slug` - Single article with related posts
- `/category/:slug` - Category listing
- `/tag/:slug` - Tag listing
- `/page/:page` - Paginated homepage
- `/search` - Search functionality

### Component Architecture

**Auto-Imported Components** (Nuxt 4 feature):
- No manual imports needed for components in `app/components/`
- Use `<Post />`, `<Featured />`, `<Header />`, `<Footer />` directly

**Key Components**:

**`app/components/Post.vue`** - Article listing component
- Minimal design with bottom border
- No card container
- Amber hover on title
- Dotted underline links

**`app/components/Featured.vue`** - Featured posts section
- Amber border section header
- Larger headings (text-2xl md:text-3xl)
- No special cards, just list

**`app/components/Header.vue`** - Site navigation
- Clean bordered header
- Minimal search input
- Social links with colored hovers
- Responsive mobile menu with transition

**`app/components/Footer.vue`** - Site footer
- Simple 2-column layout
- Minimal borders
- Dotted underline links

### Image Handling

- **Storage**: AWS S3 at `enricodeleo.s3.eu-south-1.amazonaws.com`
- **URL Construction**: Dynamic with resize parameters
- **Example**: `coverImage + '?resize=800,450&crop=0,0,800px,450px&strip=all'`
- **No fallback** - If no coverImage, don't show image placeholder

### SEO & Analytics

**Current Integrations**:
- **Google Analytics**: ID G-TPN05GHCDK (via gtag)
- **Disqus Comments**: Shortname 'lisergico' (loaded via @nuxt/scripts)
- **Open Graph**: Dynamic meta tags per article
- **RSS Feed**: `/feed.xml` (via NUXT_ENV_FRONTEND_URL)

**Removed Features**:
- Facebook Pixel (completely removed)
- iubenda privacy scripts (completely removed)
- @nuxtjs/color-mode (dark mode handled via .dark class)

### Development Notes

**Vue 3 Composition API**:
- Use `<script setup>` syntax
- Use `defineProps()` for props
- Use `computed()` for computed values
- Use `ref()` and `reactive()` for reactive state
- Use `onMounted()` for client-side hooks

**Async Data Fetching**:
```javascript
const { data: post } = await useAsyncData(
  `post-${slug}`,
  () => queryContent('articles', slug).findOne()
)
```

**Route Parameters** (Nuxt 4):
```javascript
const route = useRoute()
const slug = route.params.slug  // NOT route.slug
```

**Reading Time Calculation**:
```javascript
// Simple browser-compatible calculation
const readingTimeMinutes = computed(() => {
  if (!post.value || !post.value.text) return 0
  const wordsPerMinute = 200
  const words = post.value.text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
})
```

**Dark Mode**:
- Uses custom variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Dark background: `bg-[#0F172A]`
- Toggle .dark class on html/body element
- All colors have dark mode variants

### Build Process

**Static Site Generation**:
1. `npm run build` runs Nitro static preset
2. `npm run generate` runs build + CDN replacement script
3. Generates static HTML in `.output/public/`

**Nitro Configuration**:
```typescript
nitro: {
  preset: 'static',
  prerender: {
    failOnError: false  // Don't fail on 404s
  }
}
```

### Environment Variables

- `NUXT_ENV_FRONTEND_URL` - Base URL for site (default: https://enricodeleo.com)
- `NUXT_PUBLIC_GA_ID` - Google Analytics ID (default: G-TPN05GHCDK)

### Important Conventions

**DO**:
- Use bracket notation for dynamic routes: `[slug].vue`
- Access route params via `route.params.slug`
- Use minimal, flat design (no shadows, gradients, or cards)
- Use `<script setup>` syntax for all components
- Use ClientOnly for client-side only features
- Use max-w-prose for content readability
- Use amber-600 border accents sparingly
- Use dotted underlines for links: `decoration-dotted underline-offset-4`
- Use npm (not yarn)

**DON'T**:
- Use underscore notation: `_slug.vue` (Nuxt 2 convention)
- Access `route.slug` directly (will be undefined)
- Use TypeScript in components (user prefers JavaScript)
- Commit changes (user handles all git operations manually)
- Add DaisyUI or component libraries
- Use gradients or shadows
- Use indigo/pink color scheme (old design)

### Common Patterns

**Section Header**:
```vue
<div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
  <h2 class="text-lg md:text-xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC]">
    Section Title
  </h2>
</div>
```

**Link Style**:
```vue
<NuxtLink to="/path" class="underline decoration-dotted underline-offset-4 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
  Link Text
</NuxtLink>
```

**Input Field**:
```vue
<input
  type="text"
  placeholder="Placeholder..."
  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-gray-900 dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
>
```

**Button**:
```vue
<button class="px-4 py-2 text-gray-900 dark:text-[#F8FAFC] border border-gray-300 dark:border-gray-600 rounded-md hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-600 dark:hover:border-amber-500 transition-colors">
  Button Text
</button>
```

**Date Formatting**:
```javascript
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
const dateLong = computed(() => {
  const event = new Date(post.value.date)
  return event.toLocaleDateString('it-IT', dateOptions)
})
```

**Error Handling**:
```javascript
const { data: post, error } = await useAsyncData(
  `post-${slug}`,
  () => queryContent('articles', slug).findOne(),
  {
    onError: () => {
      throw createError({
        statusCode: 404,
        message: 'Pagina non trovata.'
      })
    }
  }
)
```

### Git Workflow

**CRITICAL**: User handles all git operations manually. Do NOT run:
- `git add`
- `git commit`
- `git push`

Make changes to files as requested, but let the user commit when ready.

### Design System Alignment

This blog matches the **personal-landing** design system:

**Shared Characteristics:**
- Same color palette (gray-900, amber-600 accents)
- Same typography scale (font-extrabold headings)
- Same minimal design philosophy
- Same border patterns
- Same link styles (dotted underlines)
- Same dark mode implementation

**Key Differences:**
- Blog has more complex layouts (listings, cards)
- Blog has image handling for articles
- Blog has search functionality
- Blog has pagination
- Both use identical base styles and dark mode

### Maintenance Notes

**When updating styles:**
1. Check personal-landing for consistency
2. Use the same color values
3. Follow the same spacing patterns
4. Maintain minimal, flat design
5. No shadows, gradients, or fancy effects

**When adding features:**
1. Keep it minimal and functional
2. Use dotted underlines for links
3. Use amber accents sparingly
4. Maintain readability with max-w-prose
5. Test both light and dark modes
