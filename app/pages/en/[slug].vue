<template>
  <div class="relative max-w-prose mx-auto">
    <div v-if="post">
      <div v-if="post.translation" class="flex justify-center mb-6">
        <ClientOnly>
          <LanguageSwitcher locale="en" :target="post.translation" />
        </ClientOnly>
      </div>
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2">
          <li>
            <NuxtLink to="/en" class="text-[#3c4858] dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">
              English
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

      <!-- Italian original -->
      <div v-if="post.translation" class="mt-12 pt-8 border-t border-[#c0ccda] dark:border-gray-700">
        <p class="text-lg text-[#3c4858] dark:text-[#F8FAFC]">
          Also available in Italian:
          <NuxtLink
            :to="post.translation"
            :prefetch="false"
            class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
          >
            read the original
          </NuxtLink>
        </p>
      </div>

      <!-- Related Posts -->
      <div v-if="related && related.length" class="mt-12">
        <div class="border-l-2 border-amber-600/70 px-4 py-1 mb-4">
          <h2 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
            More in English
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Post v-for="article in related" :key="article.path" :post="article" />
        </div>
      </div>

      <!-- Disqus Comments -->
      <ClientOnly>
        <Disqus
          :identifier="`en-${slug}`"
          :url="fullUrl"
          :title="post.title"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = String(route.params.slug)
const path = `/en/${slug}`

// Fetch post
const { data: post } = await useAsyncData(
  `post-en-${slug}`,
  () => queryCollection('articles').path(path).first()
)

if (!post.value || post.value.lang !== 'en') {
  throw createError({
    statusCode: 404,
    message: 'Page not found.'
  })
}

// Format date (English locale)
const dateLong = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

// Fetch related English posts
const { data: related } = await useAsyncData(
  `related-en-${slug}`,
  () => queryCollection('articles')
    .where('lang', '=', 'en')
    .where('path', '!=', path)
    .order('date', 'DESC')
    .limit(2)
    .all()
)

// Runtime config for SEO
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// Full URL for Disqus
const fullUrl = computed(() => `${siteUrl}${post.value?.path || ''}`)

// SEO Meta
useSeoMeta({
  title: () => post.value?.title || '',
  description: () => post.value?.description || '',
  ogTitle: () => post.value?.title || '',
  ogDescription: () => post.value?.description || '',
  ogImage: () => post.value?.coverImage || 'https://enricodeleo.com/enricodeleo.jpg',
  ogType: 'article',
  ogLocale: 'en',
  twitterCard: () => post.value?.coverImage ? 'summary_large_image' : 'summary'
})

// Canonical + hreflang alternates (x-default points to the Italian original)
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: computed(() => {
    const links = [
      { rel: 'canonical', href: `${siteUrl}${post.value?.path || ''}` },
      { rel: 'alternate', hreflang: 'en', href: `${siteUrl}${post.value?.path || ''}` }
    ]
    if (post.value?.translation) {
      links.push(
        { rel: 'alternate', hreflang: 'it-IT', href: `${siteUrl}${post.value.translation}` },
        { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}${post.value.translation}` }
      )
    }
    return links
  })
})

// JSON-LD Structured Data
const jsonLd = computed(() => {
  if (!post.value) return null

  const authorId = `${siteUrl}#/schema/person/enrico-deleo`
  const publisherId = `${siteUrl}#/schema/org/lisergico`
  const postId = `${siteUrl}${post.value.path}#blogposting`

  const schema = {
    '@type': 'BlogPosting',
    '@id': postId,
    headline: post.value.title,
    datePublished: post.value.date,
    dateModified: post.value.updated || post.value.date,
    inLanguage: 'en',
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

  if (post.value.translation) {
    schema.translationOfWork = {
      '@type': 'BlogPosting',
      '@id': `${siteUrl}${post.value.translation}#blogposting`,
      url: `${siteUrl}${post.value.translation}`,
      inLanguage: 'it-IT'
    }
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}${post.value.path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'English', item: `${siteUrl}/en` },
      { '@type': 'ListItem', position: 2, name: post.value.title, item: `${siteUrl}${post.value.path}` }
    ]
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [schema, breadcrumb]
  }
})

useJsonLd(jsonLd)
</script>
