# Changelog

## [0.2.2-beta.0](https://github.com/pleaseai/docs/compare/docs-please-v0.2.1-beta.0...docs-please-v0.2.2-beta.0) (2025-12-22)


### Bug Fixes

* export utils directory from @pleaseai/docs layer ([#15](https://github.com/pleaseai/docs/issues/15)) ([b696032](https://github.com/pleaseai/docs/commit/b696032ae0d979e822948a3ede12fd8efce12781))

## [0.2.1-beta.0](https://github.com/pleaseai/docs/compare/docs-please-v0.2.0-beta.0...docs-please-v0.2.1-beta.0) (2025-12-19)


### Features

* **layer:** add header search with command dialog ([#12](https://github.com/pleaseai/docs/issues/12)) ([ac26c66](https://github.com/pleaseai/docs/commit/ac26c6685d6d8267b29e35a666fd132d966e3244))
* **layer:** add LLM support with raw markdown endpoint and SEO modules ([a5ec790](https://github.com/pleaseai/docs/commit/a5ec790fdf268c2df578b47c448893c90d5dfde7))
* **layer:** add MDC content components for accordion, badge, and collapsible ([d6f543a](https://github.com/pleaseai/docs/commit/d6f543a8a6bc73b92971c2613c3ea71b7dbd6e60))

## [0.2.0-beta.0](https://github.com/pleaseai/docs/compare/docs-please-v0.1.0-beta.0...docs-please-v0.2.0-beta.0) (2025-12-04)


### ⚠ BREAKING CHANGES

* **layer:** Tabs now use ::tabs-item{label="..."} syntax instead of ::tabs-list/::tabs-trigger/::tabs-content

### Features

* **layer:** add Accordion, Card UI and FeatureCard content components ([1e8b02b](https://github.com/pleaseai/docs/commit/1e8b02b5bdb7d4a8d8e880d201a4672de3ef3481))
* **layer:** add custom content components and UI primitives for extending apps ([#8](https://github.com/pleaseai/docs/issues/8)) ([7615ad7](https://github.com/pleaseai/docs/commit/7615ad7c74b5c3cbe3c2293c8b785c29c7bced52))
* **layer:** add PageHero, PageSection, PageCard components and enhance ButtonA ([#5](https://github.com/pleaseai/docs/issues/5)) ([220164d](https://github.com/pleaseai/docs/commit/220164d30babedfb0315319e4a514ea6de4d68bc))
* **layer:** add shadcn-vue CLI components and MDC content system ([66a2f1d](https://github.com/pleaseai/docs/commit/66a2f1d6df0c9f6301427d796fc02429900b5e5b))
* **layer:** enhance MDC tabs with icons, type safety, and accessibility ([#6](https://github.com/pleaseai/docs/issues/6)) ([facd76c](https://github.com/pleaseai/docs/commit/facd76c061a43b2e026f83303351792949a7f2c8))


### Bug Fixes

* **deps:** add zod and zod-to-json-schema for Nuxt Content schema support ([6ec61a2](https://github.com/pleaseai/docs/commit/6ec61a2a964b0712a000e10ad26dd72d052f442e))
* **layer:** add [@source](https://github.com/source) for TypeScript files in Tailwind CSS v4 ([140b06c](https://github.com/pleaseai/docs/commit/140b06c6813c1bef59f46bc5c5c1379509cdd373))
* **layer:** add proper code block styling with Tailwind import ([#7](https://github.com/pleaseai/docs/issues/7)) ([450599c](https://github.com/pleaseai/docs/commit/450599cb68c1818ba388e9f74ab51e6858f9c436))
* **layer:** prerender index route for Cloudflare Pages D1 compatibility ([52b8ad0](https://github.com/pleaseai/docs/commit/52b8ad009c9eda554bb56611d21be3902db94ea4))
* **layer:** replace nuxt-shiki with @nuxt/content built-in highlighting ([54b7a42](https://github.com/pleaseai/docs/commit/54b7a423bbc8a5a0d288fd3fd829e9a7d9c4878f))
* **layer:** resolve i18n type error with any cast ([28d6b25](https://github.com/pleaseai/docs/commit/28d6b252287d42b60a08f5081f82edcda39f11eb))
* **layer:** resolve UI components from layer directory in multi-layer setup ([#3](https://github.com/pleaseai/docs/issues/3)) ([1f40071](https://github.com/pleaseai/docs/commit/1f400718dd7f59f8ca5080f3e7d26a2b168e2458))
* **layer:** simplify landing collection query to fix prerender ([a636fa2](https://github.com/pleaseai/docs/commit/a636fa256be286fec396d4b657b83a532704622c))
* **layer:** use slot pattern for ProsePre to fix getShikiHighlighter error ([bb2b132](https://github.com/pleaseai/docs/commit/bb2b1324604019809f0bec62a642f2ef8ca0c931))
