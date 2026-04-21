# The Rake — site

A transparency project for tech revenue models and user alignment.

## Stack

- **Astro** — static site generator, reports rendered from JSON data files
- **Netlify** — free tier, static deploy
- No backend, no CMS, no database

## Structure

```
src/
  data/
    reports.json          # index of all reports (homepage grid)
    substack.json         # one JSON file per report
  layouts/
    Base.astro            # site shell: header, footer, fonts, tokens
  pages/
    index.astro           # homepage
    about.astro           # about + methodology
    reports/[slug].astro  # dynamic report template (one per company JSON)
```

## Adding a report

1. Create `src/data/{slug}.json` following the schema in `substack.json`
2. Add an entry to `src/data/reports.json`
3. `npm run build` — report page generated automatically at `/reports/{slug}/`

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build     # build to dist/
npm run preview   # preview built site
```

## Deploy

Connect GitHub repo to Netlify. The `netlify.toml` handles build config.

## Design tokens

Label colours are the only colour on an otherwise black-and-white site:

| Label       | Colour  |
|-------------|---------|
| Adversarial | #E24B4A |
| Extractive  | #EF9F27 |
| Compromised | #CECE30 |
| Aligned     | #639922 |
| Principled  | #1D9E75 |

## Methodology

Framework, research prompts, and versioning history are open — fork, critique, improve.
