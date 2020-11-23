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
      <section class="featured-posts">
        <div class="section-title">
          <h2><span>In primo piano</span></h2>
        </div>
        <div class="card-columns listfeaturedtag">
          <!-- begin post -->
          <div v-for="post of featured" :key="post.id" class="card">
            <div class="row">
              <div class="col-md-5 wrapthumbnail">
                <a :href="`/${post.slug}`" :title="post.title.rendered">
                  <div class="thumbnail" :style="{'background-image': `url(${post.jetpack_featured_media_url})`}" />
                </a>
              </div>
              <div class="col-md-7">
                <div class="card-block">
                  <h2 class="card-title pr-4 pt-4">
                    <a :href="`/${post.slug}`" v-html="post.title.rendered" />
                  </h2>
                  <p class="card-text pr-4 text-muted">
                    {{ post.meta._yoast_wpseo_metadesc[0] }}
                  </p>
                  <div class="metafooter">
                    <div class="wrapfooter">
                      <span class="author-meta">
                        <span class="post-name">
                          <a href="author.html">Sal</a>
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
          <b-card
            v-for="post of posts"
            :key="post.id"
            tag="article"
            no-body
            img-top
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
      </section>
      <!-- End List Posts
      ================================================== -->
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
    let featured

    try {
      const featuredPosts = await app.$wp.posts().sticky(true).perPage(4)
      const allPosts = await app.$wp.posts().perPage(6)
      posts = allPosts.map(mapPost)
      featured = featuredPosts.map(mapPost)
    } catch (error) {
      console.error(error)
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
