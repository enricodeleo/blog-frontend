<template>
  <section>
    <h2 class="text-xl font-bold border-gray-300 border-b leading-10">
      <span class="border-gray-700 border-b-2 py-2">
        In primo piano
      </span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <!-- begin post -->
      <article v-for="post of featured" :key="post.id" class="flex flex-row border-gray-300 border rounded-md min-h-72">
        <NuxtLink :to="`/${post.slug}`" :title="post.title" :lazy-background="post.coverImage" class="h-full w-1/3 bg-no-repeat bg-center bg-cover rounded-l-md">
          &nbsp;
        </NuxtLink>
        <div class="py-6 px-8 h-full w-2/3 flex flex-wrap flex-col place-content-between">
          <div>
            <NuxtLink :to="`/${post.slug}`">
              <h2 class="text-xl font-bold">
                {{ post.title }}
              </h2>
            </NuxtLink>
            <p class="text-gray-600 leading-relaxed mt-2">
              {{ post.description }}
            </p>
          </div>

          <footer class="text-sm mt-4">
            <span>
              Pubblicato in
              <span v-for="(category, index) of post.categories" :key="index">
                <NuxtLink :to="`/category/${category}`" class="capitalize text-green-600">{{ category.replace('-', ' ') }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
              </span>
            </span>
            <br>
            <time :datetime="post.date" class="text-gray-600">{{ post.dateLong }}</time>
            <span class="text-gray-600 px-1">•</span>
            <span class="text-gray-600">{{ Math.ceil((post.readingTime || {}).minutes) }} minuti di lettura</span>
          </footer>
        </div>
      </article>
      <!-- end post -->
      <!-- begin ad -->
      <a rel="noopener noreferrer" href="https://amzn.to/2VrreCI" target="_blank">
        <img src="~/assets/images/point-of-vue.jpg" fluid alt="Point Of Vue" class="border-gray-300 border">
      </a>
      <!-- end ad -->
    </div>
  </section>
</template>

<script>
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  props: {
    posts: {
      type: Array,
      default () { return [] },
      required: true
    }
  },

  data () {
    return {
      featured: []
    }
  },

  mounted () {
    this.featured = this.posts.map((post) => {
      const event = new Date(post.date)
      post.dateLong = event.toLocaleDateString('it-IT', dateOptions)
      post.readingTime = readingTime(post.text)

      return post
    })
  }
}
</script>
