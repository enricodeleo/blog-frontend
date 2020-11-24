<template>
  <section class="featured-posts">
    <div class="section-title">
      <h2><span>In primo piano</span></h2>
    </div>
    <div class="card-columns listfeaturedtag">
      <!-- begin post -->
      <div v-for="post of featured" :key="post.id" class="card">
        <div class="row">
          <div class="col-md-5 wrapthumbnail">
            <a :href="`/${post.slug}`" :title="post.title">
              <div class="thumbnail" :style="{'background-image': `url(${post.coverImage})`}" />
            </a>
          </div>
          <div class="col-md-7">
            <div class="card-block">
              <h2 class="card-title pr-4 pt-4">
                <a :href="`/${post.slug}`">{{ post.title }}</a>
              </h2>
              <p class="card-text pr-4 text-muted">
                {{ post.excerpt }}
              </p>
              <div class="metafooter">
                <div class="wrapfooter">
                  <span class="author-meta">
                    <span class="post-name">
                      Pubblicato in
                      <span v-for="(category, index) of post.categories" :key="index">
                        <a :href="`/categories/${category}`" class="text-primary text-capitalize">{{ category.replace('-', ' ') }}</a><span v-if="index+1 !== post.categories.length">, </span>
                      </span>
                    </span>
                    <br>
                    <span class="post-date">{{ post.dateLong }}</span>
                    <span class="dot" />
                    <span class="post-read">{{ Math.ceil(post.readingTime.minutes) }} minuti di lettura</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- end post -->
    </div>
  </section>
</template>

<script>
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  props: {
    posts: {
      type: Array,
      default () { return [] },
      required: true
    }
  },

  data () {
    return {
      featured: []
    }
  },

  mounted () {
    this.featured = this.posts.map((post) => {
      const event = new Date(post.date)
      post.dateLong = event.toLocaleDateString('it-IT', dateOptions)
      post.readingTime = readingTime(post.text)

      return post
    })
  }
}
</script>

<style>

</style>
