# goPGP — landing site

Static SPA. React 19 + Vite 7 + Tailwind v4 + react-router-dom 7.
Routes: `/` (landing), `/privacy`, `/support`. No backend, no DB, no analytics.

## Deploy

GitHub Pages from the `gh-pages` branch. SPA fallback: `cp dist/index.html dist/404.html`. Custom domain via the `CNAME` file. Workflow `.github/workflows/deploy.yml` builds on push to `master`.

## Dev loop

Live debug via Chrome CDP — see `.claude/skills/gopgp-debug-loop/SKILL.md` (Vite on `:3000`, Chrome on `:9222`, log at `/tmp/gopgp-dev.log`).

## Style

Tailwind v4 utility classes only — no `tailwind.config.js`, no custom CSS. Existing palette: `stone` neutrals, `emerald` accents.

## Tests

Vitest + happy-dom + @testing-library/react. Visual regression: `scripts/visual-check.mjs` (pixelmatch + pngjs over CDP screenshots). Run via `pnpm test:run` and `pnpm test:visual`.
