---
title: "Crudio: da una spec OpenAPI a un backend mock stateful con un comando"
date: "2026-06-30T09:00:00.000Z"
categories:
  - "dev"
tags:
  - "openapi"
  - "api"
  - "mock"
  - "javascript"
  - "nodejs"
  - "express"
  - "testing"
  - "frontend"
  - "opensource"
description: "Ho costruito Crudio, uno strumento open source che trasforma una spec OpenAPI 3.x in un backend mock vero: stateful, con validazione sullo schema e persistenza su disco. Tutto derivato dal tuo contratto."
coverImage: "https://enricodeleo.s3.eu-south-1.amazonaws.com/images/crudio.png"
sticky: false
---

_In questo post voglio raccontarti perché ho costruito **Crudio** e il problema preciso che risolve: avere un backend finto che però si comporta come un backend vero, derivandolo interamente dalla tua spec OpenAPI._

_Non è l'ennesimo mock server che restituisce risposte preconfezionate. È un backend che ricorda cosa ci hai scritto dentro._

Chiunque sviluppi frontend conosce la stessa frustrazione: ti serve un backend per lavorare, ma quello vero non è pronto, è instabile, o semplicemente non vuoi dipenderci durante i test. Così ripieghi su un mock server.

E qui scatta il problema. **I mock server ti costringono a una scelta che non dovresti dover fare**: o sono guidati dalla spec, oppure sono stateful. Mai entrambe le cose.

## Il buco che nessuno riempie

Mettiamola così, con gli strumenti che probabilmente già usi:

- **Prism** legge la tua spec OpenAPI ed è fedele al contratto, ma è _stateless_. Fai una POST e il dato sparisce alla GET successiva. Ottimo per uno smoke test, inutile quando devi verificare un flusso reale.
- **json-server** è stateful e ti dà CRUD persistente, ma **ignora completamente la tua spec** e non valida nulla. Accetta felicemente payload che il tuo backend vero rifiuterebbe a priori.

Il risultato è che, quando devo testare sul serio come il frontend gestisce paginazione, errori di validazione, 404 e update parziali, nessuno dei due basta.

**Crudio nasce esattamente per riempire quella casella vuota: spec-driven _e_ stateful _e_ con validazione.** Tutto derivato dal tuo contratto OpenAPI, niente scritto a mano.

## Cosa fa, in pratica

Crudio legge una spec OpenAPI 3.x e tira su un'API mock funzionante con persistenza. Gli endpoint CRUD si comportano come un piccolo backend reale; gli endpoint non-CRUD mantengono uno stato per-operazione, così l'intera spec è servibile da un unico runtime.

Nel concreto:

- i request body CRUD sono **validati contro il tuo schema**
- i dati **persistono tra una chiamata e l'altra** (file JSON, nessun database da configurare)
- gli **ID sono generati in base alla spec** (interi, UUID, ecc.)
- le route CRUD condividono lo stato della risorsa
- le route non-CRUD usano uno stato di operazione persistito

E si avvia con un solo comando:

```bash
# Contro qualsiasi spec OpenAPI 3.x
npx @enricodeleo/crudio ./openapi.yaml

# Con dati fake
npx @enricodeleo/crudio ./openapi.yaml --seed 10

# Porta e storage personalizzati
npx @enricodeleo/crudio ./openapi.yaml --port 8080 --data-dir /tmp/data
```

## Si comporta come un backend vero

Data una spec CRUD standard con path tipo `/pets` e `/pets/{petId}`, ottieni un backend che fa quello che ti aspetti:

```bash
# Create
curl -X POST http://localhost:3000/pets \
  -H 'Content-Type: application/json' \
  -d '{"name":"Rex","tag":"dog"}'
# → 201 {"id":1,"name":"Rex","tag":"dog"}

# Get by ID — il dato è ancora lì, persistito su disco
curl http://localhost:3000/pets/1
# → 200 {"id":1,"name":"Rex","tag":"dog"}

# Partial update
curl -X PATCH http://localhost:3000/pets/1 \
  -H 'Content-Type: application/json' \
  -d '{"tag":"cat"}'
# → 200 {"id":1,"name":"Rex","tag":"cat"}

# Delete
curl -X DELETE http://localhost:3000/pets/1
# → 204
```

E soprattutto **rifiuta ciò che il tuo backend vero rifiuterebbe**, perché valida contro lo schema:

```bash
curl -X POST http://localhost:3000/pets \
  -H 'Content-Type: application/json' \
  -d '{"tag":"dog"}'
# → 400 {"error":"Validation failed","details":[...]}
# rifiutato: `name` è obbligatorio nel tuo schema
```

Questa è la differenza che conta: non stai testando contro risposte finte, stai testando contro il tuo contratto.

## Per cosa usarlo (e per cosa no)

Voglio essere onesto sui confini, perché è la parte che di solito viene nascosta.

**Usalo per:** test di integrazione, sviluppo frontend, prototipazione di API, verifica del contratto. È costruito su **Express 5 + ajv**, persiste su file JSON, ed è pensato per girare ovunque senza dipendenze pesanti.

**Non usarlo per:** backend di produzione, load testing, o qualunque cosa richieda business logic specifica di dominio senza handler custom. Crudio non inventa logica che non sia nel contratto.

Allo stato attuale lo stato è per-risorsa: relazioni, foreign key e autenticazione sono le domande ovvie successive, ed è esattamente lì che mi piacerebbe capire dove andare a tracciare la linea del "comportarsi come un backend vero".

## Provalo

Crudio è **open source, licenza MIT**, e lo trovi su GitHub: [github.com/enricodeleo/crudio](https://github.com/enricodeleo/crudio).

Per installarlo una volta sola e accorciare il comando:

```bash
npm i -g @enricodeleo/crudio
crudio ./openapi.yaml
```

Se lo provi e ti torna utile — o se hai un'idea su dove dovrebbe fermarsi il confine tra "mock" e "backend vero" — scrivimene: ne parliamo nei commenti oppure [contattami](mailto:hello@enricodeleo.com).
