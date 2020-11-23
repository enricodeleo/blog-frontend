<template>
  <div class="footer container">
    <div class="row">
      <div class="col">
        <p>Copyright &copy; 2010-{{ currentYear }} Enrico Deleo</p>
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
