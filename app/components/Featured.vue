<template>
  <section>
    <h2 class="text-xl font-bold border-gray-300 dark:border-gray-500 border-b leading-10">
      <span class="border-gray-700 dark:border-gray-300 border-b-2 py-2 pr-1">
        In primo piano
      </span>
    </h2>

    <div class="flex flex-col gap-6 py-4">
      <!-- begin post -->
      <article
        v-for="post of featuredPosts"
        :key="post.slug || post.id"
        class="flex items-center border-gray-300 dark:border-gray-600 border rounded-md min-h-72"
      >
        <NuxtLink :to="`/${post.slug}`" :title="post.title" class="h-full w-full bg-no-repeat bg-center bg-cover rounded-l-md">
          <img :src="post.coverImage" :alt="post.title">
        </NuxtLink>
        <div class="py-6 px-8 h-full flex flex-wrap flex-col place-content-between">
          <div>
            <NuxtLink :to="`/${post.slug}`">
              <h2 class="text-xl font-bold">
                {{ post.title }}
              </h2>
            </NuxtLink>
          </div>

          <footer class="text-sm mt-4">
            <span v-if="post.categories && post.categories.length">
              Pubblicato in
              <span v-for="(category, index) of post.categories" :key="index">
                <NuxtLink :to="`/category/${category}`" class="capitalize text-green-600">{{ category.replace('-', ' ') }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
              </span>
            </span>
            <br>
            <time :datetime="post.date" class="text-gray-600 dark:text-gray-400">{{ formatDate(post.date) }}</time>
            <span class="text-gray-600 dark:text-gray-400 px-1">•</span>
            <span class="text-gray-600 dark:text-gray-400">{{ Math.ceil(calculateReadingTime(post.text)) }} minuti di lettura</span>
          </footer>
        </div>
      </article>
      <!-- end post -->
    </div>
  </section>
</template>

<script setup lang="ts">
import readingTime from 'reading-time'

const props = defineProps<{
  posts?: Array<{
    id?: string
    slug: string
    date: string
    text: string
    categories?: string[]
    title: string
    coverImage: string
  }>
}>()

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const formatDate = (date: string) => {
  const event = new Date(date)
  return event.toLocaleDateString('it-IT', dateOptions)
}

const calculateReadingTime = (text: string) => {
  return readingTime(text).minutes || 0
}

const featuredPosts = computed(() => {
  if (!props.posts || props.posts.length === 0) {
    return []
  }
  return props.posts.map((post) => ({
    ...post,
    dateLong: formatDate(post.date),
    readingTime: calculateReadingTime(post.text)
  }))
})
</script>
