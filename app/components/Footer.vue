<template>
  <footer class="border-t border-[#c0ccda] dark:border-gray-700 bg-white dark:bg-[#0F172A] mt-12">
    <div class="container mx-auto px-5 md:px-12 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Copyright -->
        <div>
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

        <!-- Description -->
        <div class="text-right">
          <p class="text-lg text-[#3c4858] dark:text-gray-200">
            Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear())
</script>
