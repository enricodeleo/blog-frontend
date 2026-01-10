<template>
  <div>
    <ClientOnly>
      <Transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showBanner"
          class="fixed bottom-0 left-0 right-0 z-50 px-5 md:px-12 py-4 bg-gray-100 dark:bg-[#0F172A]/85 text-gray-900 dark:text-[#F8FAFC] border-t border-gray-200 dark:border-[#94A3B8]/15 backdrop-blur-md dark:backdrop-blur-md shadow-lg dark:shadow-2xl"
        >
          <div class="max-w-prose mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 leading-relaxed">
            <div class="flex-1 text-sm">
              <p class="mb-1">
                <strong>🍪 Questo sito usa pochissimi cookie</strong>
              </p>
              <p class="text-xs text-gray-600 dark:text-[#94A3B8]">
                Uso cookie tecnici e, se vuoi, anche con finalità misurazione del traffico, come specificato nella <a href="https://enricodeleo.com/cookie-policy" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted underline-offset-4">cookie policy</a>.
                Puoi gestire il tuo consenso in ogni momento tramite il pannello delle preferenze.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="#"
                class="text-sm text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#F8FAFC] cursor-pointer"
                @click.prevent="reject"
              >
                Rifiuta tutti
              </a>
              <button
                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                @click="open"
              >
                Preferenze
              </button>
              <button
                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                @click="accept"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>

    <PreferencesDialog
      :is-open="showDialog"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
const { prefs, acceptAll, rejectAll } = useConsentCookie()
const { showDialog, open, close } = useCookiePreferencesDialog()
const hasMounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    hasMounted.value = true
  }, 500)
})

const showBanner = computed(() => !prefs.value.resolved && hasMounted.value)

function accept() {
  acceptAll()
}

function reject() {
  rejectAll()
}
</script>
