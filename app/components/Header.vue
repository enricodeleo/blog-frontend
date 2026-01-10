<template>
  <header class="sticky top-0 z-50 navbar bg-base-100/95 backdrop-blur-sm shadow-lg">
    <nav class="container max-w-6xl mx-auto">
      <div class="navbar-start">
        <NuxtLink to="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Lisergico
        </NuxtLink>
      </div>

      <div class="navbar-end hidden lg:flex">
        <div class="flex gap-2 items-center">
          <form action="/search" class="form-control">
            <div class="join">
              <input
                type="text"
                name="term"
                placeholder="Cerca..."
                class="input input-bordered input-sm join-item w-full"
              >
              <button type="submit" class="btn btn-neutral btn-sm join-item">
                <Icon name="mdi:magnify" class="text-lg" />
              </button>
            </div>
          </form>

          <!-- Dark Mode Toggle -->
          <ClientOnly>
            <button
              @click="colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'"
              class="btn btn-ghost btn-circle"
              title="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="mdi:weather-sunny" class="text-xl" />
              <Icon v-else name="mdi:moon-waning-crescent" class="text-xl" />
            </button>
          </ClientOnly>

          <a href="https://www.facebook.com/therealenricodeleo/"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-ghost btn-circle hover:text-blue-500">
            <Icon name="mdi:facebook" class="text-xl" />
          </a>
          <a href="https://www.instagram.com/enricodeleo/"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-ghost btn-circle hover:text-pink-500">
            <Icon name="mdi:instagram" class="text-xl" />
          </a>
          <a href="https://www.linkedin.com/in/enricodeleo/"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-ghost btn-circle hover:text-blue-700">
            <Icon name="mdi:linkedin" class="text-xl" />
          </a>
          <a href="https://github.com/enricodeleo/"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-ghost btn-circle hover:text-gray-900 dark:hover:text-gray-100">
            <Icon name="mdi:github" class="text-xl" />
          </a>
        </div>
      </div>

      <div class="navbar-end lg:hidden">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <Icon name="mdi:menu" class="text-xl" />
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <form action="/search" class="form-control p-2">
                <div class="join">
                  <input type="text" name="term" placeholder="Cerca..." class="input input-bordered input-sm join-item w-full">
                  <button type="submit" class="btn btn-neutral btn-sm join-item">
                    <Icon name="mdi:magnify" />
                  </button>
                </div>
              </form>
            </li>
            <li>
              <ClientOnly>
                <a @click="colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'">
                  <Icon :name="colorMode.value === 'dark' ? 'mdi:weather-sunny' : 'mdi:moon-waning-crescent'" />
                  {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
                </a>
              </ClientOnly>
            </li>
            <li><a href="https://www.facebook.com/therealenricodeleo/" target="_blank" class="hover:text-blue-500"><Icon name="mdi:facebook" /> Facebook</a></li>
            <li><a href="https://www.instagram.com/enricodeleo/" target="_blank" class="hover:text-pink-500"><Icon name="mdi:instagram" /> Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/enricodeleo/" target="_blank" class="hover:text-blue-700"><Icon name="mdi:linkedin" /> LinkedIn</a></li>
            <li><a href="https://github.com/enricodeleo/" target="_blank" class="hover:text-gray-900 dark:hover:text-gray-100"><Icon name="mdi:github" /> GitHub</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const colorMode = useColorMode()
const typing = ref(false)
const expanded = ref(false)
</script>
