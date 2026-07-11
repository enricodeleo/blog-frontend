---
title: "L'interfaccia che non si vede"
description: "Un porting non è una traduzione. È un esercizio di scoperta su cosa, in un sistema, è davvero il contratto. Quasi sempre non è quello che pensi."
date: "2026-06-07T10:00:00.000Z"
categories:
  - "dev"
  - "open-source"
tags:
  - "rust"
  - "bullmq"
  - "open-source"
  - "porting"
  - "engineering"
translation: "/en/a-port-is-not-a-translation"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/linterfaccia-che-non-si-vede.png"
sticky: false
---

_Un porting non è una traduzione. È un esercizio di scoperta su cosa, in un sistema, è davvero il contratto. Quasi sempre non è quello che pensi._

_(Also available in English: [A port is not a translation](/en/a-port-is-not-a-translation).)_

Qualche giorno fa è stato mergiato in upstream un PR che ho aperto su `bullmq-rs`, il porting Rust di BullMQ. Il diff è grosso — circa undicimila righe in più, duemila in meno — ed esce come release v2.0.0 breaking.

Quando ho riletto la description del PR a cose fatte, mi sono accorto che la sezione più informativa non era quella di cosa il PR includeva. Era quella di **cosa avevo deliberatamente lasciato fuori**.

È l'unica cosa per cui valga la pena scriverci sopra.

## Cos'è successo

BullMQ è una libreria Node per code distribuite sopra Redis. È diffusa, ha un ecosistema consolidato attorno — Bull Board, dashboard, monitoring — e ha una specifica di fatto su come i dati sono strutturati dentro Redis. Non c'è uno standard formale: c'è il codice della libreria, e c'è il comportamento che il tooling esterno si aspetta di osservare.

`bullmq-rs` è il porting Rust. L'idea è semplice: chi vuole worker in Rust dovrebbe poter scrivere worker in Rust senza dover rifare l'infrastruttura attorno. La dashboard resta quella. I job creati da Node sono leggibili da Rust, e viceversa. Le metriche continuano a funzionare. Si può migrare un servizio per volta senza spegnere il resto.

Quando il porting esisteva nella versione precedente, l'API Rust si era avvicinata a quella di BullMQ ma il **wire format** — la struttura esatta dei dati che finiscono su Redis — era divergente in modi sottili. Liste dove dovevano esserci sorted set. Campi degli hash con nomi diversi. Eventi sullo stream con payload diverso da quello che il tooling Node si aspetta di leggere.

Risultato concreto: il tooling esterno non funzionava. Bull Board non vedeva le code create da Rust. Un worker Node sulla stessa coda di un worker Rust non vedeva i job dell'altro.

L'API Rust era pulita. Quello che usciva da Redis era un'altra cosa.

## Lo scenario per cui serve

Per essere concreti, lo scenario tipico è questo.

Hai un sistema Node con BullMQ in produzione. Funziona. Bull Board ti mostra le code, gli alert sono cablati, l'SRE sa dove guardare quando qualcosa fuma di notte.

A un certo punto un tipo di job smette di reggere. Encoding di video. Image processing. Una pipeline CPU-bound. Il worker Node fa quello che può, ma il throughput non basta più. Vorresti riscrivere _solo quel worker_ in Rust, lasciando il resto dell'infrastruttura dov'è.

Senza wire compatibility, le opzioni sono due. Riscrivere tutto in Rust e perdere il tooling Node. Oppure tenere un layer di traduzione tra i due e portarsi dietro la complessità di mantenerlo allineato a ogni release di BullMQ.

Con wire compatibility, c'è una terza opzione. Lo stesso job prodotto da un producer Node viene processato da un worker Rust. La dashboard non sa che la stanno chiamando da due runtime diversi. Le metriche non cambiano forma. L'SRE che riceve la pagine alle tre vede le stesse cose che vedeva prima.

C'è anche una proprietà che in Rust emerge naturalmente e in Node non esiste: il payload del job è tipizzato. Scrivi `Job<EncodingTask>` e il worker riceve la `EncodingTask` già deserializzata, controllata a compile time. Se cambi lo schema, il compilatore ti ferma prima del deploy. Per i job dove la correttezza del payload conta davvero — pagamenti, side effect costosi, transizioni di stato critiche — è una garanzia concreta, non un dettaglio estetico.

Non è un caso d'uso da keynote. È uno di quelli che fa la differenza dopo il deploy.

## Hyrum's Law applicata al porting

C'è una formulazione attribuita a Hyrum Wright, che ha lavorato a lungo in Google sul tooling di refactor su larga scala:

> _With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody._

In italiano stretto: con abbastanza utenti, **non conta cosa dici di promettere**. Conta tutto quello che il sistema fa, comprese le parti che non avresti scelto di promettere. Qualcuno, da qualche parte, si è appoggiato a ognuna di quelle.

In un porting, questa frase ha un corollario molto preciso: l'interfaccia vera del sistema che stai portando **non è la sua API**. È l'insieme dei comportamenti osservabili dall'esterno — strutture dati, formati di serializzazione, side effect, ordine degli eventi — su cui qualcun altro, fuori dal sistema, si è appoggiato per far funzionare le sue cose.

Per BullMQ quell'interfaccia è il layout su Redis. Non la signature di una funzione. La forma esatta di un hash, di una sorted set, di una entry su uno stream.

Quando porti un sistema così, le scelte si dividono in due categorie:

1. **Quello che non puoi cambiare** — il wire format. Cambiarlo significa rompere ogni cosa che ci sta sopra senza che il chiamante se ne accorga, fino al prossimo deploy in cui scopre che la dashboard è vuota o che mancano metà dei job.
2. **Quello che puoi cambiare** — l'API del linguaggio di destinazione. È libera. Nessuno la sta osservando dall'esterno.

Confondere le due categorie è il modo più sicuro di fare un porting che _sembra finito_ e non lo è.

## Cosa il PR ha messo dentro

La prima parte del lavoro è stata appiattire il wire format sotto quello di BullMQ v5:

- liste per `wait`, `active`, `paused`
- sorted set per `prioritized`, `delayed`, `completed`, `failed`, `waiting-children`, `marker`
- hash per i metadati
- stream per gli eventi
- campi degli hash dei job con gli stessi nomi e gli stessi formati di Node (`atm`, `ats`, `processedOn`, `pb`, `opts` JSON-encoded)

Sopra, il porting degli script Lua atomici che BullMQ usa per le transizioni di stato. Una transizione di un job — da `wait` ad `active`, da `active` a `completed`, dal recovery di un job stallato — non si può implementare come sequenza di comandi Redis. Deve essere atomica, e BullMQ ottiene l'atomicità delegando a Lua. Riscriverle a mano in Rust significherebbe inventare race condition che il codice originale non ha. Quindi si portano, riga per riga, e si verifica che il comportamento osservato sia identico.

Sopra ancora c'è il runtime: marker-based loop con `BZPOPMIN`, lock con token e TTL, recovery dei job stallati, fast-path per il `moveToFinished`, fix del prefetch perché i job non rimangano orfani in `active` quando un worker si chiude in modo non pulito.

Sopra ancora le API Rust: Queue, Job, QueueEvents, FlowProducer con parent/child cross-queue.

Tutto questo è abbastanza per usarlo in produzione, e abbastanza perché parli con un cluster Node esistente senza traduzioni intermedie.

## Cosa il PR ha deliberatamente lasciato fuori

Una lista, nel corpo del PR:

- niente `JobScheduler` (i job ripetibili tipo cron)
- niente bulk sulle Queue (`addBulk`, `clean`, `obliterate`, `retryJobs`, `promoteJobs`)
- niente pause/resume lato Worker (sulla Queue sì)
- niente rate limiting
- niente deduplica
- niente debounce
- niente metriche

Sono tutte cose che BullMQ ha. Sono tutte cose che andranno aggiunte.

Ma non in questo PR.

## Perché

Perché un porting che prova a fare tutto in un colpo solo finisce in due modi: o non viene mai mergiato, o viene mergiato con compromessi nascosti.

I compromessi nascosti sono quelli che non vedi nella description ma sono nel codice. Convenzioni inventate dove la spec non era chiara. Edge case lasciati indietro perché stancavano. Comportamenti che divergono in silenzio da quelli del sistema originale e che si scoprono mesi dopo, quando un utente segnala che _"con Node funziona, con Rust no"_.

È il debito _accidentale_ di Cunningham — quello che accumuli senza saperlo, perché non hai capito abbastanza bene il problema. Non puoi quantificarlo. Non puoi ripagarlo. Non sai nemmeno dove sia.

Il modo per evitarlo, in un porting, è invertire l'istinto: **dichiarare per primo quello che non stai facendo**.

Non in fondo al PR, in piccolo. Nella description, in una sezione dedicata, con i nomi precisi delle API e dei comportamenti che mancano. Pubblicamente, prima ancora che qualcuno chieda.

Questo trasforma la stessa identica situazione — _"una libreria con feature mancanti"_ — da debito accidentale in **debito deliberato**: lo strumento legittimo di cui Cunningham parlava davvero. So cosa manca. È scritto. È tracciato. Il prossimo PR sa dove deve atterrare. Chi usa la libreria sa cosa può aspettarsi e cosa no.

> Il debito deliberato è uno strumento di scope. Il debito accidentale è scope che ti gestisce.

## La tentazione di portare tutto

C'è una tentazione precisa, in qualunque porting o reimplementazione, ed è la stessa che la velocità di produzione dell'AI rende più facile da assecondare: provare a fare _tutto_ in un colpo solo, perché tecnicamente si potrebbe.

Il sistema originale ha cento feature. Il porting può imitarle tutte. Le LOC scalano. Il PR si gonfia. La review diventa impossibile. Le scelte sulle parti che non hai capito davvero finiscono per essere prese per default — dal codice generato, da analogie con altri sistemi, da quello che sembrava ragionevole alle tre di notte.

E quando quel PR viene mergiato, il sistema risultante ha un'estensione paragonabile all'originale ma una superficie di bug che nessuno ha mappato. _Sembra_ completo. E come ho scritto altrove, _sembra completo_ ed _è corretto_ non sono mai stati la stessa cosa.

L'alternativa è meno glamour. Portare prima ciò che è strutturale — il wire format, il runtime, gli atomi — e poi aggiungere superficie un pezzo alla volta, additivamente, scrivendo nero su bianco cosa manca ancora e perché.

Niente dimostra qualcosa nel portare di più. Qualcosa si perde quasi sempre nel portare senza dichiarare cosa è dentro e cosa è fuori.

## L'interfaccia che non si vede

Vale anche fuori dai porting.

In quasi tutti i sistemi che condividono stato con qualcosa di esterno — un'altra applicazione, un altro team, un altro runtime, un altro linguaggio — l'interfaccia che conta davvero non è quella che vedi nella signature di una funzione. È quella che attraversa il confine. Un payload JSON. Una riga di una tabella. Un evento su una stream.

È quella che il chiamante osserva. È quella che, se cambia in silenzio, rompe le cose lontano da dove l'hai cambiata, in un orario in cui non sei davanti allo schermo.

Quando lavori dentro un sistema chiuso, hai il lusso di poter rinominare, ristrutturare, refattorizzare a piacere. Quando il sistema ha un confine osservato da qualcun altro, quel lusso scompare. **L'API del linguaggio è effimera. Il contratto reale è quello che passa attraverso il confine.**

Per il porting di BullMQ quel confine era Redis. Una volta che il confine è giusto, tutto il resto è additivo. Se il confine è sbagliato, ogni feature aggiunta sopra è una bugia in più da mantenere.

E le bugie nei sistemi non scadono. Aspettano.

## Riferimenti

- PR mergiato: [bogardt/bullmq-rs#3](https://github.com/bogardt/bullmq-rs/pull/3)
- Issue di partenza: [bogardt/bullmq-rs#2](https://github.com/bogardt/bullmq-rs/issues/2)

_Il porting più onesto è quello che dichiara per primo cosa non sta portando._
