<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[9999] bg-black/50"
          @click="close"
        />
      </Transition>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center px-4 py-6 z-[10000] overflow-y-auto"
        >
          <div class="w-full max-w-prose mx-auto p-6 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#94A3B8]/15 rounded-lg shadow-lg leading-relaxed dark:text-[#F8FAFC] backdrop-blur-md dark:backdrop-blur-md dark:shadow-2xl my-auto">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl md:text-3xl font-extrabold leading-tight">
                Preferenze cookie e privacy
              </h3>
              <button
                class="text-gray-500 hover:text-gray-700 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] cursor-pointer"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="mb-6">
              <p class="mb-3 text-slate-600 dark:text-gray-200">
                Qui puoi esprimere preferenze relative al tracciamento della tua sessione, e rivedere e modificare le tue scelte in qualsiasi momento tornando su questo pannello.
              </p>
              <p class="text-slate-600 dark:text-gray-200">
                Per rifiutare il tuo consenso alle attività di trattamento descritte di seguito, disattiva i singoli comandi o utilizza il pulsante "Rifiuta tutti" e conferma di voler salvare le scelte effettuate.
              </p>
            </div>

            <div class="divide-y divide-gray-200 dark:divide-gray-600 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-start gap-3 py-4">
                <div class="flex-1">
                  <p class="font-bold mb-1">
                    Cookie misurazione
                  </p>
                  <p class="text-slate-600 dark:text-gray-200">
                    Permettono di misurare il traffico e analizzare come viene usato il sito.
                  </p>
                </div>
                <div class="flex items-center h-5">
                  <button
                    type="button"
                    class="w-11 h-6 rounded-full relative transition-colors"
                    :class="analyticsEnabled ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-200 dark:bg-[#111827]'"
                    @click="analyticsEnabled = !analyticsEnabled"
                    :aria-pressed="analyticsEnabled"
                    aria-label="Attiva o disattiva cookie di misurazione"
                  >
                    <span
                      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                      :class="analyticsEnabled ? 'translate-x-5' : 'translate-x-0'"
                    />
                  </button>
                </div>
              </div>

              <div class="flex items-start gap-3 py-4">
                <div class="flex-1">
                  <p class="font-bold mb-1">
                    Cookie strettamente necessari (sempre attivi)
                  </p>
                  <p class="text-slate-600 dark:text-gray-200">
                    Sempre attivi. Servono per il funzionamento del sito, inclusa la chat AI.
                  </p>
                </div>
                <div class="flex items-center h-5">
                  <div class="w-11 h-6 bg-green-500 dark:bg-green-600 rounded-full relative opacity-50 cursor-not-allowed">
                    <div class="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 text-xs text-gray-500 dark:text-[#94A3B8]">
              Per maggiori informazioni, consulta la <a href="https://enricodeleo.com/privacy-policy" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted underline-offset-4">privacy</a> e la <a href="https://enricodeleo.com/cookie-policy" target="_blank" rel="noopener noreferrer" class="underline decoration-dotted underline-offset-4">cookie policy</a>.
            </div>

            <div class="mt-3 text-xs text-gray-600 dark:text-[#94A3B8]">
              Le modifiche alle preferenze hanno effetto dalle successive navigazioni.
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-[#94A3B8]/15 flex items-center justify-between gap-3">
              <button
                class="px-4 py-2 text-sm text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#F8FAFC] cursor-pointer"
                @click="onRejectAll"
              >
                Rifiuta tutti
              </button>
              <div class="flex items-center gap-3">
                <button
                  class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                  @click="onSave"
                >
                  Salva e continua
                </button>
                <button
                  class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                  @click="onAcceptAll"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const { prefs, acceptAll, rejectAll, save } = useConsentCookie()

const analyticsEnabled = ref(false)

watch(
  () => props.isOpen,
  (open) => {
    if (open) analyticsEnabled.value = prefs.value.analytics
  }
)

function close() {
  emit('close')
}

function onSave() {
  save(analyticsEnabled.value)
  close()
}

function onAcceptAll() {
  acceptAll()
  close()
}

function onRejectAll() {
  rejectAll()
  close()
}
</script>
