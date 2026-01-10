<template>
  <div class="py-12 mb-8 flex flex-col md:flex-row md:space-x-10">
    <a rel="noopener noreferrer" href="https://amzn.to/2VrreCI" target="_blank" class="order-2 md:order-1 max-w-xs">
      <img src="~/assets/images/point-of-vue.jpg" alt="Point Of Vue" class="border border-green-600 rounded-md">
    </a>
    <div class="flex-grow order-1 md:order-2">
      <h1 class="text-3xl font-bold mb-5">
        Post con tag <em class="text-capitalize ">{{ tag }}</em>
      </h1>

      <!-- begin post -->
      <Post v-for="post of posts" :key="post.slug" :post="post" class="mb-5" />
      <!-- end post -->
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const tag = route.slug

// Fetch posts by tag
const { data: posts } = await useAsyncData(
  `tag-${tag}`,
  () => queryContent('articles')
    .where({ tags: { contains: tag } })
    .sort({ date: -1 })
    .find()
)

// SEO Meta
useSeoMeta({
  title: `Articoli con tag #${tag}`,
  description: `Sfoglia tutti gli articoli con tag "${tag}"`,
  ogTitle: `Articoli con tag #${tag}`,
  ogDescription: `Sfoglia tutti gli articoli con tag "${tag}"`
})
</script>
