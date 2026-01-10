<template>
  <article class="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <NuxtLink :to="`/${post.slug}`" :title="post.title">
      <figure class="relative">
        <img v-if="post.coverImage" :src="post.coverImage + '?resize=409,229&crop=0,0,409px,229px&strip=all'" :alt="post.title" class="rounded-t-xl object-cover h-72 w-full">
        <div v-else class="flex flex-col justify-center items-center w-full h-72 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-t-xl text-white text-2xl font-bold p-12">
          {{ post.title }}
        </div>
      </figure>
    </NuxtLink>

    <div class="card-body">
      <NuxtLink :to="`/${post.slug}`">
        <h2 class="card-title text-2xl font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent transition-all">
          {{ post.title }}
        </h2>
      </NuxtLink>
      <p class="text-base-content/70 leading-relaxed mt-2">
        {{ post.description }}
      </p>

      <div class="card-actions justify-between items-center mt-4">
        <div class="flex flex-wrap gap-2">
          <span v-for="(category, index) of (post.categories || [])" :key="index">
            <NuxtLink :to="`/category/${category}`" class="badge badge-primary bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none hover:opacity-80">
              {{ category.replace('-', ' ') }}
            </NuxtLink>
          </span>
        </div>
      </div>

      <footer class="text-sm pt-2 border-t border-base-300">
        <time :datetime="post.date" class="text-base-content/60">{{ dateLong }}</time>
        <span class="text-base-content/60 px-1">•</span>
        <span class="text-base-content/60 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ Math.ceil(readingTimeMinutes) }} min
        </span>
      </footer>
    </div>
  </article>
</template>

<script setup>
import readingTime from 'reading-time'

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

const readingTimeMinutes = computed(() => {
  return readingTime(props.post.text).minutes || 0
})
</script>
