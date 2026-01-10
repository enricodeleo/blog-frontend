---
title: "Otto anni dopo: dall’architettura WordPress al boom dei siti headless"
date: "2024-12-11T12:00:00.000Z"
categories:
  - "dev"
tags:
  - "wordpress"
  - "nuxt3"
  - "headless"
  - "vue3"
  - "frontend"
  - "cms"
description: "Una retrospettiva sull'evoluzione delle applicazioni WordPress dal 2016 al 2024 e la rivoluzione dei siti headless con Nuxt3."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/otto-anni-dopo-dallarchitettura-wordpress-al-boom-dei-siti-headles.jpg"
sticky: true
---

Nel 2016, al Meetup WordPress di Roma, parlavo di [**“Modern Gentlemen’s WordPress”**](https://blog.enricodeleo.com/modern-gentlemens-wordpress-un-nuovo-approccio-al-web), un approccio metodico e strutturato per creare applicazioni WordPress mantenibili e performanti. Guardando indietro, quel talk fu una riflessione sullo stato dell’arte e una guida per affrontare il caos di plugin, temi pesanti e customizzazione spesso inefficiente.

Oggi, a distanza di otto anni, il panorama dello sviluppo web è radicalmente cambiato. Le parole chiave del 2024 sono **headless CMS** e **frontend moderni**, con framework come Nuxt3 che dominano la scena. In questa retrospettiva, voglio analizzare cosa è cambiato e come WordPress continui a essere rilevante, ma in modi completamente nuovi.

## Il passaggio all'headless CMS

Se nel 2016 WordPress era prevalentemente utilizzato come piattaforma monolitica, oggi si sta affermando sempre più come **headless CMS**. Questo approccio separa completamente il backend dal frontend: WordPress si occupa di gestire contenuti e API, mentre il frontend viene sviluppato con tecnologie come **Nuxt3**, **React**, o **Next.js**.

### Perché scegliere un'architettura headless?
- **Performance superiore**: Caricamenti più rapidi grazie a frontend ottimizzati per il rendering statico o server-side.
- **Flessibilità**: Il backend WordPress può alimentare diverse piattaforme (sito web, app mobile, chatbot).
- **Esperienza utente avanzata**: Un frontend moderno permette di implementare interfacce altamente interattive e dinamiche.

WordPress, con la sua API REST nativa e GraphQL tramite plugin come WPGraphQL, si adatta perfettamente a questo paradigma. Il tuo contenuto rimane centralizzato, ma puoi costruire esperienze utente al passo con le aspettative del 2024.

## Perché Nuxt3 è il frontend ideale

**Nuxt3**, basato su Vue 3, si è affermato come una delle soluzioni più robuste per lo sviluppo di frontend headless. Rispetto al Nuxt2 del 2016, questa nuova versione offre:
- **Prestazioni migliorate**, grazie a Vue 3 e Vite per il bundling.
- **Supporto nativo per il rendering universale**, fondamentale per SEO e performance.
- **Modularità e scalabilità**, con un ecosistema che facilita l’integrazione con CMS, autenticazione e servizi cloud.

Con Nuxt3, puoi costruire siti che combinano il meglio del rendering statico (SSG) e server-side (SSR). Questo lo rende perfetto per e-commerce, blog e applicazioni web avanzate.

## Come coniugare WordPress e Nuxt3

Ecco una roadmap per implementare un sito headless con WordPress e Nuxt3:
1. **Preparare WordPress come CMS headless**:
   - Utilizza **WPGraphQL** o la REST API per esporre i dati.
   - Ottimizza WordPress per funzionare come API server (disabilita temi e plugin non necessari).

2. **Costruire il frontend con Nuxt3**:
   - Configura un’app Nuxt3 per consumare l’API di WordPress.
   - Implementa il rendering universale per ottenere un’ottima indicizzazione e prestazioni.
   - Integra strumenti moderni per immagini (Nuxt Image) e analytics.

3. **Deployment**:
   - Sfrutta piattaforme moderne come **Vercel**, **Netlify**, o container su cloud per una distribuzione rapida.

## Conclusioni

Dal 2016 a oggi, la filosofia “Modern Gentlemen” ha trovato una sua naturale evoluzione. Oggi non si tratta solo di costruire applicazioni ben strutturate, ma di **connettere i migliori strumenti disponibili** per offrire esperienze utente eccezionali. Nuxt3 e l’approccio headless sono un esempio lampante di come possiamo adattarci a un web sempre più dinamico.

Se vuoi approfondire questo approccio, ti invito a esplorare il mio boilerplate open source **[wpacked](https://github.com/enricodeleo/wpacked)**, che rimane una solida base per chi vuole iniziare a lavorare con WordPress in maniera moderna.

Hai provato a creare un sito headless con WordPress e Nuxt3? Parliamone nei commenti o scrivimi [su LinkedIn](https://www.linkedin.com/in/enricodeleo). Sarebbe interessante confrontarci sulle sfide e sulle opportunità che questa architettura porta nel 2024.
