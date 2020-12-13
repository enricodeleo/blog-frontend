<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <a rel="noopener noreferrer" href="https://amzn.to/2VrreCI" target="_blank" class="order-2 md:order-1 max-w-xs">
      <img src="~/assets/images/point-of-vue.jpg" alt="Point Of Vue" class="border border-green-600 rounded-md">
    </a>
    <div class="flex-grow order-1 md:order-2">
      <h1 class="text-3xl font-bold mb-5">
        Post con tag <em class="text-capitalize ">{{ tag }}</em>
      </h1>

      <!-- begin post -->
      <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
      <!-- end post -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const tag = params.slug
    let posts

    try {
      posts = await app.$content('articles', { text: true }).where({ tags: { $contains: tag } }).sortBy('date', 'desc').fetch()
    } catch (error) {
      app.$log.error(error)
    }

    return {
      posts,
      tag
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      tag: ''
    }
  },

  head ({ $seo }) {
    return this.$seo({
      title: `Articoli con tag #${this.tag}`,
      description: `Sfoglia tutti gli articoli con tag "${this.tag}"`
    })
  }
}
</script>
