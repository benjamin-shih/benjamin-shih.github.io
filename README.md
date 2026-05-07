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

## GitHub Pages deployment

This site is configured for the GitHub Pages user-site URL <https://benjamin-shih.github.io/>.

To publish it:

1. Create a GitHub repository named `benjamin-shih.github.io`.
2. Add it as the local remote:

   ```bash
   git remote add origin git@github.com:benjamin-shih/benjamin-shih.github.io.git
   ```

3. Push the current branch and set upstream:

   ```bash
   git push -u origin main
   ```

4. In GitHub, set **Settings → Pages → Source** to **GitHub Actions**.

After that, pushes to `main` run `.github/workflows/deploy.yml`, validate the Astro build, and deploy `dist/` to GitHub Pages.
