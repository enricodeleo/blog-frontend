---
title: "La storia si ripete"
description: "Nel 2015 i graph database erano il futuro. Oggi uso Postgres per quasi tutto. Nel mezzo: MongoDB, ObjectId misti, e il solito conto arrivato dopo. Sta succedendo di nuovo con i vector database."
date: "2026-03-30T10:00:00.000Z"
categories:
  - "Dev"
tags:
  - "postgres"
  - "database"
  - "engineering"
  - "tech-debt"
  - "build-in-public"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/la-storia-si-ripete.png"
sticky: false
---

_Graph database, MongoDB, vector database dedicati. Il pattern è sempre lo stesso. Solo i nomi cambiano._

Nel [post precedente](/il-cms-in-c-che-non-ho-mai-scritto) ho raccontato di come nel 2015 ho scelto "il solito" WordPress per creare una piattaforma usata da decine di migliaia di persone. Ma c'è un'altra storia di quegli anni che vale la pena raccontare.

## 2015: i graph database erano il futuro, noSQL il presente

Ogni conferenza, ogni blog post, ogni dev entusiasta. "Le foreign key non scalano. I join sono roba vecchia. Il mondo è fatto di connessioni." Neo4j, Cypher, slide piene di nodi colorati e frecce.

Sullo stesso tono di guerra ai classici relazionali, le milioni di persone che si sono riversata su una unica combo, che quasi faceva da sinonimo a startup: nodejs + mongodb.

Partecipavo spesso a demo day tecnici dove CTO di altre startup raccontavano come stavano impostando la loro tecnologia. 
Ricordo ancora uno ha esordire, appunto, con il classico dell'epoca: "useremo node in accoppiata con mongo!". 
Poi ha iniziato a descrivere il dominio: _"la relazione con"_, _"la relazione di"_, _"questo è collegato a quello tramite quell'altro"_.

Ho detto: **"Che follia sarebbe stata salvare le relazioni in un db... relazionale, vero?"**

Oggi uso Postgres per quasi tutto. Quando mi serve qualcosa in più pesco a piene mani da estensioni per lo stesso : pgvector per i vettori, timescale per time series, pg_textsearch per full text con ranking.

Graph database: zero.

## Cosa è successo

Niente di drammatico. **Postgres è andato avanti.**

Recursive CTE, jsonb, estensioni per tutto. Ha cannibalizzato il 90% dei casi d'uso senza aggiungere un componente infrastrutturale in più da mantenere, sincronizzare, monitorare e pagare. 
Il costo operativo di un grafo dedicato non è banale: lo sharding è complicato, e il modello mentale è diverso da quello relazionale che la maggior parte degli sviluppatori ha già interiorizzato.

Risultato: ottimo strumento per nicchie specifiche — fraud detection su scala enterprise, knowledge graph in grandi organizzazioni. Per il 95% dei progetti: **overkill**.

## La stessa storia, prima

Prima dei graph database c'era stato MongoDB.

_"I join non scalano"_ — ripetuto come un mantra da chi non aveva mai avuto problemi di scala. 
Due anni dopo: array di userId dentro il documento ordine, ma alcuni stringhe, alcuni numeri altri ObjectId e manca il 3% dei riferimenti, e nessuno sa perché.

MongoDB era genuinamente utile per alcuni casi d'uso e anch'io l'ho usato tantissimo (più frequentemento a fianco anziché in sostituzione). 
Il problema era che veniva usato per tutto, perché era nuovo, perché era cool, perché usarlo sembrava una scelta moderna.

## Il pattern è sempre lo stesso

1. Tecnologia nuova risolve problemi reali in casi specifici
2. Viene presentata con casi d'uso di aziende con scala che il 99% dei team non avrà mai
3. Viene adottata come soluzione generale
4. Chi usa la tecnologia "noiosa" sembra un fossile
5. Arriva il momento dei conti
6. La tecnologia noiosa è ancora lì, qualcuno propone un refactor "per irrobustire" (leggasi tornare a schemi e contratti solidi), che durerà un anno.

C'è un concetto che si chiama **Lindy Effect**: una tecnologia che esiste da vent'anni probabilmente esisterà altri vent'anni. 

Ve lo dice uno che è smanettone e enthusiast dalla nascita: conoscere tutto, sperimentare tutto, ma in produzione... Dipende.

Il nostro mestiere è **identificare contesti in cui è necessario operare scelte "a mestiere"** anche considerando aree di rischio come il supporto sul lungo periodo, 
la reperibilità (e dunque i costi) di risorse schillate in quella tecnologia col crescere del team, trasferimento di competenze, disponibilità di estensioni/librerie già pronte e battle-tested.

**E lo so che riusare qualcosa che usi da 20 anni è noioso**, ma a volte è anche il servizio più professionale che possiamo rendere. Per il brivido della novità basta un po' di pazienza e 
certamente l'universo ci manderà il progetto in cui avrà veramente senso utilizzare la novità. Nel frattempo ci sono i vari progetti personali _for fun_ come sfogo.

## Sta succedendo adesso

Pinecone, Weaviate, Chroma. Vector database dedicati, presentati come componente necessario di qualsiasi architettura AI.

Anche qui: non è che siano inutili. È che nella stragrande maggioranza dei casi **non ne hai bisogno**.

Una ricerca ibrida full-text con BM25 + pgvector risolve il grosso — con il vantaggio di avere tutto nello stesso database, relazioni intatte, zero sincronizzazioni, zero componenti aggiuntivi da mantenere. Fino a circa mezzo milione di record la differenza di performance rispetto a un vector database dedicato è risibile. E la maggior parte dei progetti non arriverà mai a mezzo milione di record.

Il costo dell'infrastruttura esotica lo paghi sempre dopo, mai subito. E "dopo" coincide quasi sempre con il momento peggiore: trazione reale, investitori che guardano, utenti che si lamentano.

**La storia è ciclica. Solo i nomi cambiano.**

## Il mio mantra

> Minimum diff, less moving parts.

Nei progetti ho una regola che mi porto dietro da anni: **minimum diff, less moving parts**. Ogni componente aggiuntivo è una dipendenza, una cosa che può rompersi e che ha side effects a volte impliciti. Una cosa che qualcuno 
deve capire, mantenere, aggiornare. **Il costo non è mai solo tecnico — è cognitivo, operativo, economico.**

Scegliere la tecnologia più "dritta" che risolve il problema non è una scorciatoia. È il mestiere.
