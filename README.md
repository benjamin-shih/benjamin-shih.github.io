# Benjamin Shih

Source for my personal academic website, published at <https://benjamin-shih.github.io/>.

The site is built with [Astro](https://astro.build/) and deployed with GitHub Pages.

## Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open the printed localhost URL, usually <http://127.0.0.1:4321/>.

## Validation

Run the production build and static output checks:

```bash
make validate
```

## Deployment

Pushes to `main` run the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the Astro site and deploys the generated `dist/` directory to GitHub Pages.
