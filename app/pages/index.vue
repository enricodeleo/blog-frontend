<template>
  <div class="space-y-12">
    <!-- Bento Grid - Sticky Posts -->
    <section v-if="featured && featured.length">
      <div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
        <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
          In primo piano
        </h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article
          v-for="post in featured"
          :key="post.slug"
          class="border border-[#c0ccda] dark:border-gray-700 rounded-lg p-6 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
        >
          <NuxtLink :to="`/${post.slug}`">
            <!-- Cover Image -->
            <figure v-if="post.coverImage" class="mb-4">
              <img
                :src="post.coverImage + '?resize=800,450&crop=0,0,800px,450px&strip=all'"
                :alt="post.title"
                class="rounded-lg w-full object-cover h-48"
                loading="lazy"
              >
            </figure>

            <!-- Title -->
            <h2 class="text-xl md:text-2xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-3">
              {{ post.title }}
            </h2>

            <!-- Description -->
            <p v-if="post.description" class="text-lg text-[#3c4858] dark:text-gray-200 mb-4 line-clamp-3">
              {{ post.description }}
            </p>

            <!-- Categories -->
            <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mb-3">
              <NuxtLink
                v-for="(category, index) in post.categories"
                :key="index"
                :to="`/category/${category}`"
                class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
              >
                {{ category.replace('-', ' ') }}
              </NuxtLink>
            </div>

            <!-- Meta -->
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span>•</span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ Math.ceil(calculateReadingTime(post.text)) }} min
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- Recent Posts -->
    <section>
      <div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
        <h2 class="text-lg md:text-xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
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
        class="inline-block px-6 py-2 text-[#3c4858] dark:text-[#F8FAFC] border border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
      >
        Altri post →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

// Format date
const formatDate = (date) => {
  const event = new Date(date)
  return event.toLocaleDateString('it-IT', dateOptions)
}

// Calculate reading time
const calculateReadingTime = (text) => {
  if (!text) return 0
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Fetch 4 most recent sticky posts for bento grid
const { data: featured } = await useAsyncData(
  'featured-posts',
  () => queryContent('articles')
    .where({ sticky: true })
    .sort({ date: -1 })
    .limit(4)
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
