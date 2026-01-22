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

  // Ensure NuxtLink doesn't add trailing slashes
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove'
      }
    }
  },

  // CSS
  css: ['./app/assets/css/main.css'],

  // Nitro configuration
  nitro: {
    preset: 'static',
    trailingSlash: false,
    prerender: {
      failOnError: false,
      autoSubfolderIndex: false
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
    checker: false,
    build: {
      sourcemap: process.env.NODE_ENV !== 'production'
    }
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
    '@nuxt/scripts',
    '@vite-pwa/nuxt',
    '@nuxtjs/critters'
  ],

  // Nuxt Content configuration
  content: {
    renderer: {
      anchorLinks: false
    },
    markdown: {
      highlight: {
        theme: {
          default: 'github-light',
          dark: 'github-dark'
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
        /^\/$/,  // Exclude root path from navigation fallback
        /\/[^/?]+\.[^/?]+$/,  // Exclude files with extensions
      ],
      // Force cache update
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      // Deduplicate precache entries to avoid conflicts
      manifestTransforms: [
        (entries) => {
          const seen = new Map()
          const unique = entries.filter((entry) => {
            const url = entry.url
            if (seen.has(url)) {
              console.warn(`[PWA] Duplicate precache entry removed: ${url}`)
              return false
            }
            seen.set(url, true)
            return true
          })
          return { manifest: unique, warnings: [] }
        }
      ]
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
  }
})
