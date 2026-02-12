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

## Connect chatbot to OpenAI

1. Open the deployed site.
2. Scroll to the **Chatbot** section.
3. Paste your OpenAI API key in **OpenAI API key**.
4. (Optional) change model name (default: `gpt-4.1-mini`).
5. Click **Save Key**.

The key is saved in your browser `localStorage` and used for direct calls to OpenAI's Responses API.

> Note: this is a demo-only approach. For production, use a backend proxy so your API key is never exposed to end users.
