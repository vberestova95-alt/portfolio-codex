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

The repository is prepared for GitHub Pages deployment from the `main` branch and the `/docs` folder.

### Included setup

- `vite.config.js` uses `base: '/portfolio-codex/'`
- the production build can be published from `docs/`

### What you need to do in GitHub

1. Open the repository settings on GitHub.
2. Go to `Settings` -> `Pages`.
3. In `Build and deployment`, choose `Source: Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save the settings.

After that, GitHub Pages will publish the contents of `docs/` from `main`.

Expected site URL:

- `https://vberestova95-alt.github.io/portfolio-codex/`

### Optional custom domain

If you want to use your own domain later:

1. Keep the `CNAME` file in `docs/`.
2. Configure the custom domain in GitHub Pages settings.
3. Update DNS records at your registrar.
