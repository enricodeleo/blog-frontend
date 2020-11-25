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
  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      term: ''
    }
  },

  async mounted () {
    this.term = this.$route.query.term

    try {
      this.posts = await this.$content('articles', { text: true }).search(this.term).sortBy('date', 'desc').fetch()
    } catch (error) {
      this.$log.error(error)
    }
  }
}
</script>

<style>

</style>
