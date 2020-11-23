<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mainheading">
          <div class="row post-top-meta authorpage">
            <div class="col">
              <h1>{{ category.name }}</h1>
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
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
const mapPost = (post) => {
  const event = new Date(post.date)
  post.dateLong = event.toLocaleDateString('it-IT', dateOptions)
  post.readingTime = readingTime(post.content.rendered)
  return post
}

export default {
  async asyncData ({ app, params }) {
    let posts
    let category
    try {
      const categories = await app.$wp.categories().slug(params.slug)
      category = categories[0]
      const allPosts = await app.$wp.posts().categories(category.id)
      posts = allPosts.map(mapPost)
    } catch (error) {
      app.$log.error(error)
    }
    return {
      posts,
      category
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
