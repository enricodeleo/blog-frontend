<template>
  <b-navbar toggleable="lg" type="light" class="bg-white sticky-top mediumnavigation">
    <div class="container">
      <b-navbar-brand nuxt-link to="/">
        Lisergico
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse">
        <template #default="{ expanded }">
          <font-awesome-icon v-show="expanded" :icon="['fas', 'times']" />
          <font-awesome-icon v-show="!expanded" :icon="['fas', 'bars']" />
        </template>
      </b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item href="#" class="active">
            Articoli
          </b-nav-item> -->
          <b-nav-item href="https://www.facebook.com/therealenricodeleo/" target="_blank">
            <font-awesome-icon :icon="['fab', 'facebook']" /> Facebook
          </b-nav-item>
          <b-nav-item href="https://www.instagram.com/enricodeleo/" target="_blank">
            <font-awesome-icon :icon="['fab', 'instagram']" /> Instagram
          </b-nav-item>
          <b-nav-item href="https://www.linkedin.com/in/enricodeleo/" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
          </b-nav-item>
          <b-nav-item href="https://github.com/enricodeleo/" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" /> GitHub
          </b-nav-item>
          <b-nav-form class="ml-0" action="/search">
            <b-form-input size="sm" class="mr-sm-2" name="term" placeholder="Search" />
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
</template>

<script>
export default {
  methods: {
    onSearch () {}
  }
}
</script>

<style scoped>
  .mediumnavigation {
    background:rgba(255,255,255,.97);
    box-shadow:0 2px 2px -2px rgba(0,0,0,.15);
  }
  .mediumnavigation .form-control {
    /* font-size:0.8rem; */
    border-radius:30px;
    overflow:hidden;
    border:1px solid rgba(0,0,0,0.04);
  }
  .mediumnavigation .form-inline .btn {
    margin-left:-50px;
    border:0;
    border-radius:30px;
    cursor:pointer;
  }
  .mediumnavigation .form-inline .btn:hover,
  .mediumnavigation .form-inline .btn:active {
    background:transparent;
    color:green;
  }
  .mediumnavigation .navbar-brand {
    font-weight:500;
  }
  .mediumnavigation .dropdown-menu {
    border:1px solid rgba(0,0,0,0.08);
    margin:.5rem 0 0;
  }
  .mediumnavigation .nav-item,.dropdown-menu {
    font-size:0.9rem;
  }
  .mediumnavigation .navbar-brand img {
    max-height:30px;
    margin-right:5px;
  }

  .form-control::-webkit-input-placeholder {
    color: rgba(0,0,0,.5);
  }
  .form-control:-moz-placeholder {
    color: rgba(0,0,0,.5);
  }
  .form-control::-moz-placeholder {
    color: rgba(0,0,0,.5);
  }
  .form-control:-ms-input-placeholder {
    color: rgba(0,0,0,.5);
  }
  .form-control::-ms-input-placeholder {
    color: rgba(0,0,0,.5);
  }
</style>
