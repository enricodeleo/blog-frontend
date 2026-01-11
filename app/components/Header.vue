<template>
  <header class="border-b border-[#c0ccda] dark:border-gray-700 bg-white dark:bg-[#0F172A]">
    <nav class="max-w-prose mx-auto px-5 md:px-12 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl md:text-2xl font-extrabold text-[#3c4858] dark:text-[#E5E7EB] hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
            Lisergico
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
              <Icon name="mdi:magnify" class="text-xl" />
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
            <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
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
