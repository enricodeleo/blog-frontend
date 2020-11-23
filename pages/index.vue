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
                <a href="post.html">
                  <div class="thumbnail" style="background-image:url(assets/img/demopic/1.jpg);" />
                </a>
              </div>
              <div class="col-md-7">
                <div class="card-block">
                  <h2 class="card-title">
                    <a href="post.html">We're living some strange times</a>
                  </h2>
                  <h4 class="card-text">
                    This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </h4>
                  <div class="metafooter">
                    <div class="wrapfooter">
                      <span class="meta-footer-thumb">
                        <a href="author.html"><img class="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal"></a>
                      </span>
                      <span class="author-meta">
                        <span class="post-name"><a href="author.html">Steve</a></span><br>
                        <span class="post-date">22 July 2017</span><span class="dot" /><span class="post-read">6 min read</span>
                      </span>
                      <span class="post-read-more"><a href="post.html" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd" /></svg></a></span>
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
            <a :href="`${websiteUrl}/${post.slug}`" :title="post.title.rendered">
              <b-card-img-lazy :src="post.jetpack_featured_media_url" :alt="post.title.rendered" />
            </a>
            <b-card-body>
              <a :href="`${websiteUrl}/${post.slug}`" class="text-dark">
                <b-card-title v-html="post.title.rendered" />
              </a>

              <b-card-text>{{ post.meta._yoast_wpseo_metadesc[0] }}</b-card-text>

              <div class="metafooter">
                <div class="wrapfooter">
                  <span class="author-meta">
                    <span class="post-name"><a href="author.html">Sal</a></span><br>
                    <span class="post-date">{{ post.dateLong }}</span>
                    <span class="dot" />
                    <span class="post-read">{{ Math.ceil(post.readingTime.minutes) }} minuti di lettura</span>
                  </span>
                  <span class="post-read-more">
                    <a :href="`${websiteUrl}/${post.slug}`" title="Leggi tutto">
                      <svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25">
                        <path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd" />
                      </svg>
                    </a>
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

export default {
  async asyncData ({ app, store, params }) {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    let posts

    try {
      const allPosts = await app.$wp.posts().perPage(6)
      posts = allPosts.map((post) => {
        const event = new Date(post.date)
        post.dateLong = event.toLocaleDateString('it-IT', dateOptions)
        post.readingTime = readingTime(post.content.rendered)
        return post
      })
    } catch (error) {
      console.error(error)
    }

    return {
      posts
    }
  },
  data () {
    return {
      websiteUrl: process.env.WEBSITE_URL,
      posts: [],
      featured: [
        {
          id: 1,
          title: 'test',
          excerpt: 'prova',
          date: '22 Gennaio 2020'
        },
        {
          id: 2,
          title: 'test',
          excerpt: 'prova',
          date: '22 Gennaio 2020'
        },
        {
          id: 3,
          title: 'test',
          excerpt: 'prova',
          date: '22 Gennaio 2020'
        },
        {
          id: 4,
          title: 'test',
          excerpt: 'prova',
          date: '22 Gennaio 2020'
        }
      ]
    }
  }
}
</script>

<style>
</style>
