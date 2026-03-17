# Portfolio Codex

React + Vite portfolio site with light/dark theme support.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy to GitHub Pages

The repository is prepared for GitHub Pages deployment through GitHub Actions.

### Included setup

- `vite.config.js` uses `base: '/portfolio-codex/'`
- `.github/workflows/deploy-pages.yml` builds and deploys the site from `main`

### What you need to do in GitHub

1. Open the repository settings on GitHub.
2. Go to `Settings` -> `Pages`.
3. In `Build and deployment`, choose `Source: GitHub Actions`.
4. Make sure the default branch is `main`.
5. Push the latest changes to GitHub.

After that, every push to `main` will trigger deployment to GitHub Pages automatically.

Expected site URL:

- `https://vberestova95-alt.github.io/portfolio-codex/`

### Optional custom domain

If you want to use your own domain later:

1. Add a `CNAME` file with your domain.
2. Configure the custom domain in GitHub Pages settings.
3. Update DNS records at your registrar.
