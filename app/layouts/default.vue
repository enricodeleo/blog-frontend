<template>
  <div class="flex flex-col min-h-screen antialiased sm:subpixel-antialiased md:antialiased bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
    <Header />
    <main class="flex-grow container mx-auto px-4 max-w-6xl py-6">
      <NuxtPage keep-alive />
    </main>
    <lazy-footer class="mt-auto" />
    <div id="fb-root" />
  </div>
</template>
