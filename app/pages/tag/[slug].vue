<template>
  <div class="space-y-8">
    <!-- Tag Header -->
    <div class="space-y-2">
      <div class="border-l-2 border-amber-600/70 px-4 py-1">
        <h1 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
          Tag: #{{ tag }}
        </h1>
      </div>
      <p class="text-sm text-[#3c4858] dark:text-gray-200">
        {{ posts && posts.length ? `${posts.length} articoli` : 'Nessun articolo' }} con questo tag
      </p>
    </div>

    <!-- Posts List -->
    <div v-if="posts && posts.length" class="space-y-8">
      <Post v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <!-- No Results -->
    <div v-if="posts && !posts.length" class="border-l-4 border-gray-400 dark:border-gray-600 px-4 py-3 max-w-2xl mx-auto">
      <p class="text-lg font-bold text-[#3c4858] dark:text-[#F8FAFC]">Nessun articolo trovato</p>
      <p class="text-base text-[#3c4858] dark:text-gray-200 mt-1">Prova a cercare con un altro tag</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const tag = String(route.params.slug)
const tagFilter = `%"${tag}"%`

// Fetch posts by tag
const { data: posts } = await useAsyncData(
  `tag-${tag}`,
  () => queryCollection('articles')
    .where('tags', 'LIKE', tagFilter)
    .order('date', 'DESC')
    .all()
)

// Runtime config for canonical URL
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// SEO Meta
useSeoMeta({
  title: () => `Tag: #${tag} - Articoli del blog`,
  description: () => `Scopri tutti gli articoli tagged con "${tag}" nel blog di Enrico Deleo. Approfondimenti, tutorial e risorse su ${tag}.`,
  ogTitle: () => `Tag: #${tag}`,
  ogDescription: () => `Scopri tutti gli articoli tagged con "${tag}" nel blog di Enrico Deleo. Approfondimenti, tutorial e risorse su ${tag}.`,
  // Prevent indexing of tag archives to avoid thin content
  robots: 'noindex, follow'
})

// Canonical URL
useHead({
  link: [{
    rel: 'canonical',
    href: () => `${siteUrl}/tag/${tag}`
  }]
})

const tagJsonLd = computed(() => {
  const pageUrl = `${siteUrl}/tag/${tag}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    url: pageUrl,
    name: `Tag: #${tag} - Lisergico`,
    description: `Scopri tutti gli articoli tagged con "${tag}" nel blog di Enrico Deleo. Approfondimenti, tutorial e risorse su ${tag}.`,
    isPartOf: { '@id': `${siteUrl}#/schema/website` },
    inLanguage: 'it-IT',
    about: {
      '@type': 'Thing',
      name: tag
    }
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

useJsonLd(tagJsonLd)
</script>
