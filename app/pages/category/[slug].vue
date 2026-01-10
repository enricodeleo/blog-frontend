<template>
  <div class="space-y-8">
    <!-- Category Header -->
    <div class="border-l-4 border-amber-600 px-4 py-2">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
        Categoria: {{ categoryDisplay }}
      </h1>
      <p class="text-lg text-[#3c4858] dark:text-gray-200 mt-2">
        {{ posts && posts.length ? `${posts.length} articoli` : 'Nessun articolo' }} in questa categoria
      </p>
    </div>

    <!-- Posts List -->
    <div v-if="posts && posts.length" class="space-y-0">
      <Post v-for="post in posts" :key="post.slug" :post="post" />
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
const category = route.params.slug

// Display category with proper formatting
const categoryDisplay = computed(() => {
  return category.replace('-', ' ')
})

// Fetch posts by category
const { data: posts } = await useAsyncData(
  `category-${category}`,
  () => queryContent('articles')
    .where({ categories: { contains: category } })
    .sort({ date: -1 })
    .find()
)

// SEO Meta
useSeoMeta({
  title: () => `Categoria: ${categoryDisplay.value}`,
  description: () => `Sfoglia tutti gli articoli nella categoria "${categoryDisplay.value}"`,
  ogTitle: () => `Categoria: ${categoryDisplay.value}`,
  ogDescription: () => `Sfoglia tutti gli articoli nella categoria "${categoryDisplay.value}"`
})
</script>
