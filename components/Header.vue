<template>
  <div>
    <b-navbar toggleable="lg" type="lighy" class="bg-white fixed-top mediumnavigation">
      <div class="container">
        <b-navbar-brand href="/">
          Lisergico
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
          &nbsp;
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">Articoli</b-nav-item>
            <b-nav-item href="#">Categorie</b-nav-item>
            <b-nav-item href="#">About</b-nav-item>
            <b-nav-item href="https://www.facebook.com/therealenricodeleo/">
              <i class="fa fa-facebook" />
            </b-nav-item>
            <b-nav-item href="https://twitter.com/errikodotit">
              <i class="fa fa-twitter" />
            </b-nav-item>
            <b-nav-item href="https://www.instagram.com/enricodeleo/">
              <i class="fa fa-instagram" />
            </b-nav-item>
            <b-nav-item href="https://www.linkedin.com/in/enricodeleo/">
              <i class="fa fa-linkedin" />
            </b-nav-item>
            <b-nav-form class="my-2 my-lg-0">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="link">
                <span class="search-icon">
                  <svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25">
                    <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
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

<style>
</style>
