<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1>{{ tag.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="listrecent listrelated">
          <!-- begin post -->
          <Post v-for="post of posts" :key="post.id" :post="post" class="mb-5" />
          <!-- end post -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    let posts
    let tag
    try {
      const tags = await app.$wp.tags().slug(params.slug)
      tag = tags[0]
      posts = await app.$wp.posts().tags(tag.id)
    } catch (error) {
      app.$log.error(error)
    }
    return {
      posts,
      tag
    }
  },

  data () {
    return {
      websiteUrl: process.env.NUXT_ENV_FRONTEND_URL,
      posts: [],
      tag: {}
    }
  }
}
</script>

<style>

</style>
