<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <a rel="noopener noreferrer" href="https://amzn.to/2VrreCI" target="_blank" class="order-2 md:order-1 max-w-xs">
      <img src="~/assets/images/point-of-vue.jpg" alt="Point Of Vue" class="border border-green-600 rounded-md">
    </a>
    <div class="flex-grow order-1 md:order-2">
      <h1 class="text-3xl font-bold mb-5">
        Post nella categoria <em class="text-capitalize ">{{ category }}</em>
      </h1>

      <!-- begin post -->
      <Post v-for="post of posts" :key="post.slug" :post="post" class="mb-5" />
      <!-- end post -->
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.slug as string

// Fetch posts by category
const { data: posts } = await useAsyncData(
  `category-${category}`,
  () => queryContent('articles')
    .where({ categories: { contains: category } })
    .sort({ date: -1 })
    .find()
)

// SEO Meta
useSeoMeta({
  title: `Archivio categoria ${category}`,
  description: `Sfoglia tutti gli articoli nella categoria "${category}"`,
  ogTitle: `Archivio categoria ${category}`,
  ogDescription: `Sfoglia tutti gli articoli nella categoria "${category}"`
})
</script>
