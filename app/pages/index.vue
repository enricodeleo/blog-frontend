<template>
  <div class="space-y-12">
    <section class="space-y-2">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
        Lisergico
      </h1>
      <p class="text-lg text-[#3c4858] dark:text-gray-200">
        Il blog di <a href="https://enricodeleo.com" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Enrico Deleo</a>. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant
      </p>
    </section>

    <!-- Bento Grid - Sticky Posts -->
    <section v-if="featured && featured.length">
      <div class="border-l-2 border-amber-600/70 px-4 py-1 mb-4">
        <h2 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
          In primo piano
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <article
          v-for="(post, index) in featured"
          :key="`${post.path}-${index}`"
          class="border border-[#c0ccda] dark:border-gray-700 rounded-lg p-6 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
        >
          <NuxtLink :to="post.path" class="block">
            <!-- Cover Image -->
            <figure v-if="post.coverImage" class="mb-4">
              <img
                :src="post.coverImage + '?resize=800,450&crop=0,0,800px,450px&strip=all'"
                :alt="post.title"
                class="rounded-lg w-full object-cover h-48"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
              >
            </figure>

            <!-- Title -->
            <h2 class="text-xl md:text-2xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-3">
              {{ post.title }}
            </h2>

            <!-- Description -->
            <p v-if="post.description" class="text-lg text-[#3c4858] dark:text-gray-200 mb-4 line-clamp-3">
              {{ post.description }}
            </p>

            <!-- Meta -->
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            </div>
          </NuxtLink>

          <!-- Categories -->
          <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mt-4">
            <NuxtLink
              v-for="(category, index) in post.categories"
              :key="index"
              :to="`/category/${category}`"
              class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
            >
              {{ category.replace('-', ' ') }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Recent Posts -->
    <section>
      <div class="border-l-2 border-amber-600/70 px-4 py-1 mb-4">
        <h2 class="text-sm md:text-base font-semibold tracking-wide uppercase text-[#3c4858] dark:text-[#CBD5E1]">
          Altre storie
        </h2>
      </div>

      <div class="space-y-8">
        <Post v-for="post in posts" :key="post.path" :post="post" />
      </div>
    </section>

    <!-- Pagination Link -->
    <div class="text-center">
      <NuxtLink
        to="/page/2"
        class="inline-block px-6 py-2 text-[#3c4858] dark:text-[#F8FAFC] border border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors"
      >
        Altri post →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { toJsonLd } from '~/utils/jsonld'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

// Format date
const formatDate = (date) => {
  const event = new Date(date)
  return event.toLocaleDateString('it-IT', dateOptions)
}

// Fetch 4 most recent sticky posts for bento grid
const { data: featured } = await useAsyncData(
  'featured-posts',
  () => queryCollection('articles')
    .where('sticky', '=', true)
    .order('date', 'DESC')
    .limit(2)
    .all()
)

// Fetch recent posts
const { data: posts } = await useAsyncData(
  'recent-posts',
  () => queryCollection('articles')
    .order('date', 'DESC')
    .limit(6)
    .all()
)

// SEO Meta
useSeoMeta({
  title: 'Il blog di Enrico Deleo',
  description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant. Articoli su sviluppo web, DevOps, AI e molto altro.',
  ogTitle: 'Il blog di Enrico Deleo',
  ogDescription: 'Il blog di Enrico Deleo. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant. Articoli su sviluppo web, DevOps, AI e molto altro.',
  twitterCard: 'summary_large_image'
})

// JSON-LD Structured Data for homepage
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const homepageJsonLd = computed(() => {
  // Stable entity IDs (matching article page IDs)
  const authorId = `${siteUrl}#/schema/person/enrico-deleo`
  const publisherId = `${siteUrl}#/schema/org/lisergico`
  const websiteId = `${siteUrl}#/schema/website`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: 'Lisergico',
        description: 'Il blog di Enrico Deleo. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant',
        publisher: {
          '@id': publisherId
        },
        inLanguage: 'it-IT'
      },
      {
        '@type': 'Organization',
        '@id': publisherId,
        name: 'Lisergico',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`
        }
      },
      {
        '@type': 'Person',
        '@id': authorId,
        name: 'Enrico Deleo',
        url: 'https://enricodeleo.com',
        email: 'hello@enricodeleo.com',
        jobTitle: 'Fractional CTO & AI Solutions Architect',
        worksFor: {
          '@id': publisherId
        }
      }
    ]
  }

  return toJsonLd(schema)
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: homepageJsonLd.value
    }
  ]
})
</script>
