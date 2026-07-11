<template>
  <div class="space-y-12">
    <section class="space-y-2">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
        Lisergico — in English
      </h1>
      <p class="text-lg text-[#3c4858] dark:text-gray-200">
        Selected essays from the blog of <a href="https://enricodeleo.com" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Enrico Deleo</a>, Fractional CTO &amp; AI Solutions Architect. Pragmatic AI, software architecture, and engineering judgment. The full blog is <NuxtLink to="/" class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">in Italian</NuxtLink>.
      </p>
    </section>

    <!-- English Posts -->
    <section v-if="posts && posts.length">
      <div class="space-y-8">
        <Post v-for="post in posts" :key="post.path" :post="post" />
      </div>
    </section>

    <!-- No Posts -->
    <section v-else>
      <p class="text-lg text-[#3c4858] dark:text-gray-200">
        Nothing here yet — check back soon.
      </p>
    </section>
  </div>
</template>

<script setup>
// Fetch English posts (cornerstone shelf)
const { data: posts } = await useAsyncData(
  'en-posts',
  () => queryCollection('articles')
    .where('lang', '=', 'en')
    .order('date', 'DESC')
    .all()
)

// Runtime config
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// SEO Meta
useSeoMeta({
  title: 'Lisergico in English — essays by Enrico Deleo',
  description: 'Selected essays in English by Enrico Deleo, Fractional CTO & AI Solutions Architect: pragmatic AI, software architecture, and engineering judgment.',
  ogTitle: 'Lisergico in English — essays by Enrico Deleo',
  ogDescription: 'Selected essays in English by Enrico Deleo, Fractional CTO & AI Solutions Architect: pragmatic AI, software architecture, and engineering judgment.',
  ogLocale: 'en',
  ogImage: 'https://enricodeleo.com/enricodeleo.jpg',
  twitterCard: 'summary'
})

// Canonical + hreflang pair with the Italian homepage
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'canonical', href: `${siteUrl}/en` },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en` },
    { rel: 'alternate', hreflang: 'it-IT', href: siteUrl },
    { rel: 'alternate', hreflang: 'x-default', href: siteUrl },
    { rel: 'alternate', type: 'application/rss+xml', title: 'Lisergico in English', href: `${siteUrl}/en/feed.xml` }
  ]
})

// JSON-LD
const enIndexJsonLd = computed(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/en#collection`,
    url: `${siteUrl}/en`,
    name: 'Lisergico in English — essays by Enrico Deleo',
    description: 'Selected essays in English by Enrico Deleo, Fractional CTO & AI Solutions Architect.',
    isPartOf: { '@id': `${siteUrl}#/schema/website` },
    inLanguage: 'en'
  }

  if (posts.value && posts.value.length) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListElement: posts.value.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${siteUrl}${post.path}#blogposting`,
          url: `${siteUrl}${post.path}`,
          headline: post.title
        }
      }))
    }
  }

  return schema
})

useJsonLd(enIndexJsonLd)
</script>
