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
          <b-card
            v-for="post of posts"
            :key="post.id"
            tag="article"
            no-body
            img-top
            class="mb-5"
          >
            <a :href="`/${post.slug}`" :title="post.title.rendered">
              <b-card-img-lazy :src="post.jetpack_featured_media_url" :alt="post.title.rendered" />
            </a>
            <b-card-body>
              <a :href="`/${post.slug}`" class="text-dark">
                <b-card-title v-html="post.title.rendered" />
              </a>

              <b-card-text class="text-muted">
                {{ post.meta._yoast_wpseo_metadesc[0] }}
              </b-card-text>

              <div class="metafooter">
                <div class="wrapfooter">
                  <span class="author-meta">
                    <span class="post-name"><a href="author.html">Sal</a></span><br>
                    <span class="post-date">{{ post.dateLong }}</span>
                    <span class="dot" />
                    <span class="post-read">{{ Math.ceil(post.readingTime.minutes) }} minuti di lettura</span>
                  </span>
                </div>
              </div>
            </b-card-body>
          </b-card>
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
      console.error(error)
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
