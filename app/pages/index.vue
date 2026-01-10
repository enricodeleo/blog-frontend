<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="hero min-h-[400px] bg-gradient-to-r from-indigo-600 to-pink-600 rounded-box">
      <div class="hero-content text-center text-white">
        <div class="max-w-2xl">
          <h1 class="text-5xl font-bold mb-4">Benvenuto su Lisergico</h1>
          <p class="text-xl mb-4">
            Il blog di <a rel="noopener" href="https://enricodeleo.com" class="font-bold underline hover:opacity-80">Enrico Deleo</a>
          </p>
          <p class="text-lg opacity-90">Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant</p>
        </div>
      </div>
    </div>

    <div class="divider divider-primary text-lg font-bold">In Evidenza</div>

    <!-- Begin Featured -->
    <Featured :posts="featured" />
    <!-- End Featured -->

    <div class="divider divider-secondary text-lg font-bold">Altre Storie</div>

    <!-- Begin List Posts -->
    <section class="recent-posts">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        <Post v-for="post of posts" :key="post.slug" :post="post" />
      </div>
    </section>
    <!-- End List Posts -->

    <div class="flex justify-center mt-8">
      <NuxtLink to="/page/2" class="btn btn-primary btn-lg bg-gradient-to-r from-indigo-600 to-pink-600 border-none hover:opacity-90">
        Altri post
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// Fetch featured posts
const { data: featured } = await useAsyncData(
  'featured-posts',
  () => queryContent('articles')
    .where({ sticky: true })
    .sort({ date: -1 })
    .limit(2)
    .find()
)

// Fetch recent posts
const { data: posts } = await useAsyncData(
  'recent-posts',
  () => queryContent('articles')
    .sort({ date: -1 })
    .limit(6)
    .find()
)

// SEO Meta
useSeoMeta({
  title: 'Il blog di Enrico Deleo',
  ogTitle: 'Il blog di Enrico Deleo',
  twitterCard: 'summary_large_image'
})
</script>
