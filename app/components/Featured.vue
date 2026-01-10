<template>
  <section class="mb-8">
    <!-- Section Header -->
    <div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
      <h2 class="text-lg md:text-xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
        In primo piano
      </h2>
    </div>

    <!-- Featured Posts -->
    <div class="space-y-8">
      <article
        v-for="post in featuredPosts"
        :key="post.path || post.id"
        class="border-b border-[#c0ccda] dark:border-gray-700 pb-6 last:border-b-0"
      >
        <NuxtLink :to="post.path" class="block">
          <!-- Cover Image -->
          <figure v-if="post.coverImage" class="mb-4">
            <img
              :src="post.coverImage"
              :alt="post.title"
              class="rounded-lg w-full object-cover"
              loading="lazy"
            >
          </figure>

          <!-- Title -->
          <h2 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-2">
            {{ post.title }}
          </h2>

          <!-- Meta -->
          <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span>•</span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ getReadingTimeMinutes(post.body || post.description) }} minuti di lettura
            </span>
          </div>
        </NuxtLink>

        <!-- Categories -->
        <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mt-3">
          <NuxtLink
            v-for="(category, index) in post.categories"
            :key="index"
            :to="`/category/${category}`"
            class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
          >
            {{ category.replace('-', ' ') }}
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { getReadingTimeMinutes } from '~/utils/content'

const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const formatDate = (date) => {
  const event = new Date(date)
  return event.toLocaleDateString('it-IT', dateOptions)
}

const featuredPosts = computed(() => {
  if (!props.posts || props.posts.length === 0) {
    return []
  }
  return props.posts
})
</script>
