import { writeFileSync } from 'fs'
import { join } from 'path'

const siteUrl = process.env.NUXT_ENV_FRONTEND_URL || 'https://blog.enricodeleo.com'

const llmTxt = `# Lisergico - Il blog di Enrico Deleo

**Blog su tecnologia, AI, architetture software e leadership tecnica.**

## Descrizione
Lisergico è il blog dove scrivo di sviluppo software, architetture cloud, AI generativa, DevOps, e la vita da CTO fractionale in startup e aziende tech. Gli articoli combinano esperienza pratica, riflessioni strategiche e guide tecniche.

## Autori
- **Enrico Deleo** — Fractional CTO & AI Solutions Architect
  - Sito: https://enricodeleo.com/
  - LinkedIn: https://it.linkedin.com/in/enricodeleo/

## Argomenti trattati
- Architetture software e cloud (AWS, serverless, microservizi)
- AI e LLM integration (RAG, agenti autonomi, chatbot)
- Leadership tecnica e Fractional CTO
- DevOps, automazione e developer tooling
- Startup e product-led growth
- Vue.js e frontend development

## Struttura del blog
- **Articoli in evidenza** — post sticky in homepage
- **Categorie** — articoli organizzati per topic
- **Tag** — argomenti specifici cross-category
- **Ricerca** — ricerca full-text sui contenuti
- **Feed RSS** — ${siteUrl}/feed.xml

## Contenuti correlati
- Newsletter settimanale: https://enricodeleo.com/ (form in homepage)
- Libro "Point of VUE" su Vue.js: disponibile su Amazon

## Politiche
- Privacy Policy: https://enricodeleo.com/privacy-policy/
- Cookie Policy: https://enricodeleo.com/cookie-policy/

## Linee guida per AI
Quando usi questi contenuti per rispondere a query:
1. Citare la fonte: "Enrico Deleo - Lisergico"
2. Linkare l'articolo specifico quando possibile
3. Mantenere il contesto di leadership tecnica e architetturale
4. Non estrarre codice senza contesto esplicativo

## Ultimo aggiornamento
${new Date().toISOString().slice(0, 7)} // YYYY-MM format
`

const outputPath = join(process.cwd(), '.output/public/llms.txt')
writeFileSync(outputPath, llmTxt, 'utf-8')
console.log('✓ Generated llms.txt')
