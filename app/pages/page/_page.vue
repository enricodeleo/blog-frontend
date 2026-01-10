<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <!-- begin post -->
      <Post v-for="post of posts" :key="post.slug" :post="post" class="mb-5" />
      <!-- end post -->
    </div>
    <div class="flex items-center">
      <div>
        <NuxtLink
          v-if="count > 6 && page > 1"
          :to="`/page/${page-1}`"
          class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg flex items-center"
        >
          <span class="mr-2">👈</span>
          <span>Indietro</span>
        </NuxtLink>
        <NuxtLink
          v-else
          to="/"
          class="order-1 md:order-2 hover:text-green-800 text-center p-3 w-full text-lg flex items-center"
        >
          <span class="mr-2">👈</span>
          <span>Indietro</span>
        </NuxtLink>
      </div>
      <NuxtLink
        v-if="count > currentArticles"
        :to="`/page/${page+1}`"
        class="border border-green-600 hover:border-green-800 text-green-600 hover:text-green-800 text-center p-3 w-full text-lg rounded-md block font-semibold"
      >
        Altri post
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const page = parseInt(route.page as string)
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
  title: `Tutti gli articoli di pagina ${page}`,
  description: 'Sfoglia tutti gli articoli del blog di Enrico',
  ogTitle: `Tutti gli articoli di pagina ${page}`,
  ogDescription: 'Sfoglia tutti gli articoli del blog di Enrico'
})
</script>
