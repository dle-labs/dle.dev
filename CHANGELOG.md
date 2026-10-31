# Changelog

## 2.4.0

### Minor Changes

- b5b7a5f: Extract shared section intro and resume timeline components so the home page sections reuse a smaller, more consistent UI structure with less duplicated Svelte markup.
- b5b7a5f: Introduce a reusable Typography system for headings, paragraphs, spans, and rich prose wrappers so text styling stays more consistent across the home page, navigation, and blog content.

### Patch Changes

- b5b7a5f: Rename the GitHub deployment environments to Production, Staging, and Previews while keeping staging and branch previews on the `dle-dev-staging` Cloudflare Pages project without duplicate Cloudflare deployment records in the GitHub UI.

## 2.3.0

### Minor Changes

- b43e05a: Refresh the home hero portrait with an enhanced local avatar image for sharper rendering and a cleaner avatar presentation.
- b43e05a: Add reusable commit and Changeset authoring skills so commit messages,
  release notes, and version metadata follow consistent repo standards.
- b43e05a: Add anchored section headings with smooth scrolling and a section table of contents in HaloNavbar for faster navigation across the home page.

### Patch Changes

- b43e05a: Replace HaloNavbar with floating-navbar pattern: hides on scroll down, reveals on scroll up, using GSAP for smooth asymmetric transitions.
- b43e05a: Move GitHub/LinkedIn profile links from the navbar into the hero section right column as icon-only buttons; add icons to Home/Blog nav items.
- b43e05a: Fix the OpenAI and Playwright skill icons so they load reliably in the skills section.

## 2.2.1

### Patch Changes

- db2cbe5: Add a dynamic `sitemap.xml` endpoint for the site and blog archive, and advertise it in `robots.txt` for crawler discovery.
- db2cbe5: Add a dedicated inactive navbar color token so non-current navigation buttons can be styled separately from the primary action state.

## 2.2.0

### Minor Changes

- 3ce8b5c: Replace deprecated Cloudflare Pages GitHub actions with Wrangler-based deploys so production and staging deployments stay explicit and aligned with the current Cloudflare setup.

## 2.1.1

### Patch Changes

- c0b5b2f: Remove the invalid `dle-dev (Preview)` package script from `package.json`.
- c0b5b2f: Fix production releases by explicitly dispatching the production deploy workflow after the release tag is created in GitHub Actions.

## 2.1.0

### Minor Changes

- 99214f9: Optimize responsive image delivery across the resume sections by serving narrower variants and adding explicit loading hints for non-critical media.
- 99214f9: Add resume profile links to the halo navbar with local GitHub and LinkedIn icons, larger in-button sizing, dark-mode-aware rendering, proper external link handling, and a slimmer resume data payload focused on the surfaced profile links.

### Patch Changes

- 99214f9: Replace the starter README with project-specific documentation covering the site structure, local development workflow, blog content setup, and Cloudflare deployment notes.
- 15ea40f: Bind the release-prep staging deploy job to the preview GitHub environment so the Cloudflare Pages action can read its account and API token secrets.
- 99214f9: Refine the skills section layout by removing forced mobile and desktop reordering so the cloud visual and content follow the natural document flow.
- c0be3c0: Add the Cloudflare MCP server configuration so the project can use the remote Cloudflare API integration during local agent sessions.
- 99214f9: Reduce GSAP plugin overhead by registering only the animation APIs the site currently uses.
- 99214f9: Automate the release flow with a GitHub Actions managed staging deploy on `master`, Changesets release PRs, tag and GitHub Release creation on merge, and tag-driven production deploys.
- 99214f9: Refine the home hero copy to emphasize engineering quality, architecture, and leadership, and slow the rotating headline so the messaging is easier to read.
- c0be3c0: Grant GitHub deployment write permission to the Pages workflows so Cloudflare's Pages action can create deployment records without failing with `Resource not accessible by integration`.
- c0be3c0: Update the agent instructions to load skills dynamically, keeping Svelte guidance as the default baseline and loading design or GSAP-related skills only when the task requires them.
- 99214f9: Fix Cloudflare caching so worker cache reads and writes stay limited to static and prerendered responses instead of dynamic HTML.

All notable changes to this project will be documented in this file.

## [2.0.0](https://github.com/polaroidkidd/dle.dev/compare/v1.25.0...v2.0.0) (2026-04-13)

### Major Changes

- release V2 of `dle.dev` with the rebuilt SvelteKit site, updated design system, refreshed content structure, and the current Cloudflare Pages deployment model

## [1.25.0](https://github.com/polaroidkidd/dle.dev/compare/v1.24.1...v1.25.0) (2023-07-18)

### Features

- replace custom hero animation with swiperjs ([eb3bd1c](https://github.com/polaroidkidd/dle.dev/commit/eb3bd1c7a078e28540839cc078c4c5930e51eabc))

### [1.24.1](https://github.com/polaroidkidd/dle.dev/compare/v1.24.0...v1.24.1) (2023-07-16)

### Bug Fixes

- search ([8e24fed](https://github.com/polaroidkidd/dle.dev/commit/8e24fede476388a3179d44f7cb7490ee26943b3f))

## [1.24.0](https://github.com/polaroidkidd/dle.dev/compare/v1.23.1...v1.24.0) (2023-07-03)

### Features

- update svelte to version 4 ([4c6af92](https://github.com/polaroidkidd/dle.dev/commit/4c6af925720bfa3377562724733a821f5b4b1e44))

### [1.23.1](https://github.com/polaroidkidd/dle.dev/compare/v1.23.0...v1.23.1) (2023-06-25)

### Bug Fixes

- remove cloudflare web analytics code block ([5ee6ecb](https://github.com/polaroidkidd/dle.dev/commit/5ee6ecb6342f45234ef4de14cef68d68441c395b))

## [1.23.0](https://github.com/polaroidkidd/dle.dev/compare/v1.22.0...v1.23.0) (2023-06-23)

### Features

- cloudflare analytics ([2280cf9](https://github.com/polaroidkidd/dle.dev/commit/2280cf9c3fca8177b19f4f2c2b7d4bbefc6c6470))

## [1.22.0](https://github.com/polaroidkidd/dle.dev/compare/v1.21.1...v1.22.0) (2023-06-23)

### Features

- migrate to cloudflare pages ([8c748ce](https://github.com/polaroidkidd/dle.dev/commit/8c748ce5bba7fc606a6ed793f6a46fbd841625f8))

### [1.21.1](https://github.com/polaroidkidd/dle.dev/compare/v1.21.0...v1.21.1) (2023-06-22)

### Bug Fixes

- contact form modal width on desktop ([6f694a1](https://github.com/polaroidkidd/dle.dev/commit/6f694a1d291ad5660d3299357a15262146f09c18))

## [1.21.0](https://github.com/polaroidkidd/dle.dev/compare/v1.20.0...v1.21.0) (2023-06-22)

### Features

- update contact form mobile design and usabillity ([f959cb7](https://github.com/polaroidkidd/dle.dev/commit/f959cb7ef6eae7a61d084859b34fed14d61681e0))

## [1.20.0](https://github.com/polaroidkidd/dle.dev/compare/v1.19.2...v1.20.0) (2023-06-22)

### Features

- include cancel button next to submit button in form ([cc77bc9](https://github.com/polaroidkidd/dle.dev/commit/cc77bc959c685cb61712f29892c0be348f6cf437))

### [1.19.2](https://github.com/polaroidkidd/dle.dev/compare/v1.19.1...v1.19.2) (2023-06-22)

### [1.19.1](https://github.com/polaroidkidd/dle.dev/compare/v1.19.0...v1.19.1) (2023-06-22)

### Bug Fixes

- update commitlint config to include dependabot MRs ([fd45ca6](https://github.com/polaroidkidd/dle.dev/commit/fd45ca6ec77cb5709ed943e7768f590211f72d47))

## [1.19.0](https://github.com/polaroidkidd/dle.dev/compare/v1.18.0...v1.19.0) (2023-06-22)

### Features

- contact form & skeleton-ui ([0b9ca45](https://github.com/polaroidkidd/dle.dev/commit/0b9ca458f7b108adade317d6b364b669a5df68e5))

## [1.18.0](https://github.com/polaroidkidd/dle.dev/compare/v1.16.1...v1.18.0) (2023-05-22)

### Features

- implement scroll-back-up-error ([ec6956f](https://github.com/polaroidkidd/dle.dev/commit/ec6956f100134cc6cd8608c1524ffaf06140b295))
- update seo search result sub heading ([b0b3dd5](https://github.com/polaroidkidd/dle.dev/commit/b0b3dd528201c7fa1cb5679e6edf0de3a9d1bede))

### Bug Fixes

- update github api key ([08221be](https://github.com/polaroidkidd/dle.dev/commit/08221be5b47a657ac5fcbefd1402a74695b72981))

## [1.17.0](https://github.com/polaroidkidd/dle.dev/compare/v1.16.1...v1.17.0) (2023-04-28)

### Features

- implement scroll-back-up-error ([ec6956f](https://github.com/polaroidkidd/dle.dev/commit/ec6956f100134cc6cd8608c1524ffaf06140b295))
- update seo search result sub heading ([b0b3dd5](https://github.com/polaroidkidd/dle.dev/commit/b0b3dd528201c7fa1cb5679e6edf0de3a9d1bede))

### [1.16.1](https://github.com/polaroidkidd/dle.dev/compare/v1.16.0...v1.16.1) (2023-04-23)

### Bug Fixes

- tracking script data attribute ([20f0dd0](https://github.com/polaroidkidd/dle.dev/commit/20f0dd06f57caf922dbff4a1e16dfabe0d4cff1a))

## [1.16.0](https://github.com/polaroidkidd/dle.dev/compare/v1.15.0...v1.16.0) (2023-04-23)

### Features

- fixed prettier and typescript linting and errors ([32f02e7](https://github.com/polaroidkidd/dle.dev/commit/32f02e7137914ce2eef3f26a87e7f9f6808e288c))

## [1.15.0](https://github.com/polaroidkidd/dle.dev/compare/v1.14.0...v1.15.0) (2023-04-20)

### Features

- migrate to yarn ([7488a0e](https://github.com/polaroidkidd/dle.dev/commit/7488a0e2a33c07c3061d0aed5daea6f3633409c7))

## [1.14.0](https://github.com/polaroidkidd/dle.dev/compare/v1.12.0...v1.14.0) (2023-04-19)

### Features

- Migrate from NextJS to Svelte ([da93bd4](https://github.com/polaroidkidd/dle.dev/commit/da93bd405265c780ac4e2bbba6616d4a75a9bd59))
- sync favicon icon style with current theme ([81c3019](https://github.com/polaroidkidd/dle.dev/commit/81c301912d7e393274ddbbfb991cb5931dee7ef9))

## [1.13.0](https://github.com/polaroidkidd/dle.dev/compare/v1.12.0...v1.13.0) (2023-04-18)

### Features

- Migrate from NextJS to Svelte ([da93bd4](https://github.com/polaroidkidd/dle.dev/commit/da93bd405265c780ac4e2bbba6616d4a75a9bd59))

## [1.12.0](https://github.com/polaroidkidd/dle.dev/compare/v1.11.0...v1.12.0) (2023-03-02)

### Features

- csp headers and performance improvements ([5c8fc07](https://github.com/polaroidkidd/dle.dev/commit/5c8fc0708c4f81cb69fc8fc57dbad260a902eddd))

## [1.11.0](https://github.com/polaroidkidd/dle.dev/compare/v1.10.0...v1.11.0) (2023-02-14)

### Features

- added csp ([b6d413d](https://github.com/polaroidkidd/dle.dev/commit/b6d413defe30dfd657e8f1b479b6e3ae993fdff3))

## [1.10.0](https://github.com/polaroidkidd/dle.dev/compare/v1.9.2...v1.10.0) (2023-02-08)

### Features

- increase number of blog entries on homepage ([771a572](https://github.com/polaroidkidd/dle.dev/commit/771a572e7c1a614901aba8553ef11b7bcf78aae7))

### [1.9.2](https://github.com/polaroidkidd/dle.dev/compare/v1.9.1...v1.9.2) (2023-02-05)

### Bug Fixes

- navbar spacing ([936a4d5](https://github.com/polaroidkidd/dle.dev/commit/936a4d5503746e919a275db46732bdd1f865695a))

### [1.9.1](https://github.com/polaroidkidd/dle.dev/compare/v1.9.0...v1.9.1) (2023-01-07)

### Bug Fixes

- frosted glass spacing in mobile navigation ([c8ba87a](https://github.com/polaroidkidd/dle.dev/commit/c8ba87a3bb56446ee9f5056a332fcfc7f1d362a0))

## [1.9.0](https://github.com/polaroidkidd/dle.dev/compare/v1.8.0...v1.9.0) (2023-01-06)

### Features

- updated mobile navigation bar ([40e949a](https://github.com/polaroidkidd/dle.dev/commit/40e949a9ac66d4c7172634e05564772d00220299))

## [1.8.0](https://github.com/polaroidkidd/dle.dev/compare/v1.7.0...v1.8.0) (2023-01-03)

### Features

- updated CV page ([2b00b1e](https://github.com/polaroidkidd/dle.dev/commit/2b00b1e12848901eedd3abcfa8c1c3bf31832768))

## [1.7.0](https://github.com/polaroidkidd/dle.dev/compare/v1.6.0...v1.7.0) (2022-11-27)

### Features

- improved search ([039f07c](https://github.com/polaroidkidd/dle.dev/commit/039f07c176bb6653ac047d86e51479fdf62d0156))

## [1.6.0](https://github.com/polaroidkidd/dle.dev/compare/v1.5.0...v1.6.0) (2022-11-02)

### Features

- search bar & revalidation settings ([76783bb](https://github.com/polaroidkidd/dle.dev/commit/76783bbac1d23a7000b99bb06e26a845ce410400))

## [1.5.0](https://github.com/polaroidkidd/dle.dev/compare/v1.4.2...v1.5.0) (2022-10-31)

### Features

- **frontend:** adjust navbar ([d655330](https://github.com/polaroidkidd/dle.dev/commit/d6553307b5bede522c2775badee221412438c369))

### [1.4.2](https://github.com/polaroidkidd/dle.dev/compare/v1.4.1...v1.4.2) (2022-10-31)

### Bug Fixes

- **frontend:** mobile safari image outline ([fb119ef](https://github.com/polaroidkidd/dle.dev/commit/fb119efddd930c7fa4a2d63e8830a3cdc503cf88))

### [1.4.1](https://github.com/polaroidkidd/dle.dev/compare/v1.4.0...v1.4.1) (2022-10-31)

### Bug Fixes

- **frontend:** mobile nav bar click events ([998106a](https://github.com/polaroidkidd/dle.dev/commit/998106a05431af3fa81eee76904f15daf4152336))

## [1.4.0](https://github.com/polaroidkidd/dle.dev/compare/v1.3.2...v1.4.0) (2022-10-30)

### Features

- **frontend:** added article archive to homepage ([d45f567](https://github.com/polaroidkidd/dle.dev/commit/d45f567af42c951cb8983c1e726d7f4034d29e70))

### [1.3.2](https://github.com/polaroidkidd/dle.dev/compare/v1.3.1...v1.3.2) (2022-10-30)

### Bug Fixes

- **frontend:** home navigation ([ba90c28](https://github.com/polaroidkidd/dle.dev/commit/ba90c28025ff916d1aea4df4000fa24652606f0b))

### [1.3.1](https://github.com/polaroidkidd/dle.dev/compare/v1.3.0...v1.3.1) (2022-10-30)

### Bug Fixes

- **frontend:** add env files to docker for production build ([1dae8e1](https://github.com/polaroidkidd/dle.dev/commit/1dae8e18a22c44672a0c4aded740bf93c3c70b84))

## [1.3.0](https://github.com/polaroidkidd/dle.dev/compare/v1.2.0...v1.3.0) (2022-10-30)

### Features

- added some seo and ISR ([8344e49](https://github.com/polaroidkidd/dle.dev/commit/8344e49be08012f5908437397373799d9dabf4b3))

## [1.2.0](https://github.com/polaroidkidd/dle.dev/compare/v1.1.3...v1.2.0) (2022-10-30)

### Features

- removed call to separate blog entires ([2ca76eb](https://github.com/polaroidkidd/dle.dev/commit/2ca76ebdc7524da42b3c5f62bd5ae77a0889dc46))

### [1.1.3](https://github.com/polaroidkidd/dle.dev/compare/v1.1.2...v1.1.3) (2022-10-30)

### Bug Fixes

- **frontend:** navbar blog link animation ([84163c4](https://github.com/polaroidkidd/dle.dev/commit/84163c436823f5b8b965db0d2c04391d14b82dfa))

### [1.1.2](https://github.com/polaroidkidd/dle.dev/compare/v1.1.1...v1.1.2) (2022-10-29)

### Bug Fixes

- **root:** keeping root and frontend version in sync ([36569ff](https://github.com/polaroidkidd/dle.dev/commit/36569ffdb01096462d0092b3ede7d807e8d76bb0))

### [1.1.1](https://github.com/polaroidkidd/dle.dev/compare/v1.1.0...v1.1.1) (2022-10-29)

### Bug Fixes

- **root:** temporary workaround to fix automatic versioning ([1df9ca2](https://github.com/polaroidkidd/dle.dev/commit/1df9ca270cb5a74dfd9770745719ab2b5ad8dc38))

## [1.1.0](https://github.com/polaroidkidd/dle.dev/compare/v1.0.1...v1.1.0) (2022-10-29)

### Features

- **root:** removed strapi as a dependency ([30b05f7](https://github.com/polaroidkidd/dle.dev/commit/30b05f7879c052a6ee87af8e3b0781b1e3cdbaaf))

### [1.0.1](https://github.com/polaroidkidd/dle.dev/compare/v1.0.0...v1.0.1) (2022-10-29)

### Bug Fixes

- **root:** commitlint & standard-version fixed and updated ([a8ecb10](https://github.com/polaroidkidd/dle.dev/commit/a8ecb10c1eb416a6e414b012f0b1c5f7b1146cf0))

## [1.0.0](https://github.com/polaroidkidd/dle.dev/compare/v0.1.23...v1.0.0) (2022-10-29)

### Features

- **frontend, backend:** completed migration to nextjs and strapi ([3c7db87](https://github.com/polaroidkidd/dle.dev/commit/3c7db87a32972643f55be2cb7a57dbe811b50d85))

### [0.1.23](https://github.com/polaroidkidd/dle.dev/compare/v0.1.22...v0.1.23) (2020-11-05)

### [0.1.22](https://github.com/polaroidkidd/dle.dev/compare/v0.1.21...v0.1.22) (2020-11-05)

### Bug Fixes

- reduce prism library import footprint ([9d21e6e](https://github.com/polaroidkidd/dle.dev/commit/9d21e6eaa6bc36930cbf5e8c5e38fc7b9a832b26))

### [0.1.21](https://github.com/polaroidkidd/dle.dev/compare/v0.1.20...v0.1.21) (2020-10-04)

### Features

- blog navigation through automatically generated ToCs ([1bf337f](https://github.com/polaroidkidd/dle.dev/commit/1bf337fbf9fa52e9e39c09c73c091784cbb66c0f))

### [0.1.20](https://github.com/polaroidkidd/dle.dev/compare/v0.1.19...v0.1.20) (2020-04-24)

### Bug Fixes

- using dot-ent for prod build ([0095836](https://github.com/polaroidkidd/dle.dev/commit/009583679c9661c8570ae25c9499de0e73ac0da9))

### [0.1.19](https://github.com/polaroidkidd/dle.dev/compare/v0.1.18...v0.1.19) (2020-04-21)

### Bug Fixes

- first pull put in setTimeout for 0.2s ([14fe1f5](https://github.com/polaroidkidd/dle.dev/commit/14fe1f55c74aed7480a2023d79089bbb547a7be0))

### [0.1.18](https://github.com/polaroidkidd/dle.dev/compare/v0.1.17...v0.1.18) (2020-04-19)

### Bug Fixes

- latest-news navigation fixed ([e56f853](https://github.com/polaroidkidd/dle.dev/commit/e56f853e515d561dc0ba2588077058965a96e861))

### [0.1.17](https://github.com/polaroidkidd/dle.dev/compare/v0.1.16...v0.1.17) (2020-04-19)

### Features

- latest blog now being shown on home page ([95a4c78](https://github.com/polaroidkidd/dle.dev/commit/95a4c78b9e39ec016035081934cfdeed9b3b7709))

### [0.1.16](https://github.com/polaroidkidd/dle.dev/compare/v0.1.15...v0.1.16) (2020-04-19)

### Bug Fixes

- navigation no longer highlighint wrong element ([5ec5aab](https://github.com/polaroidkidd/dle.dev/commit/5ec5aab6ea09263d694b722409df78eb85006a7e))

### [0.1.15](https://github.com/polaroidkidd/dle.dev/compare/v0.1.14...v0.1.15) (2020-04-19)

### Features

- minor ui improvements ([e865493](https://github.com/polaroidkidd/dle.dev/commit/e8654935abef270310e12f4df321e7b28c64d6ad))

### [0.1.14](https://github.com/polaroidkidd/dle.dev/compare/v0.1.13...v0.1.14) (2020-04-14)

### Bug Fixes

- removed redundant deployment line from build-and-deploy.sh ([3fec60c](https://github.com/polaroidkidd/dle.dev/commit/3fec60c9749e669842388b3fffa1de418f29ffca))

### [0.1.13](https://github.com/polaroidkidd/dle.dev/compare/v0.1.12...v0.1.13) (2020-04-14)

### Features

- updated theme colours ([dc4b914](https://github.com/polaroidkidd/dle.dev/commit/dc4b9142c04e3ca145650f1a3714366dedf1b448))

### [0.1.12](https://github.com/polaroidkidd/dle.dev/compare/v0.1.11...v0.1.12) (2020-03-18)

### Bug Fixes

- added yarn lock file ([64bb8d5](https://github.com/polaroidkidd/dle.dev/commit/64bb8d5fd7a7dc66beabd1ba154eadcc82193020))

### [0.1.11](https://github.com/polaroidkidd/dle.dev/compare/v0.1.10...v0.1.11) (2020-03-15)

### Features

- imporved page speed insights ([cd4345d](https://github.com/polaroidkidd/dle.dev/commit/cd4345d0de5fbb87541f463a3870de2c34cc5b33))

### [0.1.10](https://github.com/polaroidkidd/dle.dev/compare/v0.1.9...v0.1.10) (2020-03-15)

### Bug Fixes

- updated deployment ip ([f02f52f](https://github.com/polaroidkidd/dle.dev/commit/f02f52f56852d7991de9a0ab738da8c854235b68))

### [0.1.9](https://github.com/polaroidkidd/dle.dev/compare/v0.1.8...v0.1.9) (2020-03-15)

### Features

- migrated to npm ([807aa83](https://github.com/polaroidkidd/dle.dev/commit/807aa83d2fd54bd28584157eaa4773e99ee79e23))
- site now loads blogs from repository ([d5197d5](https://github.com/polaroidkidd/dle.dev/commit/d5197d57d9e97c2511d859eff04029a28c84a92e))

### [0.1.8](https://github.com/polaroidkidd/dle.dev/compare/v0.1.7...v0.1.8) (2020-02-16)

### Features

- basic navigation ([c539845](https://github.com/polaroidkidd/dle.dev/commit/c5398451eafc8f6dbd42ceca5887e33e431f53e9))

### [0.1.7](https://github.com/polaroidkidd/dle.dev/compare/v0.1.6...v0.1.7) (2020-02-16)

### Features

- added favicon ([ed0468d](https://github.com/polaroidkidd/dle.dev/commit/ed0468d5ce0c34b46f59011b05489c9d87107304))

### [0.1.6](https://github.com/polaroidkidd/dle.dev/compare/v0.1.5...v0.1.6) (2020-02-15)

### Bug Fixes

- updated dockerfile ([9796535](https://github.com/polaroidkidd/dle.dev/commit/979653501b4205ddb0d9e5f19c14f62f32ca18b6))

### [0.1.5](https://github.com/polaroidkidd/dle.dev/compare/v0.1.4...v0.1.5) (2020-02-15)

### Features

- completed scaffolding ([237acf5](https://github.com/polaroidkidd/dle.dev/commit/237acf5e1bf9135c03844086616fadd853eee9d0))

### [0.1.4](https://github.com/polaroidkidd/dle.dev/compare/v0.1.3...v0.1.4) (2020-02-07)

### Bug Fixes

- updated naming on dir for primary-heading ([8d5eb78](https://github.com/polaroidkidd/dle.dev/commit/8d5eb78984016d2aadec775a82e02b79e8b5acfd))

### [0.1.3](https://github.com/polaroidkidd/dle.dev/compare/v0.1.2...v0.1.3) (2020-02-07)

### Features

- migrated to styled-components ([3fb80cc](https://github.com/polaroidkidd/dle.dev/commit/3fb80cc14a31c71dab00ce07214dca74b3f529c5))

### [0.1.2](https://github.com/polaroidkidd/dle.dev/compare/v0.1.1...v0.1.2) (2020-02-07)

### Features

- **web:** migration to typescript ([c2d6c71](https://github.com/polaroidkidd/dle.dev/commit/c2d6c71c33de0381334c370d96f004f7180659a4))

### [0.1.1](https://github.com/polaroidkidd/dle.dev/compare/v0.1.0...v0.1.1) (2020-01-27)

### Features

- moved to npm ([309d49e](https://github.com/polaroidkidd/dle.dev/commit/309d49ed045837ae47ce1ce35531243e4207adc3))

## 0.1.0 (2019-12-17)

### Features

- **DH-2:** basic setup ([01be4e2](https://github.com/polaroidkidd/dle.dev/commit/01be4e2f40dd3fb2b4fe79ba86c8c099c3f861ba))
