---
title: "Modern Gentlemen's WordPress: Come sviluppare applicazioni WordPress oggi (2016)"
date: "2016-08-26T00:00:00.000Z"
categories:
  - "dev"
tags:
  - "wordpress"
  - "development"
  - "boilerplate"
  - "php"
  - "git"
  - "wpacked"
description: "Una panoramica delle migliori pratiche per lo sviluppo di applicazioni WordPress, basata sul talk presentato al WordPress Meetup di Roma nel 2016."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/modern-gentlemens-wordpress-un-nuovo-approccio-al-web.jpg"
sticky: false
---

_Il 26 agosto 2016 ho presentato al Meetup WordPress di Roma il mio approccio allo sviluppo moderno e professionale di applicazioni WordPress. In questo articolo voglio condividere i punti chiave del mio intervento._

WordPress viene spesso celebrato per la sua installazione semplice e rapida, ma questa stessa caratteristica può indurre a pratiche di sviluppo approssimative. Con il talk *Modern Gentlemen's WordPress*, ho voluto offrire una prospettiva alternativa: un metodo strutturato e scalabile per affrontare progetti WordPress con eleganza e professionalità.

## Perché modernizzare lo sviluppo WordPress?

La "famosa installazione in 5 minuti" non deve essere un pretesto per trascurare la qualità del codice. Al contrario, uno sviluppo professionale richiede:

- **Codice pulito e leggibile:** seguire standard di codifica chiari per facilitare manutenzione e collaborazione.
- **Scalabilità:** strutturare i progetti per supportare futuri sviluppi senza difficoltà.
- **Automazione:** sfruttare strumenti che semplifichino il lavoro manuale.
- **Deploy e gestione:** garantire processi fluidi per il rilascio e l'aggiornamento delle applicazioni.

## Gli strumenti del mestiere

Durante il talk, ho illustrato strumenti e metodologie chiave per elevare lo sviluppo WordPress. Ecco una panoramica:

### Boilerplate professionale: [wPacked](https://github.com/enricodeleo/wpacked)

Il mio boilerplate, *wPacked*, è pensato per fornire una base robusta per progetti WordPress. Esso include:

- **Struttura modulare:** organizza codice e asset in modo coerente.
- **Supporto per Composer:** gestione delle dipendenze semplificata.
- **Compatibilità con moderni strumenti di build:** come Webpack o Gulp per il processing di CSS e JavaScript.

### Versionamento con Git

Git è uno strumento indispensabile per tracciare modifiche, lavorare in team e mantenere un controllo preciso sullo stato del progetto. Consiglio di:

- Utilizzare un `.gitignore` adeguato per escludere file inutili (es. `wp-config.php` o directory di cache).
- Creare branch specifici per ogni funzionalità o bug fix.

### Local Development con Vagrant o Docker

Ambienti di sviluppo locali come Vagrant o Docker permettono di replicare con precisione l'ambiente di produzione, evitando "funziona solo sul mio computer". Questi strumenti garantiscono:

- **Coerenza:** ogni membro del team lavora sullo stesso setup.
- **Portabilità:** facilità di condivisione e replica dell'ambiente.

### Coding Standards

Seguire gli standard ufficiali di WordPress (PHP, CSS, JavaScript) migliora la leggibilità e facilita il lavoro di squadra. Strumenti come [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) possono essere configurati per verificare automaticamente il rispetto degli standard.

### Automazione con Gulp o Webpack

Automatizzare processi come il minifying di CSS/JS, la gestione di immagini o la rigenerazione automatica del browser durante lo sviluppo rende il workflow più efficiente.

## Conclusione

La mia presentazione al Meetup WordPress di Roma aveva l'obiettivo di ispirare sviluppatori e team a vedere WordPress non come un CMS limitato, ma come una piattaforma capace di supportare applicazioni moderne e performanti, purché si adottino le giuste metodologie e strumenti.

Se vuoi approfondire, il boilerplate *wPacked* è disponibile su [GitHub](https://github.com/enricodeleo/wpacked). Fammi sapere cosa ne pensi o se hai suggerimenti nei commenti o sui miei canali social!
