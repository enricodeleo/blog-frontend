<template>
  <article class="border-b border-[#c0ccda] dark:border-gray-700 pb-6 last:border-b-0">
    <NuxtLink :to="`/${post.slug}`" :title="post.title">
      <!-- Cover Image -->
      <figure v-if="post.coverImage" class="mb-4">
        <img
          :src="post.coverImage + '?resize=800,450&crop=0,0,800px,450px&strip=all'"
          :alt="post.title"
          class="rounded-lg w-full object-cover"
          loading="lazy"
        >
      </figure>

      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-2">
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p v-if="post.description" class="text-lg text-[#3c4858] dark:text-gray-200 mb-3">
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
        <time :datetime="post.date">{{ dateLong }}</time>
        <span>•</span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ Math.ceil(readingTimeMinutes) }} min
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const dateLong = computed(() => {
  const event = new Date(props.post.date)
  return event.toLocaleDateString('it-IT', dateOptions)
})

// Simple reading time calculation (200 words per minute average)
const readingTimeMinutes = computed(() => {
  if (!props.post.text) return 0
  const wordsPerMinute = 200
  const words = props.post.text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
})
</script>
