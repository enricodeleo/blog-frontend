<template>
  <div class="flex flex-col min-h-screen antialiased sm:subpixel-antialiased md:antialiased dark:bg-gray-800 dark:text-gray-300">
    <Header class="px-6 lg:px-0 bg-white dark:bg-gray-800" />
    <Nuxt keep-alive class="pb-5 px-6 lg:px-0 container max-w-screen-xl mx-auto" />
    <lazy-footer class="mt-auto px-6 lg:px-0" />
    <div id="fb-root" />
  </div>
</template>
