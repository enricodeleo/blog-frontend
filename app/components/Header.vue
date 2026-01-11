<template>
  <header class="border-b border-[#c0ccda] dark:border-gray-700 bg-white dark:bg-[#0F172A]">
    <nav class="max-w-prose mx-auto px-5 md:px-12 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl md:text-2xl font-extrabold leading-tight hover:scale-105 transition-transform duration-300">
            <span class="bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-300 dark:to-yellow-300 hover:from-purple-400 hover:via-pink-300 hover:to-yellow-300 dark:hover:from-purple-300 dark:hover:via-pink-200 dark:hover:to-yellow-200 bg-[length:200%_200%] animate-gradient">
              Lisergico
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-6">
          <!-- Search Form -->
          <form action="/search" class="flex items-center gap-2">
            <input
              type="text"
              name="term"
              placeholder="Cerca..."
              class="px-3 py-1.5 border border-[#c0ccda] dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-[#3c4858] dark:text-[#F8FAFC] placeholder-[#c0ccda] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <button type="submit" class="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer" aria-label="Cerca">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
            :aria-label="mobileMenuOpen ? 'Chiudi menu' : 'Menu'"
            :aria-expanded="mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pt-4 border-t border-[#c0ccda] dark:border-gray-700">
          <form action="/search" class="mb-4">
            <input
              type="text"
              name="term"
              placeholder="Cerca..."
              class="w-full px-3 py-2 border border-[#c0ccda] dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-[#3c4858] dark:text-[#F8FAFC] placeholder-[#c0ccda] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </form>

          <div class="text-sm text-gray-600 dark:text-gray-300">
            Usa la ricerca per trovare articoli.
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>

<style>
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}
</style>
