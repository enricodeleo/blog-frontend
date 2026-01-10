import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: {
        include: 'articles/**',
        prefix: '/'
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        coverImage: z.string().optional(),
        sticky: z.boolean().default(false)
      })
    })
  }
})
