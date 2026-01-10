<template>
  <div class="flex flex-col min-h-screen sm:subpixel-antialiased md:antialiased leading-relaxed bg-white dark:bg-[#0F172A]">
    <Header />
    <main class="flex-grow container mx-auto px-5 max-w-6xl py-8">
      <NuxtPage keep-alive />
    </main>
    <lazy-footer class="mt-auto" />
  </div>
</template>
