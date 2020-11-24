<template>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-md-2 order-2 order-md-1">
        <NuxtLink v-if="count > 6 && page > 1" :to="`/page/${page-1}`" class="btn btn-outline-link btn-block btn-lg">
          👈 Indietro
        </NuxtLink>
      </div>
      <div class="col-md-9 offset-md-1 order-1 order-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <Post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
          <!-- end post -->
          <NuxtLink v-if="count > currentArticles" :to="`/page/${page+1}`" class="btn btn-outline-primary btn-block btn-lg">
            Altri post
          </NuxtLink>
        </div>
      </div>
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
  }
}
</script>

<style>

</style>
