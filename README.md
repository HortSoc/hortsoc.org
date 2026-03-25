# Hortsoc.org

Public Astro site for `hortsoc.org`.

This repository is the publishable website source. Internal migration scripts, raw source exports, and planning material live in the separate private build repository.

## Local Development

Prerequisites:

- Node 22
- `npm install`

Commands:

- `npm run dev`
- `npm run build`
- `npm run preview`

## Publishing

The private build repo is the main workbench. When source changes are ready for release, export the publishable website files into this repository, review the diff, then commit and push.

## GitHub Pages

This repository is configured for GitHub Pages deployment via GitHub Actions.

- Set `Settings > Pages > Source` to `GitHub Actions`.
- Push to `main` when you want a new Pages deploy.
- For `HortSoc/hortsoc.org`, the repo-site URL is `https://HortSoc.github.io/hortsoc.org/` until a custom domain is attached.
