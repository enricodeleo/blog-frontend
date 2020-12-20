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
    __dangerouslyDisableSanitizers: ['script'],
    title: 'Lisergico',
    meta: [
      { hid: 'author', name: 'author', content: 'Enrico Deleo' },
      { hid: 'alternate', name: 'alternate', type: 'application/rss+xml', title: 'Lisergico &raquo; Feed', href: `${process.env.NUXT_ENV_FRONTEND_URL}/feed.xml` }
    ],
    link: [
      { hid: 'dns-googletagmanager', rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
      { hid: 'dns-facebook', rel: 'dns-prefetch', href: 'https://connect.facebook.net' }
    ],
    script: [
      {
        hid: 'iubenda-privacy',
        innerHTML: `
          (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
        `,
        type: 'text/javascript',
        charset: 'utf-8',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie',
        innerHTML: `
          var _iub = _iub || [];
          _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"ccpaAcknowledgeOnDisplay":true,"whitelabel":false,"lang":"it","siteId":2076706,"enableCcpa":true,"countryDetection":true,"perPurposeConsent":true,"gdprAppliesGlobally":false,"cookiePolicyId":13699998, "banner":{ "position":"float-top-center","acceptButtonDisplay":true,"customizeButtonDisplay":true }};
        `,
        type: 'text/javascript',
        charset: 'utf-8',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie2',
        type: 'text/javascript',
        charset: 'utf-8',
        src: '//cdn.iubenda.com/cs/ccpa/stable/stub.js',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie3',
        type: 'text/javascript',
        charset: 'utf-8',
        src: '//cdn.iubenda.com/cs/stable/iubenda_cs.js',
        body: true,
        defer: true,
        async: true
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // '~/assets/styles/main.scss'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  fontawesome: {
    icons: {
      solid: [
        'faBars',
        'faTimes'
      ],
      brands: [
        'faFacebook',
        'faGithub',
        'faInstagram',
        'faLinkedin'
      ]
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-seo',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-lazy-load',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-gtag',
    'nuxt-facebook-pixel-module',
    'nuxt-logger'
  ],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'color-mode'
  },

  purgeCSS: {
    whitelist: ['dark-mode']
  },

  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: '1039271313132410',
    autoPageView: true,
    disabled: false
  },

  'google-gtag': {
    id: 'G-TPN05GHCDK',
    debug: isDev, // enable to track in dev mode
    disableAutoPageTrack: false
  },

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
      ogSiteName: 'Lisergico',
      ogHost: process.env.NUXT_ENV_FRONTEND_URL,
      theme_color: '#000000'
    },
    manifest: {
      name: 'Lisergico',
      lang: 'it',
      useWebmanifestExtension: false
    }
  },

  seo: {
    // Module options
    baseUrl: process.env.NUXT_ENV_FRONTEND_URL,
    name: 'Lisergico',
    title: 'Il blog di Enrico Deleo',
    lang: 'it-IT',
    language: 'Italian',
    templateTitle: '%title% | %name%',
    description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant',
    facebook: {
      pageId: '358373644189796',
      appId: '103937073008677'
    }
  },

  robots: {
    UserAgent: '*',
    Allow: '/'
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    splitChunks: {
      layouts: true
    },
    optimization: {
      splitChunks: {
        name: true
      }
    },
    babel: {
      presets ({ envName }) {
        const envTargets = {
          client: { browsers: ['last 2 versions'], ie: 11 },
          server: { node: 'current' }
        }
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 },
              targets: envTargets[envName]
            }
          ]
        ]
      }
    }
  },

  // nuxt-logger (https://www.npmjs.com/package/nuxt-logger)
  logger: {
    isEnabled: isDev,
    logLevel: isDev ? 'debug' : 'error'
  }
}
