<template>
  <div class="relative py-8 max-w-prose mx-auto">
    <div v-if="post">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2">
          <li>
            <NuxtLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 underline decoration-dotted underline-offset-4 transition-colors">
              Home
            </NuxtLink>
          </li>
          <li class="text-gray-400 dark:text-gray-500">/</li>
          <li class="text-gray-900 dark:text-[#F8FAFC] font-medium">{{ post.title }}</li>
        </ol>
      </nav>

      <!-- Article -->
      <article class="prose">
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC] mb-4">
            {{ post.title }}
          </h1>

          <!-- Categories -->
          <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mb-4">
            <NuxtLink
              v-for="(category, index) in post.categories"
              :key="index"
              :to="`/category/${category}`"
              class="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 underline decoration-dotted underline-offset-4 transition-colors"
            >
              {{ category.replace('-', ' ') }}
            </NuxtLink>
          </div>

          <!-- Meta -->
          <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time :datetime="post.date">{{ dateLong }}</time>
            <span>•</span>
            <span>{{ Math.ceil(readingTimeMinutes) }} minuti di lettura</span>
          </div>
        </header>

        <!-- Featured Image -->
        <figure v-if="post.coverImage" class="mb-8">
          <img :src="post.coverImage + '?w=1088&h=612&strip=all'" :alt="post.title" class="rounded-lg w-full">
        </figure>

        <!-- Article Content -->
        <ContentRenderer :value="post" />
      </article>

      <!-- Tags -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-lg mb-3 text-gray-900 dark:text-[#F8FAFC]">
          Pubblicato in
          <span v-for="(category, index) in (post.categories || [])" :key="index">
            <NuxtLink
              :to="`/category/${category}`"
              class="underline decoration-dotted underline-offset-4 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              {{ category.replace('-', ' ') }}
            </NuxtLink><span v-if="index+1 !== post.categories.length" class="mx-1">•</span>
          </span>
        </p>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-4">
          <NuxtLink
            v-for="(tag, index) in post.tags"
            :key="index"
            :to="`/tag/${tag}`"
            class="text-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 underline decoration-dotted underline-offset-4 transition-colors"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="related && related.length" class="mt-12">
        <div class="border-l-4 border-amber-600 px-4 py-2 mb-6">
          <h2 class="text-lg md:text-xl font-extrabold leading-tight text-gray-900 dark:text-[#F8FAFC]">
            Sullo stesso argomento
          </h2>
        </div>
        <div class="space-y-0">
          <Post v-for="article in related" :key="article.slug" :post="article" />
        </div>
      </div>

      <!-- Disqus Comments -->
      <ClientOnly>
        <div id="disqus_thread" class="mt-12" />
      </ClientOnly>
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

// Fetch related posts
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
