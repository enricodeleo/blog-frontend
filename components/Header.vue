<template>
  <header class="sticky z-50 top-0 border-gray-300 dark:border-gray-700 border-b py-3">
    <nav class="container max-w-4xl mx-auto flex flex-col lg:flex-row justify-between">
      <div class="flex flex-row items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold">
          Lisergico
        </NuxtLink>
        <button
          class="visible lg:invisible w-10 h-10 flex flex-col items-center justify-center text-center rounded-md border border-gray-300"
          title="Menu"
          @click.prevent="expanded = !expanded"
        >
          <span v-if="expanded" class="text-xl">&times;</span>
          <span v-else class="text-xl">&#9776;</span>
        </button>
      </div>
      <div class="flex flex-col lg:flex lg:flex-row lg:items-center" :class="{ hidden: !expanded }">
        <a
          rel="noopener noreferrer"
          href="https://www.facebook.com/therealenricodeleo/"
          target="_blank"
          class="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm mr-3 py-2"
        >
          Facebook
        </a>
        <a
          rel="noopener noreferrer"
          href="https://www.instagram.com/enricodeleo/"
          target="_blank"
          class="text-gray-600 dark:text-gray-400 hover:text-pink-500 text-sm mr-3 py-2"
        >
          Instagram
        </a>
        <a
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/enricodeleo/"
          target="_blank"
          class="text-gray-600 dark:text-gray-400 hover:text-blue-800 text-sm mr-3 py-2"
        >
          LinkedIn
        </a>
        <a
          rel="noopener noreferrer"
          href="https://github.com/enricodeleo/"
          target="_blank"
          class="text-gray-600 dark:text-gray-400 hover:text-black text-sm mr-3 py-2"
        >
          GitHub
        </a>
        <form action="/search" class="flex flex-row items-center border lg:rounded-full" :class="{ 'border-green-800': typing }">
          <input
            type="text"
            name="term"
            placeholder="Cerca"
            class="focus:outline-none w-full lg:w-auto px-3 py-3 lg:py-1 bg-transparent"
            @focus="typing = true"
            @blur="typing = false"
          >
          <button type="submit" class="pr-2">
            <span class="search-icon text-gray-700 dark:text-gray-400" :class="{ 'text-green-800': typing }">
              <svg v-show="typing" class="fill-current" width="25" height="20" viewBox="0 0 74 74">
                <path d="m71 31.47a1 1 0 0 1 -1-1v-2.91a1 1 0 0 1 2 0v2.91a1 1 0 0 1 -1 1z" />
                <path d="m69 70.8h-64a3 3 0 0 1 -3-3v-24.14a3 3 0 0 1 3-3h26.27v-34.46a3 3 0 0 1 3-3h34.73a3 3 0 0 1 3 3v14.36a1 1 0 1 1 -2 0v-14.36a1 1 0 0 0 -1-1h-34.73a1 1 0 0 0 -1 1v35.46a1 1 0 0 1 -1 1h-27.27a1 1 0 0 0 -1 1v24.14a1 1 0 0 0 1 1h64a1 1 0 0 0 1-1v-20.36a1 1 0 0 1 2 0v20.36a3 3 0 0 1 -3 3z" /><path d="m71 41.44a1 1 0 0 1 -1-1v-2.97a1 1 0 0 1 2 0v2.97a1 1 0 0 1 -1 1z" /><path d="m51 57.322h-31.094a1 1 0 0 1 0-2h30.094v-33.322a1 1 0 0 1 2 0v34.322a1 1 0 0 1 -1 1z" />
                <path d="m25.583 63a1 1 0 0 1 -.707-.293l-5.676-5.678a1 1 0 0 1 0-1.414l5.677-5.677a1 1 0 1 1 1.415 1.414l-4.971 4.97 4.971 4.971a1 1 0 0 1 -.709 1.707z" />
              </svg>
              <svg v-show="!typing" class="fill-current" width="25" height="25" viewBox="0 0 25 25">
                <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const typing = ref(false)
const expanded = ref(false)
</script>
