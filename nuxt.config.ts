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

  // Nuxt 4 uses Nitro for static generation
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
      title: 'Lisergico',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Enrico Deleo' },
        { name: 'alternate', type: 'application/rss+xml', title: 'Lisergico &raquo; Feed', href: `${siteUrl}/feed.xml` }
      ],
      link: [
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
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
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          }
        }
      }
    }
  },

  // PWA Configuration (disabled for now - will implement later)
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['*.jpg', '*.svg'],
    manifest: {
      name: 'Lisergico',
      short_name: 'Lisergico',
      theme_color: '#6366f1',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'it'
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2}']
    }
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
