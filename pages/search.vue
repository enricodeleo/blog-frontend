<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1 v-if="loaded && posts.length">
                Risultati della ricerca <em>{{ term }}</em>
              </h1>
              <h1 v-if="!loaded">
                🤓 Sto cercando articoli su <em>{{ term }}</em> che possano interessarti...
              </h1>
              <h1 v-if="loaded && !posts.length">
                😵 Mi spiace non ho nulla su <em>{{ term }}</em>, prova un altro termine
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
      term: '',
      loaded: false
    }
  },

  async mounted () {
    this.term = this.$route.query.term
    this.loaded = false

    try {
      this.posts = await this.$content('articles', { text: true }).search(this.term).sortBy('date', 'desc').fetch()
    } catch (error) {
      this.$log.error(error)
    }

    this.loaded = true
  }
}
</script>

<style>

</style>
