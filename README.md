# dle.dev

Personal site and blog for Daniel L. Einars, built with SvelteKit, Svelte 5 runes, Tailwind CSS v4, mdsvex, and deployed to Cloudflare Workers.

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
- Cloudflare Workers
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
- `pnpm cf:prod` - deploy the production Worker
- `pnpm cf:staging` - deploy the staging Worker
- `pnpm cf:check` - validate production and staging bundles without deploying
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
The adapter emits `.svelte-kit/cloudflare/_worker.js` and static assets. Wrangler uploads the Worker and its `ASSETS` binding; the generated `.assetsignore` excludes server code from public assets.

GitHub Actions uses `cloudflare/wrangler-action`:

| Workflow                             | Target                               | Command                                                              |
| ------------------------------------ | ------------------------------------ | -------------------------------------------------------------------- |
| Tagged release / production dispatch | `dle-dev`                            | `wrangler deploy --env ""`                                           |
| Push to `master`                     | `dle-dev-staging`                    | `wrangler deploy --env staging`                                      |
| Pull request                         | Preview version of `dle-dev-staging` | `wrangler versions upload --env staging --preview-alias pr-<number>` |

PR uploads do not replace the active staging deployment. Version URLs are public and share the staging Worker's bindings. This project currently has only static assets. A manual PR workflow run uses its run ID for the alias.

### One-time setup before merging

1. Using an administrator session, build this branch and deploy both Workers with `pnpm cf:prod` and `pnpm cf:staging`. Creating Workers requires product-level Admin; ongoing CI tokens must not have that permission. These initial deployments use `workers.dev` and do not move the live domain.
2. Verify both Workers on their `workers.dev` URLs: home page, blog index and article, sitemap, missing-page response, static assets, and light/dark theme cookies. Confirm a preview version works before merging.
3. Create account-owned API tokens with **Workers Editor** scoped to **Specified Workers**. Select only `dle-dev` for production and only `dle-dev-staging` for staging/previews. Pages permissions are no longer needed.
4. Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the GitHub environments **Production**, **Staging**, and **Previews**. Use the production token only in Production and the staging token in the other two. Environment secrets override repository secrets. Remove the old repository-wide Pages token once no workflow needs it.

### Domain cutover and rollback

After validating the production Worker, use an administrator session to detach `dle.dev` (and any other configured hostname) from the old Pages project and attach it as a Worker Custom Domain to `dle-dev`. Follow Cloudflare's [Pages migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) for the domain switch. Domain reassignment can briefly interrupt traffic; schedule it separately from this PR merge.

Custom Domains are managed in the dashboard, deliberately omitted from `wrangler.jsonc`. Routine deployments must preserve that association and do not need DNS or Workers Routes permissions. Verify the association after the first CI deployment.

Keep the old Pages projects and deployments until the new site is verified on the live domain. To roll back the cutover, remove the Worker's Custom Domain and restore the Pages custom-domain association and its DNS record. Do not delete Pages projects during migration.

References: [SvelteKit Cloudflare adapter](https://svelte.dev/docs/kit/adapter-cloudflare), [Worker-scoped permissions](https://developers.cloudflare.com/workers/authorization/workers/), and [version preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/).

## Notes

- The project forces Svelte runes mode for app code.
- mdsvex is enabled for `.svx` content.
- Pre-commit hooks are managed with Husky and `lint-staged`.
