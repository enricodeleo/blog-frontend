<template>
  <div class="relative py-8 mb-8">
    <div v-if="post">
      <!-- Begin Post -->
      <article>
        <header class="mb-6">
          <h1 class="text-5xl font-bold mb-2">
            {{ post.title }}
          </h1>

          <time :datetime="post.date" class="text-gray-600 dark:text-gray-400">{{ dateLong }}</time>
          <span class="text-gray-600 dark:text-gray-400 px-1">•</span>
          <span class="text-gray-600 dark:text-gray-400">{{ Math.ceil(readingTimeMinutes) }} minuti di lettura</span>
        </header>

        <!-- Begin Featured Image -->
        <img v-if="post.coverImage" :src="post.coverImage + '?w=1088&h=612&strip=all'" :alt="post.title" class="mb-6">
        <!-- End Featured Image -->

        <!-- Begin Post Content -->
        <div class="prose prose-xl prose-green dark:prose-dark max-w-none">
          <ContentRenderer :value="post" />
        </div>
        <!-- End Post Content -->
      </article>
      <!-- End Post -->

      <!-- Begin Tags -->
      <p class="mt-10">
        Pubblicato in
        <span v-for="(category, index) of post.categories" :key="index">
          <NuxtLink :to="`/category/${category}`" class="capitalize text-green-600 hover:text-green-800">{{ category }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
        </span>
      </p>
      <div class="flex justify-between mt-2">
        <div>
          <NuxtLink v-for="(tag, index) of post.tags" :key="index" :to="`/tag/${tag}`" class="inline-block text-sm border border-gray-700 hover:text-green-800 hover:border-green-800 rounded px-2 py-1 mr-1 mb-1">
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
      <!-- End Tags -->

      <!-- Begin related posts -->
      <div v-if="related && related.length" class="mt-10">
        <h4 class="text-2xl font-semibold mb-3">
          Sullo stesso argomento:
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Post v-for="article of related" :key="article.slug" :post="article" />
        </div>
      </div>
      <!-- End related posts -->

      <!-- Begin Disqus Comments -->
      <ClientOnly>
        <div id="disqus_thread" class="mt-12" />
        <script>
          window.disqus_config = function () {
          this.page.url = window.location.href
          this.page.identifier = window.location.pathname
          }
          const d = document
          const s = d.createElement('script')
          s.src = 'https://lisergico.disqus.com/embed.js'
          s.setAttribute('data-timestamp', +new Date())
          ;(d.head || d.body).appendChild(s)
        </script>
      </ClientOnly>
      <!-- End Disqus Comments -->
    </div>
  </div>
</template>

<script setup lang="ts">
import readingTime from 'reading-time'

const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const slug = route.slug as string
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

// Calculate reading time
const readingTimeMinutes = computed(() => {
  if (!post.value) return 0
  return readingTime(post.value.text).minutes || 0
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

// Structured data
useSchemaOrg([
  defineArticle({
    author: {
      '@type': 'Person',
      name: 'Enrico Deleo'
    },
    headline: () => post.value?.title || '',
    keywords: () => post.value?.tags || [],
    wordcount: () => post.value?.text?.split(' ').length || 0,
    image: () => [post.value?.coverImage || ''],
    datePublished: () => post.value?.date || '',
    description: () => post.value?.description || ''
  })
])
</script>
