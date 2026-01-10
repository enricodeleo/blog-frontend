<template>
  <article class="flex flex-wrap flex-col border-gray-300 dark:border-gray-600 border rounded-md">
    <NuxtLink :to="`/${post.slug}`" :title="post.title">
      <img v-if="post.coverImage" :src="post.coverImage + '?resize=409,229&crop=0,0,409px,229px&strip=all'" :alt="post.title" class="rounded-t-md">
      <div v-else class="flex flex-col justify-center items-center w-full h-72 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-md text-white text-2xl font-semibold p-12">
        {{ post.title }}
      </div>
    </NuxtLink>

    <div class="flex-grow flex flex-wrap flex-col place-content-between p-6">
      <div>
        <NuxtLink :to="`/${post.slug}`">
          <h2 class="text-xl font-bold">
            {{ post.title }}
          </h2>
        </NuxtLink>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
          {{ post.description }}
        </p>
      </div>

      <footer class="text-sm pt-2">
        <span>
          Pubblicato in
          <span v-for="(category, index) of post.categories" :key="index">
            <NuxtLink :to="`/category/${category}`" class="capitalize text-green-600 hover:text-green-800">{{ category.replace('-', ' ') }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
          </span>
        </span>
        <br>
        <time :datetime="post.date" class="text-gray-600 dark:text-gray-400">{{ dateLong }}</time>
        <span class="text-gray-600 dark:text-gray-400 px-1">•</span>
        <span class="text-gray-600 dark:text-gray-400">{{ Math.ceil(readingTimeMinutes) }} minuti di lettura</span>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import readingTime from 'reading-time'

const props = defineProps<{
  post: {
    date: string
    text: string
    categories: string[]
    slug: string
    title: string
    description: string
    coverImage?: string
  }
}>()

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const dateLong = computed(() => {
  const event = new Date(props.post.date)
  return event.toLocaleDateString('it-IT', dateOptions)
})

const readingTimeMinutes = computed(() => {
  return readingTime(props.post.text).minutes || 0
})
</script>
