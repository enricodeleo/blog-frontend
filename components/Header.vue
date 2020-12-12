<template>
  <header class="bg-white sticky z-50 top-0 border-gray-300 border-b py-3">
    <nav class="container mx-auto flex flex-row justify-between">
      <div>
        <NuxtLink to="/" class="text-2xl font-semibold">
          Lisergico
        </NuxtLink>
      </div>
      <div class="flex flex-row items-center">
        <!-- <font-awesome-icon v-show="expanded" :icon="['fas', 'times']" />
        <font-awesome-icon v-show="!expanded" :icon="['fas', 'bars']" /> -->
        <a rel="noopner noreferrer" href="https://www.facebook.com/therealenricodeleo/" target="_blank" class="text-gray-600 text-sm mr-3">
          <font-awesome-icon :icon="['fab', 'facebook']" /> Facebook
        </a>
        <a rel="noopner noreferrer" href="https://www.instagram.com/enricodeleo/" target="_blank" class="text-gray-600 text-sm mr-3">
          <font-awesome-icon :icon="['fab', 'instagram']" /> Instagram
        </a>
        <a rel="noopner noreferrer" href="https://www.linkedin.com/in/enricodeleo/" target="_blank" class="text-gray-600 text-sm mr-3">
          <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
        </a>
        <a rel="noopner noreferrer" href="https://github.com/enricodeleo/" target="_blank" class="text-gray-600 text-sm mr-3">
          <font-awesome-icon :icon="['fab', 'github']" /> GitHub
        </a>
        <form action="/search" class="flex flex-row items-center border px-3 py-1 rounded-full">
          <input type="text" name="term" placeholder="Cerca" class="mr-sm-2">
          <button type="submit">
            <span class="search-icon">
              <svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25">
                <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </nav>
  </header>
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
