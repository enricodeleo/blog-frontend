---
title: "Il CMS in C che non ho mai scritto"
description: "Nel 2015 avrei potuto scrivere un CMS in C. Ho scelto WordPress. Sei mesi dopo avevo 9.000 signup, app del mese su App Store Italia e 400k raccolti dagli investitori. Team di sviluppo: io."
date: "2026-03-28T10:00:00.000Z"
categories:
  - "Dev"
  - "Startup"
tags:
  - "wordpress"
  - "startup"
  - "engineering"
  - "indie"
  - "build-in-public"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/la-500-che-vinceva.png"
sticky: false
---

_Nel 2015 valevi quanto il linguaggio che usavi. Questa è la storia di come ho ignorato quella regola e cosa è successo dopo._

## La scelta

Nel 2015 ho passato qualche giorno a considerare seriamente di **scrivere un CMS da zero in C**.

Non era follia pura (certo, ci si avvicinava eh). Volendo, avrei avuto le competenze per farlo. Il problema era un altro: nel mondo dev di quegli anni **valevi quanto il linguaggio che usavi**. 
Nella narrativa da _street credibility_ del tempo, più il linguaggio aveva una curva di apprendimento alto e più eri forte. C, di certo, era rispettabilità. PHP o JavaScript roba da pivelli. **WordPress non ne parliamo proprio**.

Poi ho detto: _naaaaaaaaaaaaah_.

Dovevo costruire una piattaforma per la vendita di fumetti digitali. Utenti, contenuti, pagamenti, file protetti da download. Da solo, con poco budget che volevo però destinato a fornire a me e il mio socio non-tech un posto in cui dormire
e coprire le spese necessarie a portare i primi contratti. Deadline vita o morte: 6 mesi per partecipare a un investor day presentando non solo l'app ma già dei risultati contati per numero di utenti.

**Ho preso WordPress e l'ho piegato a quello che mi serviva.**

Non perché fosse la scelta più figa. Ma perché **conoscevo quella codebase a memoria**. Sapevo come si comportava sotto carico, dove tendeva a rompersi, come estenderla. E soprattutto sapevo dove guardare quando qualcosa andava storto alle 2 di notte — cosa che succede sempre, invariabilmente, al momento peggiore.

Un CMS in C avrei ancora finito di scriverlo adesso.

## Quello che è uscito fuori

In sei mesi, team di sviluppo, UI, UX, DevOps composto da... **soltanto me**:

- Backend della piattaforma
- API REST per l'app mobile
- App iOS 
- Sistema di cifratura a chiave asincrona per la protezione dei file, **registrato SIAE**
- Infrastruttura su due macchine sincronizzate con load balancer, gestita con Ansible
- HHVM per la compilazione jit di php, visto che certo PHP 8 non esisteva ancora

Il back office era "gratis", e il solito WordPress che tutti gli interni sapevano già usare. Praticamente zero onboarding: lo usava chiunque dovesse usarlo, senza aprire un ticket.

Prima settimana dal lancio: 9.000 signup. **app del mese su App Store Italia**. 400k raccolti dagli investitori.

---
---

## Il punto

C'è una differenza tra **non conoscere le alternative** e **conoscerle tutte e scegliere quella che funziona** nel contesto e coi vincoli reali.

Il rischio non è "devo imparare la sintassi" o "l'eleganza della soluzione". È che **non conosci ancora i failure mode**.

È come scegliere tra andare in gara con una 500 che guidi da 10 anni — sai che la terza gratta un po', quanti newton applicare allo sterzo, come frena sul bagnato — oppure con un veicolo di ultima generazione che si pilota usando il **pronzione**.

**Tu dirai: ma che è il pronzione?**

**Esatto.**

Ed è proprio questo il problema. Con lo stack nuovo stai debuggando nel buio alle 2 di notte qualcosa per cui non hai ancora un nome.

Il CMS in C sarebbe stato figo da raccontare ai meetup.

**I 9.000 signup erano meglio.**
