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

# Preview production build
npm run preview
```

## Architecture Overview

This is a **Nuxt 4 static site** blog using **@nuxt/content** for markdown-based article management. The site generates a static blog with SEO optimization, modern UI with Tailwind CSS v4 + DaisyUI, and social media integration.

### Project Structure

```
blog-frontend/
├── app/                      # Source directory (srcDir)
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css      # Tailwind v4 + DaisyUI configuration
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
- **Tailwind CSS v4** - Via @tailwindcss/vite plugin with new CSS-first configuration
- **DaisyUI v5.5.14** - Component library for accessible, pre-built components
- **@tailwindcss/typography** - Enhanced typography for article content
- **Design System**: Bold & Vibrant with Indigo/Pink gradients
  - Primary: Indigo #6366f1 (light), #818cf8 (dark)
  - Secondary: Pink #ec4899 (light), #f472b6 (dark)
  - Accent: Amber #f59e0b (light), #fbbf24 (dark)

**Key Modules:**
- **@nuxt/content** - Markdown-based content management
- **@nuxt/icon** - Icon components (MDI, etc.)
- **@nuxt/scripts** - Third-party script management (Disqus)
- **@vite-pwa/nuxt** - PWA support (minimal config, to be implemented later)

**Utilities:**
- **reading-time-estimator** - Browser-compatible reading time calculation with Italian locale

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

**Nuxt 4 Dynamic Routes** (IMPORTANT - Different from Nuxt 2):
- File naming: `[slug].vue` NOT `_slug.vue`
- Parameter access: `route.params.slug` NOT `route.slug`

**Available Routes**:
- `/` - Homepage (app/pages/index.vue)
  - Hero section with gradient background
  - Featured posts (sticky: true)
  - Recent posts grid (3 columns)
- `/:slug` - Single article (app/pages/[slug].vue)
  - Full article with ContentRenderer
  - Related posts from same category
  - Disqus comments (ClientOnly)
  - Breadcrumb navigation
- `/category/:slug` - Category listing (app/pages/category/[slug].vue)
- `/tag/:slug` - Tag listing (app/pages/tag/[slug].vue)
- `/page/:page` - Paginated homepage (app/pages/page/[page].vue)
- `/search` - Search functionality (app/pages/search.vue)

### Component Architecture

**Auto-Imported Components** (Nuxt 4 feature):
- No manual imports needed for components in `app/components/`
- Use `<Post />`, `<Featured />`, `<Header />`, `<Footer />` directly

**Key Components**:

**`app/components/Post.vue`** - Article card component
- DaisyUI `card` component with hover lift effect
- Gradient badges for categories
- Clock icon for reading time
- Used in all listing pages

**`app/components/Featured.vue`** - Featured posts section
- Large gradient badge "In primo piano"
- Horizontal card layout (lg:card-side)
- Secondary gradient badges (pink to indigo)
- Only shown on homepage

**`app/components/Header.vue`** - Site navigation
- DaisyUI `navbar` component
- Sticky positioning with glass morphism
- Gradient logo text
- Search form with join pattern
- Social links (Facebook, Instagram, LinkedIn, GitHub)
- Responsive mobile dropdown menu

**`app/components/Footer.vue`** - Site footer
- DaisyUI `footer` component
- Gradient copyright text
- 2-column responsive layout

### Styling Guidelines

**DaisyUI Component Classes**:
- `card` - Content cards with shadow
- `badge` - Category labels, tags
- `btn` - Buttons, links
- `navbar` - Navigation
- `footer` - Footer layout
- `hero` - Hero sections
- `divider` - Section separators
- `input` - Form inputs
- `dropdown` - Menus
- `join` - Connected inputs/buttons

**Gradient Usage**:
```vue
<!-- Text gradient -->
<h1 class="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
  Title
</h1>

<!-- Background gradient -->
<div class="bg-gradient-to-br from-indigo-50 via-white to-pink-50">
  Content
</div>

<!-- Badge gradient -->
<span class="badge badge-primary bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none">
  Category
</span>
```

**Responsive Breakpoints**:
- Mobile: Default (< 640px)
- Tablet: `md:` (640px - 1024px)
- Desktop: `lg:` (> 1024px)

### Image Handling

- **Storage**: AWS S3 at `enricodeleo.s3.eu-south-1.amazonaws.com`
- **URL Construction**: Dynamic with resize parameters
- **Example**: `coverImage + '?resize=409,229&crop=0,0,409px,229px&strip=all'`
- **Fallback**: Gradient background when no cover image (indigo to pink)

### SEO & Analytics

**Current Integrations**:
- **Google Analytics**: ID G-TPN05GHCDK (via gtag)
- **Disqus Comments**: Shortname 'lisergico' (loaded via @nuxt/scripts)
- **Open Graph**: Dynamic meta tags per article
- **RSS Feed**: `/feed.xml` (via NUXT_ENV_FRONTEND_URL)

**Removed Features**:
- Facebook Pixel (completely removed)
- iubenda privacy scripts (completely removed)
- @nuxtjs/color-mode (dark mode to be re-implemented later)

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
import { readingTimeEstimator } from 'reading-time-estimator'

const readingTimeMinutes = computed(() => {
  return readingTimeEstimator(post.value.text || '', 'it').duration || 0
})
```

### Build Process

**Static Site Generation**:
1. `npm run build` runs Nitro static preset
2. Generates static HTML in `.output/public/`
3. No CDN replacement script (removed)
4. Ready for deployment to any static hosting

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
- Use DaisyUI component classes over custom CSS
- Use `<script setup>` syntax for all components
- Use ClientOnly for client-side only features
- Use npm (not yarn)

**DON'T**:
- Use underscore notation: `_slug.vue` (Nuxt 2 convention)
- Access `route.slug` directly (will be undefined)
- Use TypeScript in components (user prefers JavaScript)
- Commit changes (user handles all git operations manually)
- Add dark mode, iubenda, or Facebook Pixel (removed per user request)

### Common Patterns

**Category Badge**:
```vue
<NuxtLink :to="`/category/${category}`"
          class="badge badge-primary bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none hover:opacity-80">
  {{ category.replace('-', ' ') }}
</NuxtLink>
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

### Design Philosophy

**Current Style**: Bold & Vibrant
- Strong gradients (indigo to pink)
- Enhanced visual hierarchy
- Eye-catching colors
- Modern glass morphism effects
- Smooth hover transitions
- Enhanced shadows and depth

**Typography**:
- Gradient text for key headings
- Enhanced font weights
- Better line heights
- Larger heading sizes
