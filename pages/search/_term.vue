<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1>Risultati della ricerca <em>{{ term }}</em></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <Post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
          <!-- end post -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const term = params.term
    let posts

    try {
      posts = await app.$content('articles', { text: true }).search(term).sortBy('date', 'desc').fetch()
    } catch (error) {
      app.$log.error(error)
    }
    return {
      posts,
      term
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      term: ''
    }
  }
}
</script>

<style>

</style>
