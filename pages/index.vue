<template>
  <div class="mb-8">
    <div class="container py-6 mx-auto">
      <div class="mainheading">
        <h1 class="text-4xl font-semibold mb-2">
          Lisergico
        </h1>
        <p class="text-xl font-light">
          Il blog di <a rel="noopener" href="https://enricodeleo.com" class="font-semibold text-green-600 hover:text-green-800">Enrico Deleo</a>. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant
        </p>
      </div>
    </div>
    <div class="container mx-auto">
      <!-- Begin Featured
      ================================================== -->
      <Featured :posts="featured" />
      <!-- End Featured
      ================================================== -->
      <!-- Begin List Posts
      ================================================== -->
      <section class="recent-posts">
        <h2 class="text-xl font-bold border-gray-300 border-b leading-10">
          <span class="border-gray-700 border-b-2 py-2">
            Altre storie
          </span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
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
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    let posts
    let featured

    try {
      featured = await app.$content('articles', { text: true }).where({ sticky: true }).sortBy('date', 'desc').limit(3).fetch()
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

  head ({ $seo }) {
    return this.$seo({
      title: 'Il blog di Enrico Deleo'
    })
  }
}
</script>
