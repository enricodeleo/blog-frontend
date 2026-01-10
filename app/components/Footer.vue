<template>
  <footer class="border-t border-[#c0ccda] dark:border-gray-700 bg-white dark:bg-[#0F172A] mt-12">
    <div class="container mx-auto px-5 md:px-12 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Logo and Copyright -->
        <div class="flex flex-col gap-4">
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="inline-svg inline-block max-w-16 fill-current text-[#3c4858] dark:[&>span]:text-[#E5E7EB]"
            aria-label="Lisergico logo"
          >
            <span class="block w-full" aria-hidden="true" v-html="logoSvg"/>
          </NuxtLink>

          <!-- Copyright -->
          <p class="text-[#3c4858] dark:text-[#E5E7EB]">
            Copyright &copy; 2010-{{ currentYear }}
            <a
              rel="noopener"
              href="https://enricodeleo.com"
              class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors ml-1"
            >
              Enrico Deleo
            </a>
          </p>
        </div>

        <!-- Description and Links -->
        <div class="flex flex-col gap-4 md:text-right">
          <!-- Description -->
          <p class="text-lg text-[#3c4858] dark:text-gray-200">
            Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.
          </p>

          <!-- Privacy Policy -->
          <p>
            <a
              href="https://www.iubenda.com/privacy-policy/13699998"
              class="text-[#3c4858] dark:text-gray-200 underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logoSvg from '~/assets/logo-enrico-deleo.svg?raw'

const currentYear = computed(() => new Date().getFullYear())
</script>
