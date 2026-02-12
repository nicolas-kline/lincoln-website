# Lincoln Website

This repo is configured to auto-deploy a **test site** to **GitHub Pages** whenever you push to `main`.

## One-time GitHub setup (no local dev environment required)

1. Push this repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Make sure your default branch is `main`.
5. Push any change to `main` (even editing this README in GitHub is enough).
6. Watch deployment in **Actions → “Deploy test site to GitHub Pages”**.

After the first successful run, your site URL will be:

- `https://<your-github-username>.github.io/<repo-name>/`

## How it works

The workflow file at `.github/workflows/deploy-test-site.yml` deploys the static files in this repository to GitHub Pages on every push to `main`.

## Connect chatbot to OpenAI using repo secrets

If you already created a secret named `OPENAI_API_KEY`, this repo now uses it automatically during deployment.

### Required GitHub settings

1. Go to **Settings → Secrets and variables → Actions → Secrets**.
2. Ensure `OPENAI_API_KEY` exists.
3. (Optional) add a repository variable `OPENAI_MODEL` (for example: `gpt-4.1-mini`).
4. Push to `main` to trigger a new deploy.

During deploy, the workflow generates `app-config.js` from those values.

### Local development

For local testing (without GitHub Actions), edit `app-config.js` directly:

```js
window.NOVA_CONFIG = {
  openaiApiKey: 'sk-your-real-key-here',
  openaiModel: 'gpt-4.1-mini'
};
```

> Security note: any key baked into a static site is visible to end users. For production, use a backend proxy so your API key stays secret.
