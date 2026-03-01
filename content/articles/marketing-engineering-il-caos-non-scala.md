---
title: "Marketing Engineering: software mindset applicato al business"
description: "Quando il problema non è tecnico, ma il metodo sì: software mindset, dati e AI pragmatica per passare da investimenti a pioggia a scelte di marketing mirate."
date: "2026-02-28T10:00:00.000Z"
categories:
  - "AI"
  - "Marketing"
  - "Data Science"
tags:
  - "marketing"
  - "fractional-cto"
  - "growth"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/data-analaysis-ml-adv.png"
sticky: false
---

_Caso reale: budget limitato, geografia "a lentiggine" e una domanda semplice solo in apparenza. In questo post racconto come ho trasformato quel caos in un processo decisionale operativo._

## Quando il problema non è tecnico, ma il metodo sì

Nel marketing complesso non basta il solo intuito.  
**Serve rigore operativo.**

Per me significa due cose:
- **non decidere a sensazione**
- **non delegare ciecamente alla piattaforma**, sperando che la sua AI ottimizzi da sola

La richiesta, in questo caso, era diretta: **"Abbiamo questa situazione, idee?"**

Sembra una domanda semplice.  
In realtà contiene tre problemi diversi:
- un problema di business (budget limitato)
- un problema operativo (territorio frammentato)
- un problema decisionale (come prioritizzare in modo razionale)

Quindi no: non era "solo" un tema di targeting.  
Era un tema di **allocazione sotto vincoli**.

> In una situazione così non serve il bazooka: servono proiettili d'argento.

Un chiarimento sul ruolo: non nasco come marketer operativo.  
Vengo coinvolto quando il tema marketing smette di essere solo execution e diventa un problema di **allocazione, dati e qualità decisionale**.

In questo caso ho applicato criteri, ragionamenti e strategie che uso da anni in ambito tech/software: scomporre il problema, definire vincoli espliciti, progettare un processo replicabile e misurare ogni decisione.

## 1) La situazione di partenza: cosa rendeva il problema difficile

Il contesto era questo:
- copertura reale limitata a micro-zone non continue
- base clienti potenziale distribuita in modo irregolare
- pressione a partire in fretta
- budget non sufficiente per "testare tutto"

Io questa configurazione l'ho ribattezzata **"geografia a lentiggine"**: a macchia di leopardo sarebbe stato già un lusso.

In pratica, ogni euro aveva costo opportunità alto.  
Se lo mettevi nel posto sbagliato, non perdevi solo budget: perdevi tempo di apprendimento.

## 2) Perché il solo intuito non bastava

L'intuito è utile, soprattutto nelle prime fasi.  
Ma qui c'erano due limiti strutturali:
- troppa variabilità geografica per ragionare "a colpo d'occhio"
- troppi decisori con opinioni plausibili ma non confrontabili

Quando tutti hanno una buona ipotesi, il rischio è restare paralizzati o scegliere la voce più forte, non la scelta migliore.

Serviva quindi un criterio:
- **replicabile**
- **spiegabile al business**
- **traducibile in execution media**

## 3) Perché non lasciare tutto alla piattaforma

Domanda legittima: "non può pensarci la piattaforma con la sua AI?"  
In parte sì. Ma con un costo.

Le piattaforme ottimizzano dopo aver visto abbastanza distribuzione.  
Quella fase richiede volume, quindi budget. E nelle fasi iniziali può significare:
- dispersione
- targeting troppo ampio
- segnali rumorosi prima di convergere

Quando il budget è stretto, **non puoi comprare apprendimento indefinito**.  
Devi arrivare con una tesi iniziale più robusta.

## 4) La domanda giusta prima della tecnica

Prima di parlare di ML, ho riformulato la domanda così:

**Come trasformiamo una geografia complessa in una lista ordinata di priorità di investimento?**

Da qui derivano i requisiti del metodo:
- partire da dati realmente disponibili
- gestire irregolarità e outlier
- produrre output operativi, non solo analitici
- mantenere la logica trasparente per il team

Solo a questo punto ha senso discutere di strumenti.

## 5) Dati minimi utili: il vero punto di leva

Il principio è semplice: **dataset minimo utile prima, complessità dopo**.

Per questo caso bastavano:
- coordinate lat/lon dei punti servibili
- eventuale peso commerciale per punto
- vincoli operativi della piattaforma Ads (es. raggio minimo)

Non serviva un data lake.  
Serviva una base coerente per prendere decisioni migliori delle alternative manuali.

## 6) Dove entra ML (e perché qui ha senso)

Solo dopo il framing decisionale, ML e statistica diventano utili:
- **la statistica** definisce la scala reale del problema (e protegge dagli outlier)
- **il ML** identifica pattern geografici non ovvi a vista
- **il ranking** trasforma l'analisi in priorità

Pipeline essenziale:
1. stima scala locale con k-NN
2. clustering per densità con DBSCAN
3. metriche cluster (numerosità, dispersione, centroide, valore)
4. ranking delle aree per priorità investimento
5. traduzione in azione Ads (centroide + raggio operativo)

*Il punto non è usare ML "per innovare".*  
*Il punto è ridurre arbitrarietà nelle decisioni di budget.*

## 7) L'output che serve davvero al business

**L'output utile non è una mappa bella da vedere.**  
**È una lista prioritaria argomentabile in riunione.**

Per ogni area candidata:
- livello di priorità
- razionale quantitativo
- vincolo operativo per l'attivazione

A quel punto la discussione cambia:
- dove abbiamo maggiore densità utile?
- dove il valore commerciale giustifica maggiore dispersione?
- quanta quota di rumore siamo disposti ad accettare?

**Meno opinioni generiche, più trade-off espliciti.**

## 8) Cosa cambia nel modo di lavorare

Il cambiamento non è solo tecnico.  
È anche organizzativo.

Prima:
- ogni campagna riparte quasi da zero
- criteri impliciti
- forte dipendenza da esperienza individuale

Dopo:
- criterio esplicito
- processo replicabile
- iterazioni comparabili nel tempo

In sintesi: meno improvvisazione, più sistema.

## 9) Il passo successivo: testare, non raccontare

Questo approccio **non promette scorciatoie**.  
Promette una cosa più utile: **ipotesi testabili**.

Prima di scalare, definisco sempre:
- metrica primaria
- finestra di osservazione
- criterio di successo/fallimento
- regole di iterazione

Se conferma, si scala.  
Se non conferma, si corregge.  
In entrambi i casi, si apprende.

## Il mio punto di vista

Quando un problema sembra insormontabile, spesso è solo poco strutturato.

Il caos non scala.  
Le opinioni non scalano.  
Le scorciatoie non scalano.

Scala un metodo:
- domanda giusta
- dati minimi utili
- statistica robusta
- ML pragmatico
- decisioni trasparenti

Per me, questo è Marketing Engineering: usare dati e metodo per prendere decisioni migliori, prima di spendere.

È per questo che mi piace il mio lavoro: prima la creatività, per esplorare davvero lo spazio del problema; poi il rigore scientifico, per trasformare intuizioni in decisioni solide e razionali.
