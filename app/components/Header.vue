<template>
  <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F172A]">
    <nav class="container mx-auto px-5 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-[#E5E7EB] hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
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
              class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-gray-900 dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            >
            <button type="submit" class="px-3 py-1.5 text-gray-900 dark:text-[#F8FAFC] hover:text-amber-600 dark:hover:text-amber-500 transition-colors" aria-label="Cerca">
              <Icon name="mdi:magnify" class="text-xl" />
            </button>
          </form>

          <!-- Social Links -->
          <div class="flex items-center gap-4">
            <a
              href="https://www.facebook.com/therealenricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900 dark:text-[#F8FAFC] hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Icon name="mdi:facebook" class="text-xl" />
            </a>
            <a
              href="https://www.instagram.com/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900 dark:text-[#F8FAFC] hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" class="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900 dark:text-[#F8FAFC] hover:text-blue-700 dark:hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="text-xl" />
            </a>
            <a
              href="https://github.com/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-900 dark:text-[#F8FAFC] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="text-xl" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 text-gray-900 dark:text-[#F8FAFC] hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            aria-label="Menu"
            aria-expanded="false"
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
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <form action="/search" class="mb-4">
            <input
              type="text"
              name="term"
              placeholder="Cerca..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#111827] text-gray-900 dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
          </form>

          <div class="flex flex-col space-y-3">
            <a
              href="https://www.facebook.com/therealenricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-900 dark:text-[#F8FAFC] hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              <Icon name="mdi:facebook" class="text-xl" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-900 dark:text-[#F8FAFC] hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
            >
              <Icon name="mdi:instagram" class="text-xl" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-900 dark:text-[#F8FAFC] hover:text-blue-700 dark:hover:text-blue-600 transition-colors"
            >
              <Icon name="mdi:linkedin" class="text-xl" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/enricodeleo/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-900 dark:text-[#F8FAFC] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Icon name="mdi:github" class="text-xl" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
