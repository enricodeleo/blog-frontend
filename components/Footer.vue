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
