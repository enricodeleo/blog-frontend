<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1 class="text-capitalize">
                {{ tag }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
          <!-- end post -->
        </div>
      </div>
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

<style>

</style>
