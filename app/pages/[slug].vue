<template>
  <div class="relative max-w-prose mx-auto">
    <div v-if="post">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2">
          <li>
            <NuxtLink to="/" class="text-[#3c4858] dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">
              Home
            </NuxtLink>
          </li>
          <li class="text-gray-400 dark:text-gray-500">/</li>
          <li class="text-[#3c4858] dark:text-[#F8FAFC] font-medium truncate">{{ post.title }}</li>
        </ol>
      </nav>

      <!-- Article -->
      <article class="prose">
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] mb-4">
            {{ post.title }}
          </h1>

          <!-- Categories -->
          <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mb-4">
            <NuxtLink
              v-for="(category, index) in post.categories"
              :key="index"
              :to="`/category/${category}`"
              class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
            >
              {{ category.replace('-', ' ') }}
            </NuxtLink>
          </div>

          <!-- Meta -->
          <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time :datetime="post.date">{{ dateLong }}</time>
          </div>
        </header>

        <!-- Featured Image -->
        <figure v-if="post.coverImage" class="mb-8">
          <img
            :src="post.coverImage + '?w=1088&h=612&strip=all'"
            :alt="post.title"
            class="rounded-lg w-full"
            loading="eager"
            fetchpriority="high"
            width="1088"
            height="612"
          >
        </figure>

        <!-- Article Content -->
        <ContentRenderer :value="post" />
      </article>

      <!-- Tags -->
      <div class="mt-12 pt-8 border-t border-[#c0ccda] dark:border-gray-700">
        <p class="text-lg mb-3 text-[#3c4858] dark:text-[#F8FAFC]">
          Pubblicato in
          <span v-for="(category, index) in (post.categories || [])" :key="index">
            <NuxtLink
              :to="`/category/${category}`"
              class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
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
            class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="related && related.length" class="mt-12">
        <div class="border-l-2 border-amber-600/70 px-4 py-1 mb-4">
          <h2 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
            Sullo stesso argomento
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Post v-for="article in related" :key="article.path" :post="article" />
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
const slug = String(route.params.slug)
const path = `/${slug}`

// Fetch post
const { data: post } = await useAsyncData(
  `post-${slug}`,
  () => queryCollection('articles').path(path).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Pagina non trovata.'
  })
}

// Format date
const { formatDateLong } = useFormatDate()
const dateLong = computed(() => {
  if (!post.value) return ''
  return formatDateLong(post.value.date)
})

// Fetch related posts (deterministic for SSR/CSR)
const { data: related } = await useAsyncData(
  `related-${slug}`,
  async () => {
    const category = post.value?.categories?.[0]
    if (!category || !post.value?.path) return []
    const categoryFilter = `%"${category}"%`
    return queryCollection('articles')
      .where('categories', 'LIKE', categoryFilter)
      .where('path', '!=', post.value.path)
      .order('date', 'DESC')
      .limit(2)
      .all()
  }
)

// Runtime config for SEO
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

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

// Canonical URL
useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `${siteUrl}${post.value?.path || ''}`
    }
  ]
})

// JSON-LD Structured Data

const jsonLd = computed(() => {
  if (!post.value) return null

  // Stable entity IDs
  const authorId = `${siteUrl}#/schema/person/enrico-deleo`
  const publisherId = `${siteUrl}#/schema/org/lisergico`
  const postId = `${siteUrl}${post.value.path}#blogposting`

  // Build schema with only valid values
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': postId,
    headline: post.value.title,
    datePublished: post.value.date,
    dateModified: post.value.date,
    author: {
      '@type': 'Person',
      '@id': authorId,
      name: 'Enrico Deleo',
      url: 'https://enricodeleo.com'
    },
    publisher: {
      '@type': 'Organization',
      '@id': publisherId,
      name: 'Lisergico',
      url: siteUrl
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${post.value.path}`
    }
  }

  // Add optional fields only if they have valid values
  if (post.value.description) {
    schema.description = post.value.description
  }

  if (post.value.coverImage) {
    schema.image = post.value.coverImage.startsWith('http')
      ? post.value.coverImage
      : `${siteUrl}${post.value.coverImage}`
  }

  if (post.value.tags && post.value.tags.length > 0) {
    schema.keywords = post.value.tags.join(', ')
  }

  if (post.value.categories && post.value.categories.length > 0) {
    schema.articleSection = post.value.categories[0]
  }

  // Use BCP-47 language code
  schema.inLanguage = 'it-IT'

  return schema
})

useHead({
  script: jsonLd.value ? [
    {
      type: 'application/ld+json',
      children: jsonLd.value
    }
  ] : []
})

// Load Disqus using @nuxt/scripts
if (import.meta.client) {
  const shortname = 'lisergico'
  const scriptSrc = `https://${shortname}.disqus.com/embed.js`

  const setDisqusConfig = () => {
    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = window.location.pathname
    }
  }

  const resetDisqus = () => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: window.disqus_config
      })
    }
  }

  const disqusScript = useScript({
    src: scriptSrc,
    defer: true,
    crossorigin: false,
    'data-timestamp': String(Date.now())
  }, {
    trigger: 'client',
    beforeInit: () => {
      setDisqusConfig()
    }
  })

  disqusScript.onLoaded(() => {
    resetDisqus()
  })

  watch(() => route.fullPath, () => {
    setDisqusConfig()
    resetDisqus()
  })
}
</script>
