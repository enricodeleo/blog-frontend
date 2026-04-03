---
title: "Velocità senza giudizio"
description: "Il vibe coding non ha inventato il codice scritto male. Ha solo tolto l'attrito. E la velocità, senza il tempo di valutare, produce solo errori più rapidi."
date: "2026-04-03T10:00:00.000Z"
categories:
  - "Dev"
  - "AI"
tags:
  - "ai"
  - "vibe-coding"
  - "engineering"
  - "build-in-public"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/velocita-senza-giudizio.png"
sticky: false
---

_Il vibe coding non ha inventato il codice scritto male. Ha solo tolto l'attrito._

Ho visto un backend con l'autenticazione hardcodata nel frontend. Password admin in chiaro, visibile a chiunque aprisse DevTools. Non era vibe coding — era 2018, dev umani, trovati su Upwork. Ve lo dico perché quello che sta succedendo adesso non è una novità. È la stessa roba, più veloce.

Ho visto Google Sheets usato come database. Collassava a quattro utenti. I fondatori si sono sorpresi.

Ho visto funzionalità dichiarate implementate che erano solo API vuote senza niente dietro. L'ho visto fare a dev umani. L'ho visto fare a Claude Opus 4.6, che in questo momento è il modello più capace di Anthropic. Ho visto test scritti per passare, non per verificare. Un sistema che si auto-certifica è più pericoloso di uno che fallisce apertamente.

Il problema non è l'AI. È l'assenza di chi sa cosa sta guardando. E il tempo di guardare.

## La trappola della velocità

C'è qualcosa di specifico nell'AI che peggiora il problema: il codice che produce **sembra sempre perfetto**. È scritto bene, ben nominato, ha i commenti nei posti giusti. Proietta un'aura di correttezza che disarma il senso critico anche di chi dovrebbe sapere meglio.

In pochi minuti hai davanti qualcosa che sembra un sistema completo. Funziona in dev. I test passano. La demo è bella.

Ed è esattamente lì che si annida il problema.

Quello che l'AI ha prodotto in pochi minuti è un modello della realtà. Una sua interpretazione del problema che le hai posto. Veloce, coerente internamente, convincente. Ma quel modello rispecchia davvero la logica che volevi perseguire? Risolve davvero il problema che ti eri posto? O risolve il problema che l'AI ha capito — che è una cosa diversa, spesso sottilmente diversa, a volte completamente diversa?

La velocità non ti dà il tempo di scoprirlo.

## Let it sink

Nei sistemi complessi esiste un concetto che ogni ingegnere senior conosce bene: il tempo di valutazione. Non è il tempo di scrittura, non è il tempo di test. È il tempo che ti serve per capire se quello che hai costruito rispecchia davvero il modello mentale che avevi in testa quando hai iniziato.

Con l'AI quel tempo non sparisce. Sparisce l'illusione che non serva.

Ogni tanto bisogna fermarsi. Lasciare che la soluzione prodotta sedimenti. Tornarci con occhi freschi e chiedersi: questo è davvero quello che volevo? La logica che ho in testa si riconosce in quello che vedo? I casi limite che conosco del dominio sono gestiti, o l'AI li ha ignorati perché non glieli ho dati?

Questo non è un invito alla lentezza. È un invito alla lucidità.

## Il costo invisibile

Con un esperto che non conosce una tecnologia, l'incertezza è visibile. Si ferma. Dice "non sono sicuro". Studia.

Con chi usa l'AI senza il tempo di valutare, l'incertezza sparisce dalla superficie. Il codice c'è. Compila. Sembra professionale. Va in produzione.

E poi: un indice mancante che non si nota finché la tabella non cresce. Un'architettura che non regge il caso d'uso successivo. Logica di business nel posto sbagliato. Gestione degli errori assente. Decisioni prese dall'AI per default che non erano le tue decisioni — ma ora sono nel codice, e il codice è in produzione.

Questi problemi non sono nuovi. La differenza è la velocità di accumulo. Con l'AI un non esperto produce in una settimana quello che prima richiedeva mesi. Il debito tecnico si accumula alla stessa velocità.

Il conto arriverà. Lo pagherà chi verrà dopo a mettere mano a quel progetto. O l'utente finale, con i suoi dati.

## La velocità è un mezzo, non un fine

L'AI nello sviluppo è una cosa straordinaria. La uso ogni giorno.

Ma la velocità è un mezzo. Il fine è costruire qualcosa che funziona, che regge, che rispecchia la logica che avevi in testa quando hai iniziato. Se la velocità ti impedisce di verificare che questo sia vero, non stai andando più veloce — stai solo accumulando problemi più in fretta.

Il vibe coding funziona meglio quando sei abbastanza bravo da sapere quando fermarti.
