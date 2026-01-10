# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies (uses yarn as package manager)
yarn install

# Development server with hot reload at localhost:3000
yarn dev

# Lint JavaScript/Vue files
yarn lint

# Build for production (static site generation)
yarn build

# Generate static site (production build with CDN replacement)
yarn generate

# Start production server (after build)
yarn start
```

## Architecture Overview

This is a **Nuxt 2 static site** blog (target: 'static') using **@nuxt/content** for markdown-based article management. The site generates a static blog with SEO optimization, PWA features, and social media integration.

### Content Structure

- **Articles Location**: `content/articles/*.md`
- **Article Frontmatter**:
  - `title`: Article title
  - `date`: ISO 8601 date string
  - `categories`: Array of category strings
  - `tags`: Array of tag strings
  - `description`: Article description for SEO
  - `coverImage`: S3 URL for featured image
  - `sticky`: Boolean for homepage featured posts

### Key Architecture Components

**Content Management (@nuxt/content)**
- All blog posts are Markdown files in `content/articles/`
- Content is accessible via `$content()` in asyncData
- Articles are fetched with `{ text: true }` to include full content for search and RSS

**Page Routing**
- `/` - Homepage (pages/index.vue) - displays featured posts and recent posts
- `/:slug` - Single article (pages/_slug.vue) - displays full article with related posts
- `/category/:slug` - Category listing
- `/tag/:slug` - Tag listing
- `/page/:page` - Paginated homepage
- `/search` - Search functionality

**Component Structure**
- `Post.vue` - Article card component (used in listings)
- `Featured.vue` - Featured posts section on homepage
- `Header.vue` - Site navigation
- `Footer.vue` - Site footer

**Layouts**
- `layouts/default.vue` - Main layout with Header/Footer and container max-width

### Image Handling

- Images are hosted on AWS S3: `enricodeleo.s3.eu-south-1.amazonaws.com`
- Production build runs `replace-cdn.js` which replaces S3 URLs with WordPress.com CDN (`i2.wp.com/...`) for performance
- Image URLs are dynamically constructed with resize parameters

### SEO & Social Features

- **nuxt-seo** module provides base SEO configuration
- **JSON-LD structured data** via `nuxt-jsonld` plugin
- **RSS Feed** generated at `/feed.xml` using @nuxtjs/feed
- **Facebook Pixel** integration (ID: 1039271313132410)
- **Google Analytics** via gtag (ID: G-TPN05GHCDK)
- **Open Graph** tags for social sharing
- **Sitemap** automatically generated from all articles
- **Disqus** comments on article pages

### Dark Mode

- Uses `@nuxtjs/color-mode` with system preference detection
- Tailwind configured with `dark-mode` class (not `dark:` prefix)
- Custom typography plugin configuration for dark mode styling

### Build Process

1. `nuxt generate` creates static HTML in `dist/`
2. `replace-cdn.js` post-processes HTML to replace S3 URLs with CDN URLs
3. Static files are ready for deployment to any static hosting

### Environment Variables

- `NUXT_ENV_FRONTEND_URL` - Base URL for the site (used in feeds, sitemap, SEO)

## Important Notes

- This is a **Nuxt 2** project (not Nuxt 3)
- Uses **Tailwind CSS** with custom dark mode configuration
- **Reading time** calculated client-side using `reading-time` package
- **Related posts** fetched randomly from same category
- All article content includes `.text` property from @nuxt/content
- Components auto-imported (components: true in nuxt.config.js)
