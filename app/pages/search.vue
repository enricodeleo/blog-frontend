<template>
  <div class="py-8 space-y-8">
    <!-- Search Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
        Cerca nel Blog
      </h1>
      <p v-if="term" class="text-lg text-base-content/70">
        {{ loaded && posts && posts.length ? `${posts.length} risultati per` : loaded && (!posts || !posts.length) ? `Nessun risultato per` : `Cerco` }} <span class="font-bold">{{ term }}</span>
      </p>
    </div>

    <!-- Search Box -->
    <div class="form-control max-w-2xl mx-auto">
      <div class="join w-full">
        <input
          type="text"
          name="term"
          placeholder="Cerca articoli..."
          class="input input-bordered join-item w-full text-lg"
          :value="term"
          @input="updateSearch($event.target.value)"
        >
        <button class="btn btn-primary join-item">
          <Icon name="mdi:magnify" class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!loaded" class="flex justify-center">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Results -->
    <div v-if="loaded && posts && posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Post v-for="post of posts" :key="post.slug" :post="post" />
    </div>

    <!-- No Results -->
    <div v-if="loaded && (!posts || !posts.length)" class="alert alert-warning max-w-2xl mx-auto">
      <Icon name="mdi:alert" class="text-2xl" />
      <div>
        <h3 class="font-bold">Nessun risultato trovato!</h3>
        <div class="text-xs">Prova con un altro termine di ricerca</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const term = (route.query.term) || ''
const loaded = ref(false)

// Update search term
const updateSearch = (value) => {
  if (value) {
    router.push({ path: '/search', query: { term: value } })
  }
}

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
