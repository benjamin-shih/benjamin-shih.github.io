# Benjamin Shih Personal Website

Local Astro scaffold for a long-lived academic/professional personal website.

## Local development

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open the printed localhost URL, usually <http://127.0.0.1:4321/>.

## Validate before publishing

```bash
make validate
```

This runs the production Astro build and a small static output sanity check.

## Design direction

The current site follows a plain academic/professor-site style: narrow text-first pages, simple navigation, rule-separated sections, a modest profile rail, and responsive single-column fallbacks for small windows.

Design schematic: [`docs/site-schematic.svg`](docs/site-schematic.svg).

## Content choices in this scaffold

- CV remains available upon request; no downloadable CV is published.
- Stanford email is used for launch.
- Tone is objective and factual, leads with academic research, and keeps quantitative/professional background secondary.
- No GitHub repositories are featured yet.

## Later deployment phase

When ready, create/add the `benjamin-shih.github.io` GitHub remote and add a GitHub Pages deployment workflow or Pages configuration. This scaffold currently includes validation only, not deployment.
