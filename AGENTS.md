# Repository Guidelines

## Project Structure & Module Organization
- `app/` is the Nuxt 4 source dir with `components/`, `layouts/`, and `pages/`.
- `app/assets/` holds CSS/images; Tailwind v4 entrypoint is `app/assets/css/main.css`.
- `content/articles/` contains Markdown posts for `@nuxt/content`.
- `server/routes/` defines endpoints like `feed.xml` and `robots.txt`.
- `static/` is the public asset folder.

## Build, Test, and Development Commands
- `npm install`: install dependencies (use npm, not yarn).
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: production build (static preset); `npm run generate`: static generation with CDN replacement.
- `npm run preview`: preview the production build locally.
- `npm run lint` / `npm run typecheck`: lint and optional type checks.

## Coding Style & Naming Conventions
- Vue SFCs use `<script setup>` with JavaScript; 2-space indentation.
- Components are PascalCase, composables are `useX`, routes use Nuxt 4 bracket files (e.g., `app/pages/[slug].vue`).
- Use `useAsyncData`/`useRoute`; avoid Nuxt 2 patterns like `_slug.vue` or `asyncData`.
- Styling uses Tailwind v4 plus DaisyUI 5; keep utilities in templates and use DaisyUI classes (e.g., `btn`, `card`) when they simplify UI.
- Theming uses CSS variables with a `dark` variant; use `useColorMode` for toggles.

## Brand, UI, and Content Guidelines
- Voice: confident, pragmatic, Italian-first; use "Fractional CTO & AI Solutions Architect" and "AI pragmatica che accelera business e prodotti"; CTAs note limited slots.
- Layout: single-column, content-first; `max-w-prose`, `leading-relaxed`, `px-5` / `md:px-12`, logo area with `p-12` and inline SVG `fill-current`.
- Typography and color: Tailwind sans stack; follow Brand Manual heading sizes and palette (hex neutrals, amber accents, `blue-500` focus, social hovers).
- Components and motion: newsletter card with validation feedback, callout border, cookie banner + prefs modal, footer with social icons; use subtle opacity/scale/slide transitions.
- Accessibility: add skip-to-content, `aria-*` labels, `aria-invalid` with `role="alert"`, and visible focus rings.

## Testing Guidelines
- No automated test suite is configured. For changes, run `npm run lint` and `npm run typecheck` when touching logic.
- Manually verify core routes: `/`, `/[slug]`, `/tag/[slug]`, `/category/[slug]`, `/search`, `/feed.xml`, `/robots.txt`.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `refactor:`).
- PRs should include a concise summary, commands run, screenshots/GIFs for UI changes, and linked issues when relevant.

## Content & Configuration Tips
- Posts live in `content/articles/*.md` with YAML frontmatter; env vars `NUXT_ENV_FRONTEND_URL` and `NUXT_PUBLIC_GA_ID` are used in production.
