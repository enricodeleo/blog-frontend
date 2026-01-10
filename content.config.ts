export default defineContentConfig({
  // https://content.nuxt.com/docs/getting-started/installation
  locales: ['it'],
  defaultLocale: 'it',
  highlights: {
    // Default theme for code blocks
    theme: {
      default: 'github-light',
      dark: 'github-dark'
    }
  },
  navigation: {
    fields: ['image', 'description', 'date', 'sticky']
  },
  markdown: {
    // MDC options
    mdc: true
  },
  // Define collections
  collections: {
    articles: {
      // Load all markdown files from content/articles
      load: async (context) => {
        const files = await context.storage.scan('content/articles/**/*.md')
        return files.map(file => ({
          ...file,
          // Add any default values or transformations here
        }))
      }
    }
  }
})
