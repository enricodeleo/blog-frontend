<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="border-l-2 border-amber-600/70 px-4 py-1">
      <h1 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
        Pagina {{ page }}
      </h1>
      <p class="text-sm text-[#3c4858] dark:text-gray-200 mt-2">Sfoglia tutti gli articoli del blog</p>
    </div>

    <!-- Posts List -->
    <div class="space-y-8">
      <Post v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 pt-4">
      <NuxtLink
        v-if="page > 1"
        :to="page === 2 ? '/' : `/page/${page-1}`"
        class="px-4 py-2 text-[#3c4858] dark:text-[#F8FAFC] border border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
      >
        ← Indietro
      </NuxtLink>
      <span class="text-[#3c4858] dark:text-gray-200 font-bold">{{ page }}</span>
      <NuxtLink
        v-if="hasMore"
        :to="`/page/${page+1}`"
        class="px-4 py-2 text-[#3c4858] dark:text-[#F8FAFC] border border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
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
  () => queryCollection('articles')
    .order('date', 'DESC')
    .limit(limit)
    .skip(skip)
    .all()
)

// Check if there are more pages
const hasMore = computed(() => {
  return posts.value && posts.value.length === limit
})

// Runtime config for canonical URL
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// SEO Meta
useSeoMeta({
  title: `Pagina ${page} - Articoli del blog`,
  description: `Sfoglia gli articoli del blog di Enrico Deleo - Pagina ${page}. Articoli su sviluppo web, DevOps, AI, architettura software e molto altro.`,
  ogTitle: `Pagina ${page} - Articoli del blog`,
  ogDescription: `Sfoglia gli articoli del blog di Enrico Deleo - Pagina ${page}. Articoli su sviluppo web, DevOps, AI, architettura software e molto altro.`,
  // Prevent indexing of pagination pages to avoid duplicate content issues
  robots: () => page === 1 ? 'index, follow' : 'noindex, follow'
})

// Canonical URL
useHead({
  link: [{
    rel: 'canonical',
    href: () => page === 1 ? siteUrl : `${siteUrl}/page/${page}`
  }]
})
</script>
