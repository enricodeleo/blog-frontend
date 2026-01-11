<template>
  <div>
    <div class="max-w-prose mx-auto py-12 px-5 md:px-12 select-none">
      <div class="flex flex-col items-center gap-3 mb-6">
        <NuxtLink
          to="/"
          class="inline-svg inline-block max-w-16 fill-current text-gray-900 dark:[&>span]:text-[#E5E7EB]"
          aria-label="Lisergico logo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="block w-full" aria-hidden="true" v-html="logoSvg"/>
        </NuxtLink>
        <p class="text-center text-sm text-gray-700 dark:text-gray-200">
          Storie di musica, startup, digital, coding e qualsiasi cosa mi venga in mente.
        </p>
      </div>
      <h3 class="text-lg text-center mb-4 text-gray-900 dark:text-[#F8FAFC]">
        Mi trovi (tra gli altri) su:
      </h3>
      <div class="flex justify-between text-gray-600 dark:text-[#94A3B8]">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 w-9 items-center justify-center transition-colors"
          :class="link.hoverColor"
          :aria-label="link.label"
        >
          <span class="inline-svg h-full w-full fill-current" aria-hidden="true" v-html="link.icon"/>
        </a>
      </div>
    </div>
    <div class="max-w-prose mx-auto px-5 md:px-12 select-none">
      <p class="text-center mb-0 pb-0 text-gray-700 dark:text-gray-200">
        Non dimenticare la mia <a rel="noopener noreferrer" href="https://amzn.to/3fXQw59" target="_blank" class="text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline decoration-dotted underline-offset-4"><strong>pagina autore su Amazon</strong></a>.
      </p>
    </div>
    <div class="max-w-xs mx-auto px-5 md:px-12 select-none">
      <span
        class="inline-svg block w-full fill-current text-gray-300 dark:text-[#94A3B8]/50"
        aria-hidden="true"
        v-html="dividerShapeSvg"
      />
    </div>
    <nav class="mx-auto max-w-max text-gray-600 dark:text-[#94A3B8]">
      <a href="https://enricodeleo.com/bio" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]">
        Bio
      </a>
      <span class="mx-2">•</span>
      <a href="https://blog.enricodeleo.com/" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]">
        Blog
      </a>
    </nav>
    <footer class="max-w-prose mx-auto text-center text-sm text-gray-600 dark:text-[#94A3B8] px-5 md:px-12 select-none">
      <p class="mt-3">
        Deleo Enrico - P.IVA: 02714140841 - Codice REA: RM1678566
      </p>
      <p class="mt-3">
        Copyright &copy; 2010-{{ currentYear }} Enrico Deleo
      </p>
      <nav class="mx-auto max-w-max mt-4 text-xs text-gray-600 dark:text-[#94A3B8]">
        <a href="https://enricodeleo.com/cookie-policy" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]">
          Cookie Policy
        </a>
        <span class="mx-2">•</span>
        <a href="https://enricodeleo.com/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]">
          Privacy Policy
        </a>
      </nav>
      <ClientOnly>
        <div class="mt-8 text-center text-xs">
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition-colors"
            :class="buttonToneClasses"
            :aria-label="stateLabel"
            @click="next()"
          >
            <span>{{ stateLabel }}</span>
            <span v-if="state === 'light'" aria-hidden="true">☀️</span>
            <span v-else-if="state === 'dark'" aria-hidden="true">🌙</span>
            <span v-else aria-hidden="true">💻</span>
          </button>
        </div>
      </ClientOnly>
    </footer>
  </div>
</template>

<script setup>
import behanceSvg from '~/assets/behance.svg?raw'
import bloggingSvg from '~/assets/blogging.svg?raw'
import dividerShapeSvg from '~/assets/divider-shape.svg?raw'
import facebookSvg from '~/assets/facebook.svg?raw'
import githubSvg from '~/assets/github.svg?raw'
import instagramSvg from '~/assets/instagram.svg?raw'
import linkedinSvg from '~/assets/linkedin.svg?raw'
import logoSvg from '~/assets/logo-enrico-deleo.svg?raw'
import twitchSvg from '~/assets/twitch.svg?raw'
import youtubeSvg from '~/assets/youtube.svg?raw'

const currentYear = ref(new Date().getFullYear())

const mode = useColorMode({
  emitAuto: false,
  modes: {
    dark: 'dark',
    light: '',
  },
})

const { state, next } = useCycleList(['auto', 'light', 'dark'], { initialValue: mode })

watch(state, (newState) => {
  if (import.meta.client) {
    mode.value = newState
  }
}, { flush: 'post' })

const resolvedMode = computed(() => (state.value === 'auto' ? mode.state.value : state.value))
const stateLabel = computed(() => {
  if (state.value === 'light') return 'tema chiaro'
  if (state.value === 'dark') return 'tema scuro'
  const resolvedLabel = resolvedMode.value === 'dark' ? 'scuro' : 'chiaro'
  return `tema auto (${resolvedLabel})`
})
const buttonToneClasses = computed(() => (resolvedMode.value === 'dark'
  ? 'border-[#94A3B8]/20 bg-[#0F172A]/80 text-gray-200 hover:text-[#F8FAFC]'
  : 'border-gray-200 bg-white text-gray-700 hover:text-gray-900'))

const socialLinks = [
  { href: 'https://www.linkedin.com/in/enricodeleo', label: 'LinkedIn', icon: linkedinSvg, hoverColor: 'hover:text-[#0077b5]' },
  { href: 'https://www.facebook.com/therealenricodeleo', label: 'Facebook', icon: facebookSvg, hoverColor: 'hover:text-[#1877f2]' },
  { href: 'https://blog.enricodeleo.com', label: 'Blog', icon: bloggingSvg, hoverColor: 'hover:text-gray-700 dark:hover:text-gray-200' },
  { href: 'https://github.com/enricodeleo', label: 'GitHub', icon: githubSvg, hoverColor: 'hover:text-[#333] dark:hover:text-[#F8FAFC]' },
  { href: 'https://www.behance.net/lysergic', label: 'Behance', icon: behanceSvg, hoverColor: 'hover:text-[#1769ff]' },
  { href: 'https://www.instagram.com/enricodeleo/', label: 'Instagram', icon: instagramSvg, hoverColor: 'hover:text-[#e1306c]' },
  { href: 'https://www.twitch.tv/enricodeleo', label: 'Twitch', icon: twitchSvg, hoverColor: 'hover:text-[#9146ff]' },
  { href: 'https://www.youtube.com/c/EnricoDeleoOfficial', label: 'YouTube', icon: youtubeSvg, hoverColor: 'hover:text-[#ff0000]' },
]
</script>

<style>
</style>
