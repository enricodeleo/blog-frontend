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

Ho visto un backend con l'autenticazione hardcodata nel frontend. Password admin in chiaro, visibile a chiunque aprisse DevTools. Non era vibe coding — era 2018, dev umani, trovati su Upwork.

Ve lo dico perché quello che sta succedendo adesso **non è una novità**. È la stessa roba, più veloce.

Ho visto Google Sheets usato come database. Collassava a quattro utenti. I fondatori si sono sorpresi.

Ho visto funzionalità dichiarate implementate che erano solo API vuote senza niente dietro. L'ho visto fare a dev umani. L'ho visto fare a Claude Opus 4.6, che in questo momento è il modello più capace di Anthropic. Ho visto test scritti per passare, non per verificare.

> Un sistema che si auto-certifica è più pericoloso di uno che fallisce apertamente.

Il problema non è l'AI. È che la velocità che offre può farti dimenticare che costruire software è **fondamentalmente un atto cognitivo** — non di scrittura.

## Il software non è testo

Questa è la cosa che l'entusiasmo attorno al vibe coding dimentica sistematicamente.

Il software non è testo. È un **modello formale della realtà** — un sistema di regole che descrive come un dominio si comporta, come gli stati cambiano, come le eccezioni vengono gestite, come il tempo e la concorrenza e il fallimento vengono trattati.

Scrivere codice non è mai stato il problema difficile. Il problema difficile è capire _cosa_ scrivere — e _perché_. È identificare i confini del dominio, le invarianti che devono reggere, i casi limite che il business non ti ha detto perché non sapeva di doverlo fare, le implicazioni che una scelta architetturale avrà tra sei mesi quando i requisiti cambieranno — **perché cambiano sempre**.

Questa comprensione non si ottiene velocemente. Si ottiene attraverso iterazioni, conversazioni, errori, correzioni, notti a chiedersi perché quella cosa non funziona come dovrebbe. È quella che Michael Polanyi chiamava _conoscenza tacita_ — sapere che non si riesce a trasferire completamente in parole, che risiede nell'esperienza accumulata, nei pattern riconosciuti, nelle intuizioni costruite su decine di progetti.

**L'AI non ha questa conoscenza.** Ha la media statistica di quello che è stato scritto su internet riguardo a problemi simili al tuo.

Che non è la stessa cosa.

## La trappola della perfezione apparente

C'è qualcosa di specifico nell'AI che aggrava tutto questo: **il codice che produce sembra sempre scritto bene**.

È ben nominato, ha i commenti nei posti giusti, segue le convenzioni, usa i pattern corretti. Non sembra il codice di qualcuno che non sa quello che fa — sembra il codice di qualcuno che sa _esattamente_ quello che fa.

Questo è il problema.

Il codice sbagliato scritto male ti ferma. Lo vedi, lo senti, ti insospettisce. Attiva il tuo senso critico prima ancora che tu abbia capito cosa fa. Il **codice sbagliato scritto bene** attraversa la code review senza attivare nessun campanello d'allarme, supera i test, va in produzione. E quando si rompe — _perché si rompe_ — la forma corretta del codice rende ancora più difficile localizzare il problema concettuale che ci sta sotto.

Stai cercando un bug in codice che non sembra buggy. Stai cercando un'assunzione sbagliata in codice che sembra ragionevole.

Nel 1986 Fred Brooks scriveva che la difficoltà essenziale del software non è accidentale — non riguarda la sintassi, i compilatori, la velocità di scrittura. Riguarda la **complessità concettuale intrinseca** dei sistemi che costruiamo. Quarant'anni dopo, l'AI ha eliminato quasi completamente la difficoltà accidentale. Quella essenziale è rimasta intatta.

> _"No silver bullet."_
> — Fred Brooks, 1986

E ora che la difficoltà accidentale è sparita, la difficoltà essenziale è più esposta che mai. Ma è anche più facile da non vedere, perché l'output che la nasconde sembra così convincente.

## Il modello della realtà

Quando chiedi all'AI di costruire qualcosa, quello che ricevi non è una soluzione.

È una **interpretazione** del problema che hai descritto.

L'AI costruisce un modello della realtà basato su quello che gli hai detto — e quello che gli hai detto è inevitabilmente incompleto, perché la conoscenza del dominio che hai in testa non si trasferisce per intero in un prompt. Il gap tra il problema che hai _in testa_ e il problema che l'AI ha _capito_ è sempre presente. A volte è trascurabile. A volte è la differenza tra un sistema che regge e uno che collassa al primo caso limite reale.

La velocità non ti dà il tempo di misurare quel gap. Peggio: la velocità e la perfezione apparente dell'output creano attivamente l'illusione che il gap non esista.

Questo è il motivo per cui **"funziona" non è mai abbastanza** come criterio di accettazione.

_Funziona rispetto a cosa?_

Rispetto ai test che l'AI ha scritto per passare — costruiti attorno agli stessi casi che aveva in testa quando ha scritto il codice, in un loop chiuso che non include nessuna realtà esterna? Rispetto alla demo con dati puliti e percorsi felici? O rispetto alla logica reale del dominio, con tutti i casi limite che solo tu conosci perché ci hai lavorato dentro?

Salvatore Sanfilippo ha sollevato un problema analogo sulla code review: lo stato mentale di chi scrive non è trasferibile al reviewer. Il reviewer vede il testo, non il ragionamento che ha prodotto quel testo. O puntualizza cose superficiali, oppure non comprende abbastanza da vedere il problema vero.

Con l'AI il problema si radicalizza: **l'AI non ha stato mentale da trasferire**. Ha prodotto output ottimizzando per la coerenza interna del testo, non per la corrispondenza con la tua realtà. Il reviewer — che sei tu — deve colmare quel gap da solo. Se non ti fermi a farlo, nessuno lo farà.

## Let it sink

C'è una pratica che ogni ingegnere con abbastanza cicatrici ha interiorizzato: dormirci sopra.

Non per pigrizia. Per necessità cognitiva.

Il cervello umano non elabora i problemi complessi in modo lineare e sequenziale. Elabora in parallelo, spesso al di sotto della soglia della coscienza. È per questo che le soluzioni migliori arrivano sotto la doccia, in macchina, la mattina appena svegli — non davanti allo schermo quando stai cercando attivamente la risposta. I problemi che non vedi nel momento emergono dopo, quando torni con occhi freschi e il cervello ha avuto il tempo di connettere pattern che la concentrazione attiva non riesce a vedere.

Non è misticismo. È neuroscienze. La modalità diffusa del cervello è essenziale per l'insight, per la comprensione profonda, per accorgersi delle incongruenze che la modalità focalizzata salta perché è troppo dentro il problema.

Con l'AI quella pratica diventa ancora più importante, e ancora più facile da saltare. Perché in pochi minuti hai davanti qualcosa che sembra completo. L'effort che hai speso è minimo, quindi la sensazione di investimento è bassa, quindi la soglia per dichiararlo fatto si abbassa. **Non hai faticato per arrivare lì, quindi non senti il bisogno di proteggerti dall'errore di aver faticato invano.**

Ma "sembra completo" e "è corretto" sono due cose diverse — e la velocità di produzione dell'AI ha reso quella distinzione più sottile che mai.

> Fermarsi non è perdere il vantaggio della velocità. È il momento in cui verifichi che quella velocità ti abbia portato nella direzione giusta.

Senza quel momento, stai solo andando veloce verso il posto sbagliato — e ci arrivi prima.

## La code review non basta

La risposta istintiva a tutto questo è: _"per questo c'è la code review"_.

Ma la code review, così come è praticata nella maggior parte dei team, non risolve il problema che stiamo descrivendo.

La code review tradizionale è ottima per trovare bug sintattici, violazioni di convenzioni, problemi di sicurezza ovvi. È molto meno efficace per valutare se le **decisioni architetturali sono corrette**, se il modello del dominio rispecchia la realtà, se le assunzioni implicite nel codice sono valide.

Con l'AI il problema si amplifica: il codice generato è sintatticamente inattaccabile. Il reviewer scorre, non trova niente che attivi i campanelli d'allarme standard, approva. Il problema concettuale che stava sotto passa indisturbato.

La code review utile in questo contesto non è _"questo codice è scritto bene?"_ — quella risposta è quasi sempre sì. È _"questo codice fa quello che dovrebbe fare nel contesto del dominio reale?"_ — e per rispondere devi avere la conoscenza del dominio che l'AI non ha, devi aver capito i requisiti abbastanza da sapere cosa verificare, devi aver lasciato che la soluzione sedimentasse abbastanza da poterla vedere con distacco critico.

## Il debito che non vedi

Il debito tecnico generato senza giudizio ha una caratteristica precisa: **è silenzioso**.

Non si manifesta subito. Si accumula in decisioni prese per default dall'AI che non erano le tue decisioni — ma ora sono nel codice, e il codice è in produzione. In architetture che reggono il caso d'uso che hai descritto ma non quello successivo. In assunzioni implicite che l'AI ha fatto riempiendo i gap del tuo prompt con la media di quello che ha visto in training.

Ward Cunningham, che il termine "debito tecnico" lo ha inventato, intendeva qualcosa di specifico: il debito _deliberato_, contratto consapevolmente per andare più veloci ora con l'intenzione di ripagarlo dopo. Non il debito _accidentale_, quello che accumuli senza saperlo perché non hai capito abbastanza bene il problema.

**Il debito deliberato è uno strumento legittimo. Il debito accidentale è ignoranza capitalizzata.**

Il vibe coding senza giudizio produce quasi esclusivamente debito accidentale. Perché la velocità impedisce la comprensione, e senza comprensione non puoi nemmeno scegliere consapevolmente di indebitarti — ti indebiti e basta, senza saperlo, senza poterlo quantificare, senza un piano per ripagarlo.

E quando emerge, emerge nel momento peggiore. Quando c'è trazione. Quando ci sono utenti reali. Quando il costo di sistemare è un ordine di grandezza superiore a quello che sarebbe stato all'inizio.

> Il conto arriva sempre. La velocità determina solo quanto in fretta lo accumuli.

## La velocità è un mezzo

L'AI nello sviluppo è straordinaria. La uso ogni giorno.

Ma la velocità non è il fine — è un mezzo. Il fine è costruire qualcosa che **rispecchi la logica che avevi in testa**, che regga i casi limite del dominio reale, che qualcuno possa capire e modificare tra un anno senza maledire chi lo ha scritto.

Se la velocità ti impedisce di verificare che questo sia vero, non stai andando più veloce. Stai solo sbagliando più in fretta. Con più righe di codice. Con più fiducia. Con meno possibilità di accorgertene prima che diventi costoso.

La differenza tra un ingegnere che usa l'AI bene e uno che la usa male non è tecnica. **È cognitiva.** È la capacità di fermarsi, lasciare che le cose sedimentino, tornare con distacco critico e chiedersi: questo rispecchia davvero quello che volevo? O sto guardando qualcosa che _sembra_ quello che volevo?

Sono domande scomode da fare quando hai appena passato un pomeriggio produttivo e lo schermo è pieno di codice nuovo e i test passano.

_Falle lo stesso._
