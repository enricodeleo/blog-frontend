<template>
  <nav v-if="shown" class="inline-flex items-center border border-[#c0ccda] dark:border-gray-600 rounded-md bg-white/80 dark:bg-[#0F172A]/70 px-3 py-2 text-xs font-bold text-[#3c4858] dark:text-gray-300" :aria-label="labels.aria">
    <a
      :href="target"
      :hreflang="otherHreflang"
      :lang="otherHreflang"
      :aria-label="labels.ariaLabel"
      class="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
      @click="rememberLocale"
    >
      {{ labels.label }}
    </a>
  </nav>
</template>

<script setup>
const props = defineProps({
  locale: {
    type: String,
    default: 'it'
  },
  target: {
    type: String,
    default: null
  }
})

const shown = ref(false)

const labels = computed(() => props.locale === 'en'
  ? {
      aria: 'Language selector',
      label: '🇮🇹 Leggi questa pagina in italiano',
      ariaLabel: 'Leggi questa pagina in italiano'
    }
  : {
      aria: 'Selettore lingua',
      label: '🇬🇧 View this page in English',
      ariaLabel: 'View this page in English'
    })

const otherHreflang = computed(() => (props.locale === 'en' ? 'it-IT' : 'en'))

function detectPreferredLocale() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages
    .map(language => String(language).toLowerCase())
    .map((language) => {
      if (language.startsWith('it')) return 'it'
      if (language.startsWith('en')) return 'en'
      return null
    })
    .find(locale => locale !== null) || null
}

onMounted(() => {
  if (!props.target) return
  const preferred = localStorage.getItem('preferredLocale') || detectPreferredLocale()
  shown.value = preferred !== null && preferred !== props.locale
})

function rememberLocale() {
  localStorage.setItem('preferredLocale', props.locale === 'en' ? 'it' : 'en')
}
</script>
