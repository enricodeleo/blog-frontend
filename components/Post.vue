<template>
  <article class="flex flex-wrap flex-col border-gray-300 dark:border-gray-600 border rounded-md">
    <NuxtLink :to="`/${post.slug}`" :title="post.title">
      <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="rounded-t-md">
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
        '<time :datetime="post.date" class="text-gray-600 dark:text-gray-400">{{ post.dateLong }}</time>
        <span class="text-gray-600 dark:text-gray-400 px-1">•</span>
        <span class="text-gray-600 dark:text-gray-400">{{ Math.ceil((post.readingTime || {}).minutes) }} minuti di lettura</span>
      </footer>
    </div>
  </article>
</template>

<script>
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  props: {
    post: {
      type: Object,
      default () { return {} },
      required: true
    }
  },

  data () {
    return {
      categories: []
    }
  },

  mounted () {
    const event = new Date(this.post.date)
    this.$set(this.post, 'dateLong', event.toLocaleDateString('it-IT', dateOptions))
    this.$set(this.post, 'readingTime', readingTime(this.post.text))
  }
}
</script>
