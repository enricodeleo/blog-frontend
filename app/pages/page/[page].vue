<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
        Pagina {{ page }}
      </h1>
      <p class="text-base-content/70">Sfoglia tutti gli articoli del blog</p>
    </div>

    <!-- Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      <Post v-for="post of posts" :key="post.slug" :post="post" />
    </div>

    <!-- Pagination -->
    <div class="join justify-center w-full">
      <NuxtLink
        v-if="page > 1"
        :to="page === 2 ? '/' : `/page/${page-1}`"
        class="join-item btn btn-outline"
      >
        « Indietro
      </NuxtLink>
      <button class="join-item btn btn-active">
        {{ page }}
      </button>
      <NuxtLink
        v-if="count > currentArticles"
        :to="`/page/${page+1}`"
        class="join-item btn btn-primary bg-gradient-to-r from-indigo-600 to-pink-600 border-none hover:opacity-90"
      >
        Avanti »
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

const currentArticles = computed(() => skip + (posts.value?.length || 0))

// Fetch total count on mount
const count = ref(0)

onMounted(async () => {
  const articles = await queryContent('articles').find()
  count.value = articles.length || 0
})

// SEO Meta
useSeoMeta({
  title: `Pagina ${page} - Tutti gli articoli`,
  description: 'Sfoglia tutti gli articoli del blog di Enrico',
  ogTitle: `Pagina ${page} - Tutti gli articoli`,
  ogDescription: 'Sfoglia tutti gli articoli del blog di Enrico'
})
</script>
