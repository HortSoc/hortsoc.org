# Hortsoc.org

Live source repository for the public `https://hortsoc.org/` website.

This repository is the production publish target for the Hortsoc site. It contains the publishable Astro source that GitHub Actions builds from `main` and deploys to the `gh-pages` branch for GitHub Pages hosting.

The private build repository `HortSoc/hortsoc.org-build` remains the main development and migration workbench. Export reviewed structure/code changes from that repo into this repository when releasing updates.

## Repo Role

Use this repository for:

- live website publishing
- GitHub Pages deployment configuration
- Pages CMS editing on the live site surface
- reviewing and releasing exported changes from the build repo

Do not use this repository for:

- migration scripts
- raw source exports
- experimental implementation work
- architecture planning material that belongs in the private build repo

## Local Development

Prerequisites:

- Node 22
- `npm install`

Commands:

- `npm run dev`
- `npm run build`
- `npm run preview`

## Publishing Model

1. Make source-of-truth implementation changes in `HortSoc/hortsoc.org-build` unless the change belongs to the live repo surface.
2. Export reviewed publishable changes into this repository.
3. Review the diff in this repository.
4. Commit and push `main`.
5. GitHub Actions rebuilds the site and publishes generated output to `gh-pages`.

Repo-owned files in this repository, including this `README.md`, are not overwritten by the export script.

## GitHub Pages

This repository is configured to build on `main` and publish the generated site to the `gh-pages` branch.

- `Settings > Pages > Source` should remain `Deploy from a branch`
- the publishing branch should remain `gh-pages` with folder `/(root)`
- the production custom domain is `https://hortsoc.org/`
- push to `main` when you want a new live Pages deploy
