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
                {{ post.description }}
              </p>
              <div class="metafooter">
                <div class="wrapfooter">
                  <span class="author-meta">
                    <span class="post-name">
                      Pubblicato in
                      <span v-for="(category, index) of post.categories" :key="index">
                        <NuxtLink :to="`/category/${category}`" class="text-primary text-capitalize">{{ category.replace('-', ' ') }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
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

<style scoped>
  @media (min-width:576px) {
    .card-columns.listfeaturedtag {
      column-count:2;
    }
  }

  .listfeaturedtag .wrapthumbnail {
    height: 278px;
    flex: 0 0 auto;
  }

  .listfeaturedtag .card {
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 2px;
    height: 280px;
    padding-left: 0;
    margin-bottom: 15px;
  }

  .listfeaturedtag .thumbnail {
    background-size: cover;
    height: 100%;
    display: block;
    background-position: 38% 22% !important;
    background-origin: border-box!important;
    border-top-left-radius: 2px;
  }

  .listfeaturedtag .card-block {
    padding-left: 0;
  }

  .listfeaturedtag h4.card-text,.listrecent h4.card-text {
    color: rgba(0,0,0,.44);
    font-size: 0.95rem;
    line-height: 1.4;
    font-weight: 400;
  }

  .listfeaturedtag .wrapfooter {
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    display: block;
    width: 85%;
  }

  @media (max-width:999px) {
    .listfeaturedtag .wrapthumbnail,
    .listfeaturedtag .col-md-7 {
      width:100%;
      max-width:100%;
      flex: 100%;
    }
    .listfeaturedtag .wrapthumbnail {
      height:250px;
    }
    .listfeaturedtag .card {
      height:auto;
    }
    .listfeaturedtag .wrapfooter {
      position:relative;
      margin-top:30px;
    }
    .listfeaturedtag .card-block {
      padding:20px;
    }
  }
</style>
