<template>
  <div class="flex flex-col min-h-screen sm:subpixel-antialiased md:antialiased leading-relaxed bg-white dark:bg-[#0F172A] pb-40">
    <Header />
    <main id="main-content" class="flex-grow">
      <div class="max-w-prose mx-auto px-5 md:px-12 py-8">
        <slot />
      </div>
    </main>
    <Footer class="mt-auto" />
  </div>
</template>
