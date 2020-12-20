/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    darkSelector: '.dark-mode',
    fontFamily: {
      display: ['system-ui', 'sans-serif'],
      body: ['system-ui', 'sans-serif']
    },
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900')
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.500')
              }
            },

            h1: {
              color: theme('colors.gray.300')
            },
            h2: {
              color: theme('colors.gray.300')
            },
            h3: {
              color: theme('colors.gray.300')
            },
            h4: {
              color: theme('colors.gray.300')
            },
            h5: {
              color: theme('colors.gray.300')
            },
            h6: {
              color: theme('colors.gray.300')
            },

            strong: {
              color: theme('colors.gray.300')
            },

            code: {
              color: theme('colors.gray.300')
            },

            figcaption: {
              color: theme('colors.gray.500')
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark'],
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover',
      'responsive'
    ],
    borderColor: [
      'dark',
      'dark-focus',
      'dark-focus-within',
      'hover',
      'responsive'
    ],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-dark-mode')()
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  }
}
