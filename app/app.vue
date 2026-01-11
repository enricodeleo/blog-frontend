<template>
  <div>
    <!-- Skip link for keyboard navigation -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
    >
      Vai al contenuto principale
    </a>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieBanner />
    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0"
      >
        <button
          v-if="prefs.resolved"
          type="button"
          class="fixed bottom-6 left-0 z-40 p-3 bg-gray-200/80 dark:bg-gray-800 border-t border-l border-b border-gray-300 dark:border-gray-600 rounded-tr-lg rounded-br-lg shadow-lg hover:shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform duration-300 ease-out cursor-pointer group -translate-x-3 hover:translate-x-0"
          aria-label="Apri preferenze cookie"
          @click="open"
        >
          <span class="text-2xl group-hover:scale-110 transition-transform inline-block" role="img" aria-label="Cookie">🍪</span>
        </button>
      </Transition>
    </ClientOnly>

    <ClientOnly>
      <PreferencesDialog
        :is-open="showDialog"
        @close="close"
      />
    </ClientOnly>

    <!-- AI Chat Button -->
    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-y-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-10 opacity-0"
      >
        <button
          v-if="!chatLoaded"
          type="button"
          class="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center bg-black rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 ease-out cursor-pointer"
          aria-label="Apri chat con AI"
          @click="loadChatWidget"
        >
          <span class="text-2xl">💬</span>
        </button>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup>
const { prefs } = useConsentCookie()
const { showDialog, open, close } = useCookiePreferencesDialog()
const config = useRuntimeConfig()
const googleAnalyticsId = config.public.googleAnalyticsId

const analyticsConsent = computed(() => prefs.value.resolved && prefs.value.analytics)

if (googleAnalyticsId) {
  useScriptGoogleAnalytics({
    id: googleAnalyticsId,
    scriptOptions: {
      trigger: useScriptTriggerConsent({
        consent: analyticsConsent
      })
    }
  })
}

// AI Chat Widget - load on demand and control via API
const chatLoaded = ref(false)
const chatScriptLoaded = ref(false)

async function loadChatWidget() {
  if (chatLoaded.value) {
    // Already loaded, just open it
    if (window.autocustChatWidget) {
      window.autocustChatWidget.open()
    }
    return
  }

  chatLoaded.value = true

  // Load the script
  await useScript({
    src: 'https://cdn.jsdelivr.net/gh/Autocust/ai-chat-widget@3.2.13/dist/chat-widget.min.js',
    tagPosition: 'bodyClose',
    defer: true,
    'data-api-url': 'https://assistant.aisa.tractiontools.it',
    'data-agent-id': 'f991cc4b-610b-4c57-bfca-6e1f8d9a1852'
  })

  chatScriptLoaded.value = true

  // Wait for the API to be available, then open
  const checkAPI = setInterval(() => {
    if (window.autocustChatWidget) {
      clearInterval(checkAPI)
      window.autocustChatWidget.open()
    }
  }, 100)
}
</script>
