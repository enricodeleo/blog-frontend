<template>
  <div class="relative py-8 mb-8">
    <div>
      <!-- Begin Post -->
      <article>
        <header class="mb-6">
          <h1 class="text-5xl font-bold mb-2">
            {{ post.title }}
          </h1>

          <time :datetime="post.date" class="text-gray-600 dark:text-gray-400">{{ post.dateLong }}</time>
          <span class="text-gray-600 dark:text-gray-400 px-1">•</span>
          <span class="text-gray-600 dark:text-gray-400">{{ Math.ceil((post.readingTime || {}).minutes) }} minuti di lettura</span>
        </header>

        <!-- Begin Featured Image -->
        <img v-if="post.coverImage" :src="post.coverImage + '?w=1088&h=612&strip=all'" :alt="post.title" class="mb-6">
        <!-- End Featured Image -->

        <!-- Begin Post Content -->
        <div class="prose prose-xl prose-green dark:prose-dark max-w-none">
          <nuxt-content :document="post" />
        </div>
        <!-- End Post Content -->
      </article>
      <!-- End Post -->

      <!-- Begin Tags -->
      <p class="mt-10">
        Pubblicato in
        <span v-for="(category, index) of post.categories" :key="index">
          <NuxtLink :to="`/category/${category}`" class="capitalize text-green-600 hover:text-green-800">{{ category }}</NuxtLink><span v-if="index+1 !== post.categories.length">, </span>
        </span>
      </p>
      <div class="flex justify-between mt-2">
        <div>
          <NuxtLink v-for="(tag, index) of post.tags" :key="index" :to="`/tag/${tag}`" class="inline-block text-sm border border-gray-700 hover:text-green-800 hover:border-green-800 rounded px-2 py-1 mr-1 mb-1">
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
      <!-- End Tags -->

      <!-- Begin related posts -->
      <div v-if="related.length" class="mt-10">
        <h4 class="text-2xl font-semibold mb-3">
          Sullo stesso argomento:
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Post v-for="article of related" :key="article.id" :post="article" />
        </div>
      </div>
      <!-- End related posts -->

      <!-- Begin Disqus Comments -->
      <client-only>
        <div id="disqus_thread" class="mt-12" />
        <script>
          window.disqus_config = function () {
          this.page.url = window.location.href
          this.page.identifier = window.location.pathname
          }
          const d = document
          const s = d.createElement('script')
          s.src = 'https://lisergico.disqus.com/embed.js'
          s.setAttribute('data-timestamp', +new Date())
          ;(d.head || d.body).appendChild(s)
        </script>
      </client-only>
      <!-- End Disqus Comments -->
    </div>
  </div>
</template>

<script>
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  async asyncData ({ app, $content, params, error }) {
    const slug = params.slug || 'index'
    let post

    try {
      post = await $content('articles', slug, { text: true }).fetch()
      const event = new Date(post.date)
      post.dateLong = event.toLocaleDateString('it-IT', dateOptions)
      post.readingTime = readingTime(post.text)
    } catch (err) {
      app.$log.warn(err)
      error({ statusCode: 404, message: 'Pagina non trovata.' })
    }

    return {
      post
    }
  },

  data () {
    return {
      post: {},
      related: []
    }
  },

  computed: {
    postUrl () {
      return `${process.env.NUXT_ENV_FRONTEND_URL}${this.$route.path}`
    },
    postUrlEncoded () {
      return encodeURIComponent(this.postUrl)
    }
  },

  async mounted () {
    try {
      const itemsInThisCategory = await this.$content('articles')
        .only(['slug'])
        .where({ categories: { $contains: this.post.categories[0] }, slug: { $ne: this.post.slug } })
        .fetch()
      const maxSkip = itemsInThisCategory.length - 2 // do not skip too much, we need at least 2 items
      const skip = maxSkip > 0 ? Math.floor(maxSkip * Math.random()) : 0 // skip by a random number of items
      this.related = await this.$content('articles', { text: true })
        .where({ categories: { $contains: this.post.categories[0] }, slug: { $ne: this.post.slug } })
        .sortBy('date', 'desc')
        .skip(skip)
        .limit(2)
        .fetch()
    } catch (error) {
      this.$log.error(error)
    }

    if (window && window.FB) {
      window.FB.init({
        appId: '103937073008677',
        status: true,
        xfbml: true,
        version: 'v4.0'
      })
      setTimeout(window.FB.XFBML.parse, 100)
    }
  },

  head () {
    return {
      ...this.$seo({
        title: this.post.title,
        description: this.post.description,
        keywords: this.post.tags,
        image: this.post.coverImage,
        openGraph: {
          type: 'article',
          title: this.post.title,
          description: this.post.description,
          image: {
            url: this.post.coverImage,
            alt: this.post.title
          }
        }
      }),
      script: [
        {
          body: true,
          async: true,
          defer: true,
          crossorigin: 'anonymous',
          nonce: 'vqTA8MnR',
          src: 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v9.0&appId=103937073008677&autoLogAppEvents=1'
        }
      ]
    }
  },

  jsonld () {
    return {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: 'Enrico Deleo'
      },
      headline: this.post.title,
      tags: this.post.tags,
      wordcount: this.post.text.split(' ').length,
      image: [this.post.coverImage],
      datePublished: this.post.date,
      description: this.post.description
    }
  }
}
</script>
