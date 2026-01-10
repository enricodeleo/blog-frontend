<template>
  <section class="mb-8">
    <!-- Section Header -->
    <div class="border-l-2 border-amber-600/70 px-4 py-1 mb-4">
      <h2 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
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
