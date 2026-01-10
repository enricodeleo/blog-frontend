<template>
  <div class="h-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col pt-5">
          <section v-if="error.statusCode === 404">
            <h1>
              🔍 Ops, non ho trovato questa pagina.
            </h1>
            <p class="lead">
              Ho cercato anche sotto il tappeto, eppure non ho trovato
              il contenuto che stavi cercando. Controlla l'indirizzo
              oppure utilizza continua a sfogliare il blog.
            </p>
          </section>
          <section v-else>
            <h1>
              💥 Houston, abbiamo un problema.
            </h1>
            <p class="lead">
              Colpa mia, a quanto pare non ho gestito l'errore che si è
              appena presentato. Nessun problema, comunque, puoi continuare
              a sfogliare il blog e leggere altri contenuti.
            </p>
          </section>
          <div class="row">
            <div class="col text-center">
              <NuxtLink to="/" class="btn btn-lg btn-primary">
                Torna alla home page
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Number,
      default: 404
    }
  }
}
</script>
