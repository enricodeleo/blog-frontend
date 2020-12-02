<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3 order-2 order-md-1">
        <div
          class="d-flex flex-column justify-content-between w-100 h-100"
        >
          <div class="card border-primary order-2 order-md-1">
            <a ref="noopener" href="https://amzn.to/2VrreCI" target="_blank">
              <img src="~/assets/images/point-of-vue.jpg" class="card-img-top" width="100%" height="auto" alt="Point Of Vue">
            </a>
          </div>
          <div class="order-1 order-md-2 mt-3 mb-5 mb-md-0">
            <NuxtLink
              v-if="count > 6 && page > 1"
              :to="`/page/${page-1}`"
              class="btn btn-outline-link btn-block w-100 btn-lg"
            >
              👈 Indietro
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-md-9 order-1 order-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
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
  },

  head ({ $seo }) {
    return this.$seo({
      title: `Tuttli gli articoli di pagina ${this.page}`,
      description: 'Sfoglia tutti gli articoli del blog di Enrico'
    })
  }
}
</script>

<style>

</style>
