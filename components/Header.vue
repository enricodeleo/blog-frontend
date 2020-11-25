<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="bg-white fixed-top mediumnavigation">
      <div class="container">
        <b-navbar-brand nuxt-link to="/">
          Lisergico
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
          &nbsp;
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item href="#" class="active">
              Articoli
            </b-nav-item> -->
            <b-nav-item href="https://www.facebook.com/therealenricodeleo/" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </b-nav-item>
            <b-nav-item href="https://www.instagram.com/enricodeleo/" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </b-nav-item>
            <b-nav-item href="https://www.linkedin.com/in/enricodeleo/" target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </b-nav-item>
            <b-nav-item href="https://github.com/enricodeleo/" target="_blank">
              <font-awesome-icon :icon="['fab', 'github']" />
            </b-nav-item>
            <b-nav-form @submit="onSearcb" class="my-2 my-lg-0">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="link">
                <span class="search-icon">
                  <svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25">
                    <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z" />
                  </svg>
                </span>
              </b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    onSearch () {}
  }
}
</script>

<style>
</style>
