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
              <h1 v-if="loaded && posts.length" class="mt-0 pt-0">
                Risultati della ricerca <em>{{ term }}</em>
              </h1>
              <h1 v-if="!loaded" class="mt-0 pt-0">
                🤓 Sto cercando articoli su <em>{{ term }}</em> che possano interessarti...
              </h1>
              <h1 v-if="loaded && !posts.length" class="mt-0 pt-0">
                😵 Mi spiace non ho nulla su <em>{{ term }}</em>, prova un altro termine
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
  },

  head: {
    title: 'Cerca un articolo',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Cerca tra gli articoli scritti da Enrico'
      }
    ]
  }
}
</script>

<style>

</style>
