<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1 class="text-capitalize">
                {{ category }}
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
    const category = params.slug
    let posts

    try {
      posts = await app.$content('articles', { text: true }).where({ categories: { $contains: category } }).sortBy('date', 'desc').fetch()
    } catch (error) {
      app.$log.error(error)
    }
    return {
      posts,
      category
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      category: ''
    }
  },

  head ({ $seo }) {
    return this.$seo({
      title: `Archivio categoria ${this.category}`,
      description: `Sfoglia tutti gli articoli nella categoria "${this.category}"`
    })
  }
}
</script>

<style>

</style>
