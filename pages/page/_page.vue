<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <Post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
          <!-- end post -->
          <NuxtLink :to="`/page/${page+1}`" class="btn btn-outline-primary btn-block btn-lg">
            Altri post
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const limit = 6
    const skip = limit * (params.page - 1)
    let posts

    try {
      posts = await app.$content('articles', { text: true }).sortBy('date', 'desc').limit(limit).skip(skip).fetch()
    } catch (error) {
      app.$log.error(error)
    }
    return {
      posts,
      page: parseInt(params.page)
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      category: {}
    }
  }
}
</script>

<style>

</style>
