<template>
  <div class="relative py-8 mb-8">
    <div v-if="post">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <ul class="steps steps-horizontal text-sm w-full">
          <li class="step step-primary"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="step step-primary">{{ post.title }}</li>
        </ul>
      </div>

      <!-- Begin Post -->
      <article class="prose prose-lg max-w-none">
        <header class="mb-8">
          <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            {{ post.title }}
          </h1>

          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="(category, index) of (post.categories || [])" :key="index">
              <NuxtLink :to="`/category/${category}`" class="badge badge-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none">
                {{ category.replace('-', ' ') }}
              </NuxtLink>
            </span>
          </div>

          <div class="flex items-center gap-4 text-base-content/70">
            <time :datetime="post.date">{{ dateLong }}</time>
            <span>•</span>
            <span>{{ Math.ceil(readingTimeMinutes) }} minuti di lettura</span>
          </div>
        </header>

        <!-- Begin Featured Image -->
        <div v-if="post.coverImage" class="mb-8 rounded-xl overflow-hidden shadow-xl">
          <img :src="post.coverImage + '?w=1088&h=612&strip=all'" :alt="post.title" class="w-full">
        </div>
        <!-- End Featured Image -->

        <!-- Begin Post Content -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="post" />
        </div>
        <!-- End Post Content -->
      </article>
      <!-- End Post -->

      <div class="divider"></div>

      <!-- Begin Tags -->
      <div class="mt-8">
        <p class="text-lg mb-4">
          Pubblicato in
          <span v-for="(category, index) of (post.categories || [])" :key="index">
            <NuxtLink :to="`/category/${category}`" class="badge badge-primary badge-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-none hover:opacity-80">
              {{ category.replace('-', ' ') }}
            </NuxtLink><span v-if="index+1 !== post.categories.length" class="ml-1">•</span>
          </span>
        </p>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-4">
          <NuxtLink v-for="(tag, index) of post.tags" :key="index" :to="`/tag/${tag}`" class="badge badge-outline hover:badge-primary">
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
      <!-- End Tags -->

      <!-- Begin related posts -->
      <div v-if="related && related.length" class="mt-12">
        <h4 class="text-2xl font-bold mb-6">
          <span class="badge badge-lg badge-secondary bg-gradient-to-r from-pink-500 to-indigo-500 text-white border-none p-4">
            Sullo stesso argomento
          </span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Post v-for="article of related" :key="article.slug" :post="article" />
        </div>
      </div>
      <!-- End related posts -->

      <!-- Begin Disqus Comments -->
      <ClientOnly>
        <div id="disqus_thread" class="mt-12" />
      </ClientOnly>
      <!-- End Disqus Comments -->
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const slug = route.params.slug
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

// Fetch post
const { data: post, error } = await useAsyncData(
  `post-${slug}`,
  () => queryContent('articles', slug).findOne(),
  {
    onError: () => {
      throw createError({
        statusCode: 404,
        message: 'Pagina non trovata.'
      })
    }
  }
)

// Format date
const dateLong = computed(() => {
  if (!post.value) return ''
  const event = new Date(post.value.date)
  return event.toLocaleDateString('it-IT', dateOptions)
})

// Simple reading time calculation (200 words per minute average)
const readingTimeMinutes = computed(() => {
  if (!post.value || !post.value.text) return 0
  const wordsPerMinute = 200
  const words = post.value.text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
})

// Fetch related posts on client side only
const related = ref([])

if (post.value) {
  const itemsInThisCategory = await queryCollection('articles')
    .where({ categories: { contains: post.value.categories[0] }, slug: { $ne: slug } })
    .select('slug')
    .all()

  const maxSkip = itemsInThisCategory.length - 2
  const skip = maxSkip > 0 ? Math.floor(maxSkip * Math.random()) : 0

  const relatedPosts = await queryContent('articles')
    .where({ categories: { contains: post.value.categories[0] }, slug: { $ne: slug } })
    .sort({ date: -1 })
    .skip(skip)
    .limit(2)
    .find()

  related.value = relatedPosts || []
}

// SEO Meta
useSeoMeta({
  title: () => post.value?.title || '',
  description: () => post.value?.description || '',
  ogTitle: () => post.value?.title || '',
  ogDescription: () => post.value?.description || '',
  ogImage: () => post.value?.coverImage || '',
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

// Load Disqus using @nuxt/scripts
const { onScriptLoaded } = useScriptDisqus({
  shortname: 'lisergico'
})

onScriptLoaded(() => {
  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = window.location.pathname
  }
})
</script>
