<template>
  <article class="border-b border-[#c0ccda] dark:border-gray-700 pb-6 last:border-b-0">
    <NuxtLink :to="post.path" :title="post.title" class="block">
      <!-- Cover Image -->
      <figure v-if="post.coverImage" class="mb-4">
        <img
          :src="post.coverImage + '?resize=680,382&crop=0,0,680px,382px&strip=all'"
          :alt="post.title"
          class="rounded-lg w-full object-cover"
          loading="lazy"
          width="680"
          height="382"
        >
      </figure>

      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC] hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-2">
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p v-if="post.description" class="text-lg text-[#3c4858] dark:text-gray-200 mb-3">
        {{ post.description }}
      </p>

      <!-- Meta -->
      <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <time :datetime="post.date">{{ dateLong }}</time>
      </div>
    </NuxtLink>

    <!-- Categories -->
    <div v-if="post.categories && post.categories.length" class="flex flex-wrap gap-2 mt-3">
      <NuxtLink
        v-for="(category, index) in post.categories"
        :key="index"
        :to="`/category/${category}`"
        class="text-sm text-[#3c4858] dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors"
      >
        {{ category.replace('-', ' ') }}
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const { formatDateLong } = useFormatDate()

const dateLong = computed(() => formatDateLong(props.post.date))
</script>
