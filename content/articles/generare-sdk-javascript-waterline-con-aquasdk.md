---
title: "AquaSDK: Genera SDK JavaScript in stile Waterline da specifiche OpenAPI"
date: "2024-12-15T09:00:00.000Z"
categories:
  - "dev"
  - "tools"
  - "api"
tags:
  - "javascript"
  - "openapi"
  - "sdk"
  - "rest"
  - "developer-tools"
description: "Come trasformare qualsiasi specifica OpenAPI in un SDK JavaScript intuitivo con sintassi simile a Waterline ORM: la soluzione per integrazioni API veloci e senza boilerplate"
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/aquasdk-cover.jpg"
sticky: true
---

Nel mondo dello sviluppo moderno, la capacità di **integrare rapidamente API** è tanto cruciale quanto frustrante. Quante ore abbiamo perso a scrivere manualmente client SDK pieni di boilerplate? È per risolvere questo problema che ho creato **AquaSDK**, uno strumento open-source che genera automaticamente SDK JavaScript con sintassi fluida e intuitiva partendo da qualsiasi specifica OpenAPI.

## Perché automatizzare la generazione di SDK?

- **⏱️ Riduzione del 70% del tempo di sviluppo** per integrazioni API
- **🔒 Consistenza automatica** tra documentazione OpenAPI e implementazione
- **🚀 Esperienza developer-friendly** con sintassi simile a Waterline ORM
- **💡 Supporto nativo a Promise/async** per codice asincrono pulito

## Funzionalità avanzate per sviluppatori

### Per gli Integratori API
- **Sintassi a catena fluida**  
  Interagisci con le API come se utilizzassi un ORM:
  ```javascript
  await api.utenti
    .find({ ruolo: 'admin', iscrizione: { '>': '2024-01-01' } })
    .limit(10)
    .populate('ordini')
    .execute();
  ```

- **Validazione automatica**  
  Controllo degli input basato sugli schemi OpenAPI prima delle chiamate API

- **Generazione completa dell'SDK***
AquaSDK non si limita a produrre semplici wrapper API. Ogni SDK generato include:

```bash
├── README.md # Documentazione automatica con esempi d'uso
├── models/   # Modelli dati validati basati sugli schemi OpenAPI
├── resources/ # Controller pronti per ogni endpoint API
└── utils/     # Helper per query complesse
```

### Per i Maintainer
- **Configurazione plug-and-play**  
  ```bash
  generate-sdk ./swagger.json ./sdk 1.0.0 --verbose
  ```
- **Integrazione CI/CD**  
  Rigenera automaticamente l'SDK ad ogni aggiornamento dell'API

## Come iniziare in 3 passi

1. Installa il pacchetto globale:
   ```bash
   npm install -g aquasdk
   ```

2. Genera il tuo SDK:
   ```bash
   generate-sdk ./api-spec.yaml ./sdk --version 1.0.0
   ```

3. Integra nel tuo progetto:
   ```javascript
   import API from './sdk';
   
   const api = new API({
     baseUrl: 'https://api.azienda.com',
     auth: { token: process.env.API_KEY }
   });
   ```

## Perché open-source?
AquaSDK è rilasciato sotto licenza **GPL-3.0** perché credo che:
- Gli strumenti fondamentali per lo sviluppo debbano essere accessibili a tutti
- La collaborazione comunitaria produce soluzioni migliori
- La trasparenza genera fiducia

## Prossimi sviluppi
- [ ] Generazione automatica di documentazione SDK
- [ ] Supporto Typescript

---

**Vuoi provare AquaSDK o contribuire al progetto?**  
- 🐙 GitHub: [github.com/enricodeleo/aquasdk](https://github.com/enricodeleo/aquasdk)
- 📦 npm: [npmjs.com/package/aquasdk](https://www.npmjs.com/package/aquasdk)

Per integrazioni enterprise o supporto personalizzato, [contattami direttamente](mailto:hello@enricodeleo.com).
