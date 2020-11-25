import nuxtContent from '@nuxt/content'
import MarkdownIt from 'markdown-it'

const isDev = process.env.NODE_ENV !== 'production'

const createSitemapRoutes = async () => {
  const routes = []
  const posts = await nuxtContent.$content('articles').fetch()

  for (const post of posts) {
    routes.push(post.slug)
  }

  return routes
}

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
      { hid: 'author', name: 'author', content: 'Enrico Deleo' },
      { hid: 'alternate', name: 'alternate', type: 'application/rss+xml', title: 'Lisergico &raquo; Feed', href: `${process.env.NUXT_ENV_FRONTEND_URL}/feed.xml` },
      { hid: 'google-site-verification', name: 'google-site-verification', content: 'lieXQeLzlhgoNXt_8gPsuRPJnkH0AgbaclRzO7O1cRg' },
      { hid: 'yandex-verification', name: 'yandex-verification', content: '262e8bf99b1d7507' },
      { hid: 'msvalidate.01', name: 'msvalidate.01', content: '364E09277CBE057A910EC10CF39F59C4' }
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
    '@nuxtjs/google-fonts'
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
    },
    useStylesheet: true,
    display: 'swap'
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
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-logger'
  ],

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create (feed) {
        feed.options = {
          title: 'Lisergico',
          id: process.env.NUXT_ENV_FRONTEND_URL,
          link: process.env.NUXT_ENV_FRONTEND_URL,
          description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant',
          language: 'it-IT',
          feedLinks: {
            rss: `${process.env.NUXT_ENV_FRONTEND_URL}/feed.xml`
          },
          author: {
            name: 'Enrico Deleo',
            email: 'hello@enricodeleo.com',
            link: 'https://enricodeleo.com'
          }
        }
        const md = new MarkdownIt()
        const posts = await nuxtContent.$content('articles', { text: true }).sortBy('date', 'desc').fetch()

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: `${process.env.NUXT_ENV_FRONTEND_URL}/${post.slug}`,
            link: `${process.env.NUXT_ENV_FRONTEND_URL}/${post.slug}`,
            description: post.description,
            image: post.coverImage,
            date: new Date(post.date),
            category: post.categories,
            author: [
              {
                name: 'Enrico Deleo',
                email: 'hello@enricodeleo.com',
                link: 'https://enricodeleo.com'
              }
            ],
            content: md.render(post.text)
          })
        })

        // feed.addCategory('Nuxt.js')

        feed.addContributor({

        })
      }, // The create function (see below)
      cacheTime: -1, // How long should the feed be cached
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],

  sitemap: {
    hostname: process.env.NUXT_ENV_FRONTEND_URL,
    gzip: true,
    cacheTime: 1000 * 60 * 24,
    routes: createSitemapRoutes
  },

  pwa: {
    meta: {
      lang: 'it',
      ogSiteName: 'Lisergico',
      ogHost: process.env.NUXT_ENV_FRONTEND_URL
    }
  },

  robots: {
    UserAgent: '*',
    Allow: '/'
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: '@/assets/styles/_variables.scss'
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // nuxt-logger (https://www.npmjs.com/package/nuxt-logger)
  logger: {
    isEnabled: isDev,
    logLevel: isDev ? 'debug' : 'error'
  }
}
