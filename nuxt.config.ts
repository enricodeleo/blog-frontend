import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://enricodeleo.com'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  // CSS
  css: ['./assets/css/main.css'],

  // Nuxt 4 uses Nitro for static generation
  nitro: {
    preset: 'static',
    trailingSlash: false
  },

  // Enable TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Vite plugins - Tailwind v4
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  // Global page headers
  app: {
    head: {
      title: 'Lisergico',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Enrico Deleo' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'alternate', type: 'application/rss+xml', title: 'Lisergico &raquo; Feed', href: `${siteUrl}/feed.xml` }
      ],
      link: [
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://connect.facebook.net' }
      ],
      script: [
        {
          innerHTML: `
            (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
          `,
          type: 'text/javascript',
          charset: 'utf-8',
          body: true
        },
        {
          innerHTML: `
            var _iub = _iub || [];
            _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"ccpaAcknowledgeOnDisplay":true,"whitelabel":false,"lang":"it","siteId":2076706,"enableCcpa":true,"countryDetection":true,"perPurposeConsent":true,"gdprAppliesGlobally":false,"cookiePolicyId":13699998, "banner":{ "position":"float-top-center","acceptButtonDisplay":true,"customizeButtonDisplay":true }};
          `,
          type: 'text/javascript',
          charset: 'utf-8',
          body: true
        },
        {
          type: 'text/javascript',
          charset: 'utf-8',
          src: '//cdn.iubenda.com/cs/ccpa/stable/stub.js',
          body: true
        },
        {
          type: 'text/javascript',
          charset: 'utf-8',
          src: '//cdn.iubenda.com/cs/stable/iubenda_cs.js',
          body: true
        }
      ]
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    'nuxt-schema-org'
  ],

  // Nuxt Content configuration
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    navigation: {
      fields: ['image', 'description']
    }
  },

  // Color mode
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-mode'
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Lisergico',
      short_name: 'Lisergico',
      lang: 'it',
      theme_color: '#000000'
    }
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl
    }
  }
})
