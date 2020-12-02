<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <div class="card border-primary">
          <a ref="noopener" href="https://amzn.to/2VrreCI" target="_blank">
            <img src="~/assets/images/point-of-vue.jpg" class="card-img-top" width="100%" height="auto" alt="Point Of Vue">
          </a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="mainheading mt-0 pt-0">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1 class="mt-0 pt-0">
                Post con tag <em class="text-capitalize ">{{ tag }}</em>
              </h1>
            </div>
          </div>
        </div>
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
