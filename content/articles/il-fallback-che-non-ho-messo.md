---
title: "Il fallback che non ho messo"
description: "Tre istinti da ingegnere, tre smentite dai dati. Su un sistema AI di produzione, l'architettura più robusta è risultata quella con meno parti."
date: "2026-07-15T09:00:00.000Z"
categories:
  - "ai"
  - "dev"
tags:
  - "ai"
  - "llm"
  - "benchmark"
  - "ocr"
  - "human-in-the-loop"
  - "engineering"
sticky: false
---

L'architettura l'avevo in testa prima di scrivere una riga di codice. Modello primario per trascrivere, un secondo modello di riserva per le pagine difficili, l'umano solo quando falliscono entrambi. La cascade. È lo schema che disegnerebbe chiunque abbia messo in produzione sistemi veri: la ridondanza rassicura.

Il contesto: un PoC per un'università italiana. Risposte d'esame manoscritte, da trascrivere automaticamente in un PDF tipografato — non per sostituire il docente, ma per togliergli il carico di decifrare la grafia prima ancora di poter valutare il contenuto. Il banco di prova: 28 pagine di prosa in corsivo, trascritte a mano da un revisore come verità di riferimento, e una batteria di vision LLM testati con protocollo identico.

Poi ho misurato. E i dati mi hanno tolto la ragione tre volte.

Il primo istinto diceva: usa lo strumento di categoria. Per il testo manoscritto esistono OCR specializzati — modelli piccoli, efficienti, nati per questo scopo. Sul corsivo italiano falliscono sistematicamente: parafrasano invece di trascrivere, inventano frasi intere, entrano in loop. La forza bruta di un enorme LLM generalista li supera tutti. Ma non da sola: vince dentro la pipeline giusta — immagini normalizzate nelle dimensioni, prompt strutturato che esclude il template stampato e marca ciò che non va trascritto, protocollo identico e ripetibile. Il modello porta la scala; è la struttura intorno a convertirla in affidabilità. Lo strumento giusto per definizione era quello sbagliato nei fatti.

Il secondo istinto diceva: più ragionamento, più qualità. Sui modelli con reasoning attivabile, un budget di ragionamento alto non produce trascrizioni migliori — solo latenza cinque, sei volte superiore. Trascrivere non è inferire: il valore è nella lettura visiva, non nell'elaborazione linguistica. Il protocollo finale forza il ragionamento al minimo.

Il terzo istinto era la cascade. L'ho testata: quattro modelli di frontiera, di quattro provider diversi, valutati come potenziale secondo parere dietro il candidato. Nessuno dei quattro recupera i casi peggiori del primario. Le pagine difficili per uno — grafia densa, righe cancellate, testo minuscolo — sono difficili per tutti. I modi di fallimento non sono indipendenti: sono correlati. È tutta una generazione di modelli che inciampa sugli stessi sassi.

E un fallback che fallisce dove fallisce il primario non è ridondanza. È una parte mobile in più — costo, latenza, complessità di routing — che non compra robustezza. Ogni parte mobile in più è una responsabilità in più; qui i dati lo hanno reso letterale.

L'architettura sopravvissuta è più corta di quella che avevo disegnato: primario, soglia, umano.

Il modello, insieme alla trascrizione, riporta un'auto-valutazione di confidenza. Non è una probabilità calibrata — è un'auto-percezione, e va trattata con la diffidenza che merita. Ma misurata contro la verità di riferimento si è rivelata predittiva: le pagine sotto soglia erano davvero quelle meno affidabili. Sopra soglia, la trascrizione passa. Sotto, nessun secondo tentativo, nessun altro modello: la pagina va al docente nell'originale, come oggi. Se l'AI non è sicura, precauzionalmente si scarta.

C'è un dettaglio che vale la pena isolare. La letteratura recente ([Crosilla, Klic, Colavizza 2025](https://arxiv.org/abs/2503.15195)) mostra che i multimodal LLM eccellono sulla scrittura moderna ma con una preferenza marcata per l'inglese, e che in zero-shot non sanno auto-correggersi. Il corsivo italiano contemporaneo, in condizioni reali, è esattamente dove i dati pubblici scarseggiano — e la distanza dell'1,58% tra originale e trascritto misurata sul nostro benchmark si colloca nella fascia dei migliori risultati riportati. Ma soprattutto: noi al modello non chiediamo di correggersi. Gli chiediamo di valutarsi. E quello, misurato, lo sa fare abbastanza bene da reggere una decisione binaria. Sfiducia nel modello e fiducia nel suo segnale di confidenza non sono in contraddizione: il segnale va solo messo in un punto del sistema dove può sbagliare senza fare danni.

L'umano, in questa architettura, non è decorativo. Non rilegge tutto, non firma output altrui per finta supervisione: interviene nell'unico punto in cui il suo giudizio cambia davvero il rischio. L'agente esegue. L'umano risponde.

Tre istinti, tre smentite. Il punto non è che l'istinto sia sbagliato in sé — è che su questa tecnologia l'istinto non è ancora esperienza. Non ha avuto il tempo di sedimentare, e quello che sembra mestiere è spesso solo l'abitudine di un'altra epoca travestita da giudizio. L'unica cosa che sostituisce l'esperienza che non abbiamo ancora è misurare.

L'architettura più robusta era quella con meno parti. Non è una filosofia. È una misura.
