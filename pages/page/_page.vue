<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <!-- begin post -->
      <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
      <!-- end post -->
    </div>
    <div class="flex items-center">
      <div>
        <NuxtLink
          v-if="count > 6 && page > 1"
          :to="`/page/${page-1}`"
          class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg flex items-center"
        >
          <span class="mr-2">👈</span>
          <span>Indietro</span>
        </NuxtLink>
        <NuxtLink
          v-else
          to="/"
          class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg flex items-center"
        >
          <span class="mr-2">👈</span>
          <span>Indietro</span>
        </NuxtLink>
      </div>
      <NuxtLink
        v-if="count > currentArticles"
        :to="`/page/${page+1}`"
        class="border border-green-600 hover:border-green-800 text-green-600 hover:text-green-800 text-center p-3 w-full text-lg rounded-md block font-semibold"
      >
        Altri post
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const limit = 6
    const skip = limit * (params.page - 1)
    let posts

    try {
      posts = await app.$content('articles', { text: true }).sortBy('date', 'desc').limit(limit).skip(skip).fetch()
    } catch (error) {
      app.$log.error(error)
    }
    return {
      currentArticles: skip + posts.length,
      posts,
      page: parseInt(params.page)
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      category: {},
      count: 0
    }
  },

  async mounted () {
    try {
      const articles = await this.$content('articles').only([]).fetch()
      this.count = articles.length
    } catch (error) {
      this.$log.warn(error)
    }
  },

  head ({ $seo }) {
    return this.$seo({
      title: `Tuttli gli articoli di pagina ${this.page}`,
      description: 'Sfoglia tutti gli articoli del blog di Enrico'
    })
  }
}
</script>
