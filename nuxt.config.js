const isDev = process.env.NODE_ENV !== 'production'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Lisergico',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant' },
      { hid: 'author', name: 'author', content: 'Enrico Deleo' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',
    'nuxt-purgecss'
  ],

  fontawesome: {
    icons: {
      brands: [
        'faFacebook',
        'faGithub',
        'faInstagram',
        'faLinkedin'
      ]
    }
  },

  googleFonts: {
    families: {
      Righteous: true
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-logger'
  ],

  pwa: {
    meta: {
      lang: 'it',
      ogSiteName: 'Lisergico',
      ogHost: process.env.NUXT_ENV_FRONTEND_URL
    }
  },

  robots: {
    UserAgent: '*',
    Disallow: '/'
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: '@/assets/styles/_variables.scss'
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    nestedProperties: ['categories', 'tag']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // nuxt-logger (https://www.npmjs.com/package/nuxt-logger)
  logger: {
    isEnabled: isDev,
    logLevel: isDev ? 'debug' : 'error'
  }
}
