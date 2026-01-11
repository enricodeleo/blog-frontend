<template>
  <div class="py-8 space-y-8">
    <!-- Search Header -->
    <div class="space-y-2">
      <div class="border-l-2 border-amber-600/70 px-4 py-1">
        <h1 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
          Cerca nel Blog
        </h1>
      </div>
      <p v-if="term" class="text-sm text-[#3c4858] dark:text-gray-200">
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
        <button class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer" aria-label="Cerca">
          <Icon name="mdi:magnify" class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!loaded" class="flex justify-center">
      <div class="text-gray-500 dark:text-gray-400">Caricamento...</div>
    </div>

    <!-- Results -->
    <div v-if="loaded && posts && posts.length" class="space-y-8">
      <Post v-for="post in posts" :key="post.path" :post="post" />
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
const term = computed(() => String(route.query.term || '').trim())

// Update search term
const updateSearch = (value) => {
  const nextTerm = value.trim()
  if (nextTerm === term.value) return
  if (nextTerm) {
    router.push({ path: '/search', query: { term: nextTerm } })
    return
  }
  router.push({ path: '/search' })
}

// Search posts
const { data: posts, pending } = await useAsyncData(
  () => `search-${term.value || 'all'}`,
  async () => {
    if (!term.value) return []
    const sections = await queryCollectionSearchSections('articles')
    const normalizedTerm = term.value.toLowerCase()
    const matchedPaths = Array.from(new Set(
      sections
        .filter((section) => {
          const content = [
            section.title,
            ...(section.titles || []),
            section.content
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          return content.includes(normalizedTerm)
        })
        .map((section) => section.id.split('#')[0])
    ))

    if (!matchedPaths.length) return []

    return queryCollection('articles')
      .where('path', 'IN', matchedPaths)
      .order('date', 'DESC')
      .all()
  },
  { watch: [term] }
)
const loaded = computed(() => !pending.value)

// Runtime config for canonical URL
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// SEO Meta
useSeoMeta({
  title: 'Cerca nel blog - Lisergico',
  description: 'Cerca tra gli articoli del blog di Enrico Deleo. Trova tutorial, guide e approfondimenti su sviluppo web, DevOps, AI, architettura software e altro.',
  ogTitle: 'Cerca nel blog - Lisergico',
  ogDescription: 'Cerca tra gli articoli del blog di Enrico Deleo. Trova tutorial, guide e approfondimenti su sviluppo web, DevOps, AI, architettura software e altro.',
  // Prevent indexing of search results
  robots: 'noindex, follow'
})

// Canonical URL
useHead({
  link: [{
    rel: 'canonical',
    href: `${siteUrl}/search`
  }]
})
</script>
