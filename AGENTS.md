# Repository Guidelines

## Project Structure & Module Organization
- `app/` is the Nuxt 4 source dir (`components/`, `layouts/`, `pages/`, `composables/`).
- `app/assets/css/main.css` holds Tailwind v4 config, theme tokens, and prose styles.
- `content/` is the Nuxt Content v3 root; articles live in `content/articles/`.
- `content.config.ts` defines the `articles` collection schema and path prefixing.
- `server/routes/` hosts endpoints like `feed.xml` and `robots.txt`; `static/` is public assets.

## Build, Test, and Development Commands
- `npm install`: install dependencies (use npm, not yarn).
- `npm run dev`: start the dev server at `http://localhost:3000`.
- `npm run build`: production build; `npm run generate`: static output + CDN replacement.
- `npm run preview`: preview production build; `npm run lint` / `npm run typecheck`.

## Coding Style & Naming Conventions
- Vue SFCs use `<script setup>` (JS by default; TS ok for utilities/composables).
- Route files use Nuxt 4 bracket syntax (`app/pages/[slug].vue`); avoid Nuxt 2 patterns (`_slug.vue`, `asyncData`).
- Content queries use `queryCollection`, `queryCollectionSearchSections`, and `ContentRenderer`.
- Styling uses Tailwind CSS v4 with DaisyUI 5 when components help; keep utilities in templates.
- Dark mode uses `@custom-variant dark` and `useColorMode` from `@vueuse/nuxt`.

## Brand, UI, and Content Guidelines
- Voice: confident, pragmatic, Italian-first; include "Fractional CTO & AI Solutions Architect" and "AI pragmatica che accelera business e prodotti".
- Layout: single-column, content-first; `max-w-prose`, `leading-relaxed`, `px-5` / `md:px-12`, logo area `p-12` with inline SVG `fill-current`.
- Typography/colors: Tailwind sans stack; follow Brand Manual sizes and palette (hex neutrals, amber accents, `blue-500` focus, social hovers).
- Components: newsletter card, callout border, cookie banner + prefs modal, footer with social icons and theme toggle; subtle motion and a11y (`aria-*`, skip link, focus rings).

## Testing Guidelines
- No automated tests. Run `npm run lint` and `npm run typecheck` for logic changes.
- Manually verify `/`, `/[slug]`, `/tag/[slug]`, `/category/[slug]`, `/search`, `/feed.xml`, `/robots.txt`.

## Commit & Pull Request Guidelines
- Conventional Commits (`feat:`, `fix:`, `chore:`); user handles git commands (no `git add/commit/push`).
- PRs include summary, commands run, screenshots/GIFs for UI changes, and linked issues.

## Content & Configuration Tips
- Frontmatter supports `title`, `description`, `date`, `categories`, `tags`, `coverImage`, `sticky`.
- Runtime config uses `NUXT_ENV_FRONTEND_URL` and `NUXT_PUBLIC_GA_ID`.
