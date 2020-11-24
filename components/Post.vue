<template>
  <b-card
    tag="article"
    no-body
    img-top
  >
    <a :href="`/${post.slug}`" :title="post.title">
      <b-card-img-lazy :src="post.coverImage" :alt="post.title" />
    </a>
    <b-card-body>
      <a :href="`/${post.slug}`" class="text-dark">
        <b-card-title>{{ post.title }}</b-card-title>
      </a>

      <b-card-text class="text-muted">
        {{ post.excerpt }}
      </b-card-text>

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

  mounted () {
    const event = new Date(this.post.date)
    this.$set(this.post, 'dateLong', event.toLocaleDateString('it-IT', dateOptions))
    this.$set(this.post, 'readingTime', readingTime(this.post.text))
  }
}
</script>

<style>

</style>
