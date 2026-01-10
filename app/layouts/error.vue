<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A] py-12">
    <div class="container max-w-4xl mx-auto px-5 md:px-12">
      <div class="text-center space-y-6">
        <!-- Error Icon -->
        <div v-if="error.statusCode === 404" class="text-8xl">
          🔍
        </div>
        <div v-else class="text-8xl">
          💥
        </div>

        <!-- Error Message -->
        <div v-if="error.statusCode === 404" class="space-y-4">
          <h1 class="text-4xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
            Ops, non ho trovato questa pagina
          </h1>
          <p class="text-lg text-[#3c4858] dark:text-gray-200 max-w-2xl mx-auto">
            Ho cercato anche sotto il tappeto, eppure non ho trovato
            il contenuto che stavi cercando. Controlla l'indirizzo
            oppure continua a sfogliare il blog.
          </p>
        </div>

        <div v-else class="space-y-4">
          <h1 class="text-4xl font-extrabold leading-tight text-[#3c4858] dark:text-[#F8FAFC]">
            Houston, abbiamo un problema
          </h1>
          <p class="text-lg text-[#3c4858] dark:text-gray-200 max-w-2xl mx-auto">
            Colpa mia, a quanto pare non ho gestito l'errore che si è
            appena presentato. Nessun problema, comunque, puoi continuare
            a sfogliare il blog e leggere altri contenuti.
          </p>
        </div>

        <!-- Back Button -->
        <div class="pt-4">
          <NuxtLink to="/" class="inline-block px-6 py-3 text-[#3c4858] dark:text-[#F8FAFC] border-2 border-[#c0ccda] dark:border-gray-600 rounded-md hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-700 dark:hover:border-amber-400 transition-colors text-lg font-extrabold">
            Torna alla home page
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const error = computed(() => props.error)
</script>
