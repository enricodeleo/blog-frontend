<template>
  <div class="flex flex-col min-h-screen antialiased sm:subpixel-antialiased md:antialiased">
    <LazyHydrate on-interaction>
      <Header class="px-6 lg:px-0" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <Nuxt keep-alive class="pb-5 px-6 lg:px-0 container max-w-screen-xl mx-auto" />
    </LazyHydrate>
    <LazyHydrate never>
      <lazy-footer class="mt-auto px-6 lg:px-0" />
    </LazyHydrate>
    <div id="fb-root" />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  components: {
    LazyHydrate
  }
}
</script>
