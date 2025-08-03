<template>
  <div class="mb-8">
    <div class="py-6">
      <h1 class="text-4xl font-semibold mb-2">
        Lisergico
      </h1>
      <p class="text-xl font-light">
        Il blog di <a rel="noopener" href="https://enricodeleo.com" class="font-semibold text-green-600 hover:text-green-800">Enrico Deleo</a>. Digital Entrepreneur // Holistic Developer | DevOps | Fractional CTO | UI/UX // Teacher // Consultant
      </p>
    </div>

    <!-- Begin Featured
    ================================================== -->
    <Featured :posts="featured" />
    <!-- End Featured
    ================================================== -->
    <!-- Begin List Posts
    ================================================== -->
    <section class="recent-posts">
      <h2 class="text-xl font-bold border-gray-300 dark:border-gray-500 border-b leading-10">
        <span class="border-gray-700 dark:border-gray-300 border-b-2 py-2 pr-1">
          Altre storie
        </span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <!-- begin post -->
        <lazy-post v-for="post of posts" :key="post.id" :post="post" />
        <!-- end post -->
      </div>
    </section>
    <!-- End List Posts
    ================================================== -->
    <NuxtLink to="/page/2" class="border border-green-600 hover:border-green-800 text-green-600 hover:text-green-800 text-center p-3 w-full text-lg rounded-md block mt-6 font-semibold">
      Altri post
    </NuxtLink>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    let posts
    let featured

    try {
      featured = await app.$content('articles', { text: true }).where({ sticky: true }).sortBy('date', 'desc').limit(2).fetch()
      posts = await app.$content('articles', { text: true }).sortBy('date', 'desc').limit(6).fetch()
    } catch (error) {
      app.$log.error(error)
    }

    return {
      posts,
      featured
    }
  },

  data () {
    return {
      posts: [],
      featured: []
    }
  },

  head () {
    return {
      ...this.$seo({
        title: 'Il blog di Enrico Deleo'
      })
    }
  },

  jsonld () {
    return {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      author: {
        '@type': 'Person',
        name: 'Enrico Deleo'
      },
      url: process.env.NUXT_ENV_FRONTEND_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.NUXT_ENV_FRONTEND_URL}/search?term={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }
}
</script>
