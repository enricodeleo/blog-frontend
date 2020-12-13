<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <a ref="noopener" href="https://amzn.to/2VrreCI" target="_blank" class="order-2 md:order-1 max-w-xs">
      <img src="~/assets/images/point-of-vue.jpg" alt="Point Of Vue" class="border border-green-600 rounded-md">
    </a>

    <div class="flex-grow order-1 md:order-2">
      <h1 v-if="loaded && posts.length" class="text-3xl font-bold mb-5">
        Risultati della ricerca <em>{{ term }}</em>
      </h1>
      <h1 v-if="!loaded" class="text-3xl font-bold mb-5">
        🤓 Sto cercando articoli su <em>{{ term }}</em> che possano interessarti...
      </h1>
      <h1 v-if="loaded && !posts.length" class="text-3xl font-bold mb-5">
        😵 Mi spiace non ho nulla su <em>{{ term }}</em>, prova un altro termine
      </h1>

      <!-- begin post -->
      <lazy-post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
      <!-- end post -->
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
