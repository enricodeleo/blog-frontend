---
title: "Email promozionali performanti con Emailurgency"
date: "2018-07-04T15:15:28.000Z"
categories:
  - "digital-life"
tags:
  - "campagne"
  - "dem"
  - "free"
  - "mail"
  - "mailchimp"
  - "marketing"
  - "software-as-a-service"
  - "tools"
description: ""
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/emailurgency-mailchimp-cover.jpg"
sticky: true
---

Negli anni credo di aver inviato qualche milioncino di email promozionali per conto mio o dei miei clienti e mi sono reso conto che praticamente in tutte (ecco la scoperta dell'acqua calda) il miglior modo per ottenere risultati è quello di **spingere il più possibile la call to action**.

Questo vuol dire le solite cose:

- call to action chiara e ben visibile
- presenza di una offerta
- grafica semplice e gradevole
- **limite entro cui l'utente dovrà agire**

Quest'ultimo punto è tanto banalmente logico quanto spesso sottovalutato. Ricevo spesso email promozionali (conosciute come DEM o _direct email marketing_) dove mi si propone un certo sconto ad esempio, il cui codice o il link per procedere all'acquisto è riportato tra le minuscole note a pié di pagina.

**Niente di più sbagliato**.

Questo per due motivi: il primo che a parte me ed altri pochi addetti ai lavori nessun utente scrollerà tutta la mail e leggerà con attenzione le note in carattere grigio medio da 8px, ed in secondo luogo perché statisticamente un buon numero di clienti potenzialmente interessati penserà "bello, magari più tadi ne approfitto". Chiuderà la mail, scenderà dal bus, entrerà in ufficio dove scambierà un'altra miriade di email e... Nulla, fine della storia e cliente perso.

## CTA, CTA, CTA

Allora come creiamo una mail promozionale che abbia una **_call to action_** degna di questo nome? La risposta è una: rendere chiaro all'utente che **dovrà agire subito e dargli qualcosa su cui cliccare.**

![](https://enricodeleo.s3.eu-south-1.amazonaws.com/images/5b3b98622fa5b295c5069944.gif)

## La tua offerta scade in 3,2,1

![Emailurgency preview](https://enricodeleo.s3.eu-south-1.amazonaws.com/images/preview.png)

Quando mi sono imbattuto in un [caso studio di Adestra](https://www.adestra.com/resources/dynamic-email-content-leads-to-400-increase-in-conversions-for-black-friday-email/) che dimostrava come la presenza di **contenuti animati nelle email promozionali** può **migliorare le prestazioni delle promozioni del 400%** mi sono reso conto che avrei potuto mettere a sistema questa informazione con i ragionamenti di cui sopra creando **una animazione che spingesse al massimo la cta con un conto alla rovescia**.

Ovviamente creare una semplice gif ed allegarla all'email non era sufficiente: l'utente si sarebbe ben presto reso conto che il conto alla rovescia era finto. Ci voleva allora un po' di buon vecchio coding!

Ho creato dapprima un piccolo servizio web che potevo usare al posto dell'indirizzo di una immagine. Il quale, con l'utilizzo di particolari parametri e con la giusta fantasia, generava un **conto alla rovescia animato, reale e corretto al minuto secondo**. Ma ovviamente non mi bastava.

## Emailurgency

Dopo aver utilizzato per qualche tempo quello che considero un MVP ho avuto esigenza di dare la possibilità ad altri di creare autonomamente le animazioni (ero il solo a conoscere e padroneggiare tutti i diversi parametri del servizio e prevenire i difetti di quella implementazione), magari con pià opzioni visive e funzionalità.

Avevo voglia di mettere le mani su un po' di tecnolgie fresche e creare un SaaS in grado di generare istantaneamente una immagine animata con un **conto alla rovescia** stilizzato secondo le esigenze grafiche dell'una o dell'altra email: è nato [**Emailurgency**](https://emailurgency.com).

Emailurgency è il frutto dell'esperienza accumulata attraverso l'utilizzo di quel primo servizio privato reso adesso alla portata di tutti. Ho riscritto il software per scalare via via con l'aumento dell'adozione da parte di più utenti ed in particolare ho creato una interfaccia (realizzata con il mio nuovo amore **Vue.js**) grafica flessibile per il design veloce e preciso dei countdown.

I countdown generati sono compatibili e testate con tutte le maggiori piattaforme di invio email come **MailChimp, MailJet, MailUp, SendGrid e SendInBlue**.

https://www.youtube.com/watch?v=U0OxqcMM85Y

## A partire da... Gratis

Emailurgency ha un piano gratutito con alcuni limiti senza scadenza, opinioni?
