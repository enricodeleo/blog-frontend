<template>
  <footer
    class="container max-w-screen-xl mx-auto grid grid-cols-2 space-between border-t border-gray-300 dark:border-gray-700 pt-4 pb-6 text-xs text-gray-600 dark:text-gray-400"
  >
    <div>
      <p>
        Copyright &copy; 2010-{{ currentYear }} <a rel="noopener" href="https://enricodeleo.com" class="text-green-600 hover:text-green-800">Enrico Deleo</a>
      </p>
      <p class="mt-2">
        <a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed" title="Privacy Policy ">Privacy Policy</a>
      </p>
    </div>
    <div class="lg:text-right">
      <p>Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>
