<template>
  <div>
    <div class="container py-6 mx-auto">
      <div class="mainheading">
        <h1 class="text-4xl font-semibold">
          Lisergico
        </h1>
        <p class="text-xl">
          Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant
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
        <div class="section-title">
          <h2><span>Altre storie</span></h2>
        </div>
        <div class="card-columns listrecent">
          <!-- begin post -->
          <lazy-post v-for="post of posts" :key="post.id" :post="post" />
          <!-- end post -->
        </div>
      </section>
      <!-- End List Posts
      ================================================== -->
      <NuxtLink to="/page/2" class="btn btn-outline-primary btn-block btn-lg">
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
