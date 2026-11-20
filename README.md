# dle.dev

Personal site and blog for Daniel L. Einars, built with SvelteKit, Svelte 5 runes, Tailwind CSS v4, mdsvex, and deployed to Cloudflare Pages.

## Overview

- Home page with resume-style sections for skills, work experience, education, certificates, and about
- Blog index and article pages backed by local `.svx` content files
- Theme preference persisted via the `dle-theme` cookie
- Cloudflare adapter setup with a post-build worker patch step

## Stack

- SvelteKit 2
- Svelte 5
- TypeScript
- Tailwind CSS 4
- mdsvex
- GSAP
- Cloudflare Pages
- pnpm

## Getting Started

Install dependencies:

```sh
pnpm install
```

Start local development:

```sh
pnpm dev
```

Run the main checks:

```sh
pnpm check
pnpm lint
pnpm build
```

## Available Scripts

- `pnpm dev` - start the Vite dev server
- `pnpm check` - run `svelte-check`
- `pnpm lint` - run Prettier checks and ESLint
- `pnpm lint:fix` - fix formatting and lint issues where possible
- `pnpm format` - format the repo with Prettier
- `pnpm build` - create a production build
- `pnpm preview` - preview the Cloudflare build locally with Wrangler
- `pnpm cf:prod` - deploy to Cloudflare Pages on the `master` branch
- `pnpm bnd` - build, then deploy

## Content

Blog posts live in `src/content/blog/*.svx`.

The blog loader in `src/lib/content/blog.ts`:

- collects frontmatter metadata with `import.meta.glob`
- sorts posts by publish date
- resolves a post by slug for `/blog/[slug]`

## Project Structure

```text
src/
  content/blog/          Blog posts in mdsvex
  lib/components/        Reusable site components
  lib/content/blog.ts    Blog content loader
  routes/                SvelteKit routes
scripts/
  patch-cloudflare-worker.mjs
```

## Deployment

The app uses `@sveltejs/adapter-cloudflare` in `svelte.config.js`.
After the adapter runs, `scripts/patch-cloudflare-worker.mjs` is executed to patch the generated worker output before deployment.
GitHub Actions deploy Pages builds through Wrangler via `cloudflare/wrangler-action`.

## Notes

- The project forces Svelte runes mode for app code.
- mdsvex is enabled for `.svx` content.
- Pre-commit hooks are managed with [Lefthook](https://lefthook.dev/) (`lefthook.yml`).
