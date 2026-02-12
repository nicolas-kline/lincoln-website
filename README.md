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

Check actions for site build
