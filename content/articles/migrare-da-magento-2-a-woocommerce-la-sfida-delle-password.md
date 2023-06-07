---
title: "Migrare da Magento 2 a WooCommerce: La Sfida delle Password"
date: "2023-06-07T12:27:00.000Z"
categories:
  - "Dev"
tags:
  - "sviluppo"
  - "magento"
  - "wordpress"
  - "plugin"
description: "La vera sfida nel rendere fluida la migrazione tra Magento e WooCommerce (WordPress). Un viaggio nell'algoritmo di hashing delle password di Magento 2 e come ho risolto questo problema."
coverImage: "https://i2.wp.com/enricodeleo.s3.eu-south-1.amazonaws.com/images/migration.jpeg?resize=1088,612"
---

Mi sono imbattuto in una sfida interessante: creare un plugin per WordPress che permettesse una migrazione senza soluzione di continuità degli utenti da Magento 2 a WooCommerce. 
Sembra semplice, vero? Lo pensavo anche io prima di rendermi conto si trattasse di terreno inesplorato senza una libreria, un plugin, una guida. Lasciatemi spiegare.

## WooCommerce vs Magento: Perché scegliere WooCommerce?

Quando si tratta di scegliere una piattaforma di e-commerce, WooCommerce e Magento sono due dei nomi più popolari che vengono in mente. Entrambi offrono un'ampia gamma di funzionalità che possono 
aiutare a costruire un negozio online robusto. Tuttavia, ci sono diverse ragioni per cui potresti voler scegliere WooCommerce su Magento. Ecco alcuni dei vantaggi principali:

### Facilità d'uso

WooCommerce è noto per la sua facilità d'uso. È un plugin di WordPress, il che significa che si integra perfettamente con qualsiasi sito WordPress esistente. Se hai già familiarità con WordPress, 
allora imparare a usare WooCommerce sarà un gioco da ragazzi. Magento, d'altra parte, ha una curva di apprendimento più ripida e può essere più complicato da configurare e gestire.

### Flessibilità e personalizzazione

WooCommerce offre una grande flessibilità quando si tratta di personalizzare il tuo negozio. Ci sono migliaia di temi e plugin disponibili che ti permettono di aggiungere nuove funzionalità e 
cambiare l'aspetto del tuo negozio con facilità. Magento offre anche molte opzioni di personalizzazione, ma può richiedere più competenze tecniche per apportare modifiche significative.

### Costi

WooCommerce è un plugin gratuito, il che lo rende una scelta eccellente per le piccole imprese o per chi è alle prime armi con l'e-commerce. Anche se ci sono costi associati all'hosting del tuo sito
e all'acquisto di temi o plugin premium, questi costi sono generalmente più bassi rispetto a quelli di Magento. Magento offre una versione gratuita (Magento Open Source), ma per accedere a tutte le 
funzionalità e al supporto, dovrai optare per Magento Commerce, che ha un costo significativo.

### Supporto della comunità

Sia WooCommerce che Magento hanno comunità di sviluppatori attive, ma la comunità di WordPress (e quindi di WooCommerce) è molto più grande. Questo significa che è più facile trovare risorse, 
tutorial e soluzioni a problemi comuni con WooCommerce.

## Migrazione

Mentre Magento può essere una scelta eccellente per le grandi imprese che necessitano di una soluzione di e-commerce robusta, WooCommerce offre una soluzione più accessibile e user-friendly 
che è perfetta per le piccole imprese.

Per questi motivi talvolta imprese di piccole dimensioni che hanno adottato Magento in prima battuta, si trovano in difficoltà e con costi e rigidità per loro difficilmente sostenibili ed optano
per una attività di __replatforming__ per proseguire l'attività su WooCommerce.

### I Vantaggi di una Transizione Fluida

Una delle principali preoccupazioni quando si migra da una piattaforma all'altra è la frizione percepita dall'utente finale, che potrebbe incidere negativamente sulle conversioni. 

Se mantenere la struttura generale del sito ecommerce familiare (o addirittura identica) ed il catalogo intatto è ragionevolmente semplice, non lo è quando si tratta di autenticazione. 

### Magento 2 e WordPress: autenticazione a confronto

WordPress utilizza una tecnologia chiamata `phpass` per l'hashing delle password. Si tratta di un framework di hashing delle password di dominio pubblico portatile per l'uso in applicazioni PHP. 

Magento 2, d'altra parte, utilizza **un algoritmo di hashing delle password più complesso**. Da un lato infatti utilizza `sodium` (incluso in PHP dalla versione 7.2), dall'altro utilizza 
una tecnica chiamata __hash stretching__ per aumentare la sicurezza delle password hashate. Questo comporta l'hashing della password più volte (per di più con l'aggiunta di una stringa casuale 
detta __salt__ che ne aumenta ulteriormente la complessità). 
Questo approccio rende il processo di hashing estremamente intensivo dal punto di vista computazionale, il che può aiutare a rallentare un attaccante che sta cercando di indovinare la password.

Questa sostanziale differenza nel processo di hashing delle password rende imppossibile la comprensione delle password importate da Magento a WordPress e viceversa.

### Approcci comuni

La soluzione più comune è quella di forzare il reset delle password degli utenti. Questo può essere un processo fastidioso per gli utenti e **può portare a una perdita di traffico e di fiducia**. 

Un'altra soluzione diffusa è quella di introdurre un meccanismo che verifichi la correttezza della password attraverso un login remoto via API verso la vecchia piattaforma. Ciò però comporta 
la **necessità di mantenere attiva ed accessibile a tempo indefinito la vecchia piattaforma**. Per di più in caso di down di quest'ultima il meccanismo fallirà.

## La mia soluzione: insegnare a WordPress come comprendere le password di Magento 

Dopo aver letto miriadi di articoli fuorvianti, ho deciso di sporcarmi le mani e di analizzare la classe `Encryptor` di Magento 2 per comprenderne a pieno l'algoritmo (e sì, avevo dapprima provato a 
chiedere a chatGPT4, con esito fallimentare). Da questo studio è scaturito un plugin WordPress leggerissimo che consente a WordPress di interpretare gli hash generati su Magento.

Il plugin si aggancia alla funzione di autenticazione di WordPress e verifica che l'hash importato dal database Magento 2 corrisponda alla password inserita, per poi eventualmente procedere 
a creare un nuovo hash nativo di WordPress.

Gli utenti possono dunque effettuare il login su WordPress con le loro password Magento 2 esistenti, rendendo la transizione trasparente.

## Open Source

In piena filosofia open source, e per contribuire ad ambedue le community ho deciso di rilasciare questo plugin sotto licenza GPL2 sia sul repository dei plugin di WordPresss che 
su [GitHub](https://github.com/enricodeleo/wp-password-migration-magento/) per eventuali contribuzioni da parte di altri dev.
