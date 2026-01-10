<template>
  <div class="space-y-8">
    <!-- Category Header -->
    <div class="space-y-2">
      <div class="border-l-2 border-amber-600/70 px-4 py-1">
        <h1 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
          Categoria: {{ categoryDisplay }}
        </h1>
      </div>
      <p class="text-sm text-[#3c4858] dark:text-gray-200">
        {{ posts && posts.length ? `${posts.length} articoli` : 'Nessun articolo' }} in questa categoria
      </p>
    </div>

    <!-- Posts List -->
    <div v-if="posts && posts.length" class="space-y-8">
      <Post v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <!-- No Results -->
    <div v-if="posts && !posts.length" class="border-l-4 border-gray-400 dark:border-gray-600 px-4 py-3 max-w-2xl mx-auto">
      <p class="text-lg font-bold text-[#3c4858] dark:text-[#F8FAFC]">Nessun articolo trovato</p>
      <p class="text-base text-[#3c4858] dark:text-gray-200 mt-1">Prova a cercare in un'altra categoria</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const category = String(route.params.slug)
const categoryFilter = `%"${category}"%`

// Display category with proper formatting
const categoryDisplay = computed(() => {
  return category.replace('-', ' ')
})

// Fetch posts by category
const { data: posts } = await useAsyncData(
  `category-${category}`,
  () => queryCollection('articles')
    .where('categories', 'LIKE', categoryFilter)
    .order('date', 'DESC')
    .all()
)

// SEO Meta
useSeoMeta({
  title: () => `Categoria: ${categoryDisplay.value}`,
  description: () => `Sfoglia tutti gli articoli nella categoria "${categoryDisplay.value}"`,
  ogTitle: () => `Categoria: ${categoryDisplay.value}`,
  ogDescription: () => `Sfoglia tutti gli articoli nella categoria "${categoryDisplay.value}"`
})
</script>
