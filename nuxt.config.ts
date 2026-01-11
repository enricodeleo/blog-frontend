import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // Set source directory to app/
  srcDir: 'app',

  // Use legacy static/ folder for public assets
  dir: {
    public: 'static'
  },

  devtools: { enabled: true },

  // CSS
  css: ['./app/assets/css/main.css'],

  // Nitro configuration
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false
    }
  },

  // Enable TypeScript
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Vite plugins - Tailwind v4
  vite: {
    plugins: [
      tailwindcss()
    ],
    // Disable vite-plugin-checker to avoid vue-tsc dependency
    checker: false
  },

  // Global page headers
  app: {
    head: {
      htmlAttrs: {
        lang: 'it'
      },
      title: 'Lisergico',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Enrico Deleo' },
        { name: 'alternate', type: 'application/rss+xml', title: 'Lisergico &raquo; Feed', href: `${siteUrl}/feed.xml` }
      ],
      link: [
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://enricodeleo.s3.eu-south-1.amazonaws.com' },
        { rel: 'preconnect', href: 'https://lisergico.disqus.com' },
        { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
      ]
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/critters'
  ],

  // Nuxt Content configuration
  content: {
    build: {
      markdown: {
        // Disable anchor links on headings
        anchorLinks: false,
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          }
        }
      }
    }
  },

  // PWA configuration with @vite-pwa/nuxt
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['*.jpg', '*.svg'],
    manifest: {
      name: 'Lisergico - Il blog di Enrico Deleo',
      short_name: 'Lisergico',
      description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'it',
      icons: [
        { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2}'],
      navigateFallbackDenylist: [
        /\/[^/?]+\.[^/?]+$/,
      ],
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl,
      googleAnalyticsId: process.env.NUXT_PUBLIC_GA_ID || ''
    }
  },

  // Critters configuration for CSS optimization
  critters: {
    config: {
      preload: 'swap'
    }
  },

  // Route rules for headers and caching
  routeRules: {
    // Static assets - long cache
    '/**/*.{js,css,png,jpg,jpeg,gif,svg,ico,woff,woff2}': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    // Feed and sitemap - short cache
    '/feed.xml': {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    },
    '/sitemap.xml': {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    },
    '/robots.txt': {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    },
    // HTML pages - no cache for fresh content
    '/**': {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate'
      }
    }
  }
})
