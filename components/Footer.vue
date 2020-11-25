<template>
  <div class="footer container">
    <div class="row">
      <div class="col">
        <p>Copyright &copy; 2010-{{ currentYear }} Enrico Deleo</p>
        <p><a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed" title="Privacy Policy ">Privacy Policy</a></p>
      </div>
      <div class="col text-right">
        <p>Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.</p>
      </div>
    </div>
  </div>
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

<style>
</style>
