<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <div class="flex flex-col justify-between md:max-w-xs order-2 md:order-1">
      <a rel="noopener noreferrer" href="https://amzn.to/2VrreCI" target="_blank" class="order-2 md:order-1">
        <img src="~/assets/images/point-of-vue.jpg" alt="Point Of Vue" class="border border-green-600 rounded-md">
      </a>
      <NuxtLink
        v-if="count > 6 && page > 1"
        :to="`/page/${page-1}`"
        class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg block"
      >
        👈 Indietro
      </NuxtLink>
      <NuxtLink
        v-else
        to="/"
        class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg block"
      >
        👈 Indietro
      </NuxtLink>
    </div>
    <div class="flex-grow order-1 md:order-2">
      <!-- begin post -->
      <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
      <!-- end post -->
      <NuxtLink
        v-if="count > currentArticles"
        :to="`/page/${page+1}`"
        class="border border-green-600 hover:border-green-800 text-green-600 hover:text-green-800 text-center p-3 w-full text-lg rounded-md block mt-6 font-semibold"
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
