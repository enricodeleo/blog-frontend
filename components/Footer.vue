<template>
  <footer class="container mx-auto grid grid-cols-2 space-between border-t border-gray-300 pt-4 pb-6">
    <div class="text-xs">
      <p class="text-gray-600">
        Copyright &copy; 2010-{{ currentYear }} Enrico Deleo
      </p>
      <p class="mt-2">
        <a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed" title="Privacy Policy ">Privacy Policy</a>
      </p>
    </div>
    <div class="text-right text-xs text-gray-600">
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

<style scoped>
  .footer {
    border-top: 1px solid rgba(0,0,0,.05)!important;
    padding-top: 15px;
    padding-bottom: 12px;
    font-size: 0.8rem;
    color: rgba(0,0,0,.44);
    margin-top: 50px;
  }
</style>
