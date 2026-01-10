<template>
  <section>
    <div class="text-xl font-bold mb-6">
      <span class="badge badge-lg badge-primary bg-gradient-to-r from-indigo-600 to-pink-600 text-white border-none p-4">
        In primo piano
      </span>
    </div>

    <div class="flex flex-col gap-6 py-4">
      <article
        v-for="post of featuredPosts"
        :key="post.slug || post.id"
        class="card lg:card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all"
      >
        <figure class="relative">
          <NuxtLink :to="`/${post.slug}`">
            <img :src="post.coverImage" :alt="post.title" class="rounded-l-xl w-full lg:w-96 object-cover h-72">
          </NuxtLink>
        </figure>
        <div class="card-body justify-between">
          <div>
            <NuxtLink :to="`/${post.slug}`">
              <h2 class="card-title text-3xl font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent transition-all">
                {{ post.title }}
              </h2>
            </NuxtLink>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <span v-for="(category, index) of (post.categories || [])" :key="index">
              <NuxtLink :to="`/category/${category}`" class="badge badge-secondary bg-gradient-to-r from-pink-500 to-indigo-500 text-white border-none">
                {{ category.replace('-', ' ') }}
              </NuxtLink>
            </span>
          </div>

          <footer class="text-sm pt-2 border-t border-base-300">
            <time :datetime="post.date" class="text-base-content/60">{{ formatDate(post.date) }}</time>
            <span class="text-base-content/60 px-1">•</span>
            <span class="text-base-content/60">{{ Math.ceil(calculateReadingTime(post.text)) }} minuti di lettura</span>
          </footer>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import readingTime from 'reading-time'

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

const calculateReadingTime = (text) => {
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
