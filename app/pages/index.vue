<template>
  <div class="space-y-12">
    <!-- Hero Section - Minimal -->
    <div class="text-center py-8">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC] mb-4">
        Benvenuto su Lisergico
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-200 mb-2">
        Il blog di
        <a rel="noopener" href="https://enricodeleo.com" class="underline decoration-dotted underline-offset-4 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
          Enrico Deleo
        </a>
      </p>
      <p class="text-base text-gray-600 dark:text-gray-300">
        Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.
      </p>
    </div>

    <!-- Featured Section -->
    <section>
      <Featured :posts="featured" />
    </section>

    <!-- Recent Posts -->
    <section>
      <div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
        <h2 class="text-lg md:text-xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC]">
          Altre storie
        </h2>
      </div>

      <div class="space-y-0">
        <Post v-for="post in posts" :key="post.slug" :post="post" />
      </div>
    </section>

    <!-- Pagination Link -->
    <div class="text-center">
      <NuxtLink
        to="/page/2"
        class="inline-block px-6 py-2 text-gray-900 dark:text-[#F8FAFC] border border-gray-300 dark:border-gray-600 rounded-md hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-600 dark:hover:border-amber-500 transition-colors"
      >
        Altri post →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// Fetch featured posts
const { data: featured } = await useAsyncData(
  'featured-posts',
  () => queryContent('articles')
    .where({ sticky: true })
    .sort({ date: -1 })
    .limit(2)
    .find()
)

// Fetch recent posts
const { data: posts } = await useAsyncData(
  'recent-posts',
  () => queryContent('articles')
    .sort({ date: -1 })
    .limit(6)
    .find()
)

// SEO Meta
useSeoMeta({
  title: 'Il blog di Enrico Deleo',
  ogTitle: 'Il blog di Enrico Deleo',
  twitterCard: 'summary_large_image'
})
</script>
