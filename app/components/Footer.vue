<template>
  <footer class="footer footer-center p-10 bg-base-200/50 text-base-content rounded-lg mt-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      <div class="text-left">
        <p class="font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Copyright &copy; 2010-{{ currentYear }}
          <a rel="noopener" href="https://enricodeleo.com" class="hover:underline">Enrico Deleo</a>
        </p>
      </div>
      <div class="text-right">
        <p class="text-base-content/70">Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear())
</script>
