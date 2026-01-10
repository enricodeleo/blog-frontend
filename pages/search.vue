<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <div>
      <h1 v-if="loaded && posts && posts.length" class="text-3xl font-bold mb-5">
        Risultati della ricerca <em>{{ term }}</em>
      </h1>
      <h1 v-if="!loaded" class="text-3xl font-bold mb-5">
        🤓 Sto cercando articoli su <em>{{ term }}</em> che possano interessarti...
      </h1>
      <h1 v-if="loaded && (!posts || !posts.length)" class="text-3xl font-bold mb-5">
        😵 Mi spiace non ho nulla su <em>{{ term }}</em>, prova un altro termine
      </h1>

      <!-- begin post -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <Post v-for="post of posts" :key="post.slug" :post="post" class="mb-5" />
      </div>
      <!-- end post -->
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const term = (route.query.term as string) || ''
const loaded = ref(false)

// Search posts
const { data: posts } = await useAsyncData(
  `search-${term}`,
  async () => {
    loaded.value = false
    try {
      const results = await queryContent('articles')
        .search(term)
        .sort({ date: -1 })
        .find()
      loaded.value = true
      return results
    } catch (error) {
      console.error(error)
      loaded.value = true
      return []
    }
  }
)

// SEO Meta
useSeoMeta({
  title: 'Cerca un articolo',
  description: 'Cerca tra gli articoli scritti da Enrico',
  ogTitle: 'Cerca un articolo',
  ogDescription: 'Cerca tra gli articoli scritti da Enrico'
})
</script>
