<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="border-l-4 border-amber-600 px-4 py-2">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC]">
        Pagina {{ page }}
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-200 mt-2">Sfoglia tutti gli articoli del blog</p>
    </div>

    <!-- Posts List -->
    <div class="space-y-0">
      <Post v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 pt-4">
      <NuxtLink
        v-if="page > 1"
        :to="page === 2 ? '/' : `/page/${page-1}`"
        class="px-4 py-2 text-gray-900 dark:text-[#F8FAFC] border border-gray-300 dark:border-gray-600 rounded-md hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-600 dark:hover:border-amber-500 transition-colors"
      >
        ← Indietro
      </NuxtLink>
      <span class="text-gray-700 dark:text-gray-200 font-bold">{{ page }}</span>
      <NuxtLink
        v-if="hasMore"
        :to="`/page/${page+1}`"
        class="px-4 py-2 text-gray-900 dark:text-[#F8FAFC] border border-gray-300 dark:border-gray-600 rounded-md hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-600 dark:hover:border-amber-500 transition-colors"
      >
        Avanti →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const page = parseInt(route.params.page) || 1
const limit = 6
const skip = limit * (page - 1)

// Fetch posts for current page
const { data: posts } = await useAsyncData(
  `page-${page}`,
  () => queryContent('articles')
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip)
    .find()
)

// Check if there are more pages
const hasMore = computed(() => {
  return posts.value && posts.value.length === limit
})

// SEO Meta
useSeoMeta({
  title: `Pagina ${page} - Tutti gli articoli`,
  description: 'Sfoglia tutti gli articoli del blog di Enrico',
  ogTitle: `Pagina ${page} - Tutti gli articoli`,
  ogDescription: 'Sfoglia tutti gli articoli del blog di Enrico'
})
</script>
