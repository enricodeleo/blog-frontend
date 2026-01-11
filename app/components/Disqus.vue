<template>
  <div class="mt-12">
    <!-- Fallback message when cookies not accepted -->
    <div v-if="!canShowDisqus" class="border-l-4 border-amber-600 px-6 py-4 bg-amber-50 dark:bg-amber-900/10">
      <p class="text-sm text-[#3c4858] dark:text-[#F8FAFC]">
        Per visualizzare i commenti è necessario accettare i cookie di terze parti.
        <button
          @click="openPreferences"
          class="ml-2 underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
        >
          Gestisci preferenze
        </button>
      </p>
    </div>

    <!-- Disqus thread (loaded only when consent given) -->
    <div v-show="canShowDisqus" id="disqus_thread" />
  </div>
</template>

<script setup>
const props = defineProps({
  identifier: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const { prefs } = useConsentCookie()
const { open } = useCookiePreferencesDialog()

// Check if user has consented to analytics (third-party cookies)
const canShowDisqus = computed(() => prefs.value.resolved && prefs.value.analytics)

// Load Disqus using @nuxt/scripts (only when consent given)
let disqusScript = null

if (import.meta.client) {
  const shortname = 'lisergico'
  const scriptSrc = `https://${shortname}.disqus.com/embed.js`

  const setDisqusConfig = () => {
    window.disqus_config = function () {
      this.page.url = props.url
      this.page.identifier = props.identifier
      if (props.title) {
        this.page.title = props.title
      }
    }
  }

  const resetDisqus = () => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: window.disqus_config
      })
    }
  }

  const loadDisqus = () => {
    if (!disqusScript) {
      disqusScript = useScript({
        src: scriptSrc,
        defer: true,
        crossorigin: false,
        'data-timestamp': String(Date.now())
      }, {
        trigger: 'client',
        beforeInit: () => {
          setDisqusConfig()
        }
      })

      disqusScript.onLoaded(() => {
        resetDisqus()
      })
    }
  }

  // Load Disqus when consent is given
  watch(() => canShowDisqus.value, (newValue) => {
    if (newValue) {
      loadDisqus()
    }
  }, { immediate: true })
}
</script>
