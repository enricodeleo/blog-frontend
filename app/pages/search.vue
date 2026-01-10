<template>
  <div class="py-8 space-y-8">
    <!-- Search Header -->
    <div class="border-l-4 border-amber-600 px-4 py-2">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
        Cerca nel Blog
      </h1>
      <p v-if="term" class="text-lg text-[#3c4858] dark:text-gray-200 mt-2">
        {{ loaded && posts && posts.length ? `${posts.length} risultati per` : loaded && (!posts || !posts.length) ? `Nessun risultato per` : `Cerco` }}
        <span class="font-bold">{{ term }}</span>
      </p>
    </div>

    <!-- Search Box -->
    <div class="max-w-2xl mx-auto">
      <div class="flex gap-2">
        <input
          type="text"
          name="term"
          placeholder="Cerca articoli..."
          class="flex-1 px-4 py-2 border border-[#c0ccda] dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-[#3c4858] dark:text-[#F8FAFC] placeholder-[#c0ccda] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          :value="term"
          @input="updateSearch($event.target.value)"
        >
        <button class="px-4 py-2 text-[#3c4858] dark:text-[#F8FAFC] border border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors" aria-label="Cerca">
          <Icon name="mdi:magnify" class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!loaded" class="flex justify-center">
      <div class="text-gray-500 dark:text-gray-400">Caricamento...</div>
    </div>

    <!-- Results -->
    <div v-if="loaded && posts && posts.length" class="space-y-0">
      <Post v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <!-- No Results -->
    <div v-if="loaded && (!posts || !posts.length)" class="border-l-4 border-gray-400 dark:border-gray-600 px-4 py-3 max-w-2xl mx-auto">
      <p class="text-lg font-bold text-[#3c4858] dark:text-[#F8FAFC]">Nessun risultato trovato</p>
      <p class="text-base text-[#3c4858] dark:text-gray-200 mt-1">Prova con un altro termine di ricerca</p>
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
