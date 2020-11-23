<template>
  <div>
    <div class="container">
      <div class="mainheading">
        <h1 class="sitetitle">
          Lisergico
        </h1>
        <p class="lead">
          Il blog di Enrico Deleo. Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant
        </p>
      </div>
    </div>
    <div class="container">
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
          <Post v-for="post of posts" :key="post.id" :post="post" />
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
      featured = await app.$wp.posts().sticky(true).perPage(4)
      posts = await app.$wp.posts().perPage(6)
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
  }
}
</script>

<style>
</style>
