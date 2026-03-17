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

## Deploy to Vercel

The repository is prepared for static deployment on Vercel via [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite).

Project settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### What you need to do in Vercel

1. Sign in to Vercel.
2. Click `Add New...` -> `Project`.
3. Import the GitHub repository `portfolio-codex`.
4. Confirm the detected Vite settings.
5. Click `Deploy`.

After the first deploy, Vercel will create a production URL and automatic deploys for future pushes to `main`.

### Optional custom domain

To publish the site on your own domain, follow Vercel's [Add a Domain](https://vercel.com/docs/projects/domains/add-a-domain) flow after the first deployment.

What you will need to do:

1. Add your domain in the Vercel project settings.
2. Update DNS records at your domain registrar as instructed by Vercel.
3. Wait for DNS propagation and SSL provisioning.
