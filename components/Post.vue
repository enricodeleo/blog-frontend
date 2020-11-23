<template>
  <b-card
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
            <span class="post-name">
              Pubblicato in
              <span v-for="(category, index) of categories" :key="category.id">
                <a :href="`/categories/${category.slug}`" class="text-primary">{{ category.name }}</a><span v-if="index+1 !== categories.length">, </span>
              </span>
            </span>
            <br>
            <span class="post-date">{{ post.dateLong }}</span>
            <span class="dot" />
            <span class="post-read">{{ Math.ceil((post.readingTime || {}).minutes) }} minuti di lettura</span>
          </span>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import readingTime from 'reading-time'

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export default {
  props: {
    post: {
      type: Object,
      default () { return {} },
      required: true
    }
  },

  data () {
    return {
      categories: []
    }
  },

  async mounted () {
    const event = new Date(this.post.date)
    this.$set(this.post, 'dateLong', event.toLocaleDateString('it-IT', dateOptions))
    this.$set(this.post, 'readingTime', readingTime(this.post.content.rendered))
    try {
      this.categories = await this.$wp.categories().post(this.post.id)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>

</style>
