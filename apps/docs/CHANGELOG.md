# Changelog

## 1.0.0 (2025-12-04)


### ⚠ BREAKING CHANGES

* **layer:** Tabs now use ::tabs-item{label="..."} syntax instead of ::tabs-list/::tabs-trigger/::tabs-content

### Features

* add release-please, cloudflare deployment, and dotenvx configuration ([5ce0642](https://github.com/pleaseai/docs/commit/5ce0642a8930002640329f70d939b487c546a508))
* **docs:** configure Nuxt Content to use Cloudflare D1 database ([be5192e](https://github.com/pleaseai/docs/commit/be5192e389aa6660a812fd65dd0acbe47c771ed5))
* initial ([d0522ff](https://github.com/pleaseai/docs/commit/d0522ff6bdd56027b7b4fa5bf87300eaccc6f290))
* **layer:** add Accordion, Card UI and FeatureCard content components ([1e8b02b](https://github.com/pleaseai/docs/commit/1e8b02b5bdb7d4a8d8e880d201a4672de3ef3481))
* **layer:** add custom content components and UI primitives for extending apps ([#8](https://github.com/pleaseai/docs/issues/8)) ([7615ad7](https://github.com/pleaseai/docs/commit/7615ad7c74b5c3cbe3c2293c8b785c29c7bced52))
* **layer:** add PageHero, PageSection, PageCard components and enhance ButtonA ([#5](https://github.com/pleaseai/docs/issues/5)) ([220164d](https://github.com/pleaseai/docs/commit/220164d30babedfb0315319e4a514ea6de4d68bc))
* **layer:** add shadcn-vue CLI components and MDC content system ([66a2f1d](https://github.com/pleaseai/docs/commit/66a2f1d6df0c9f6301427d796fc02429900b5e5b))
* **layer:** enhance MDC tabs with icons, type safety, and accessibility ([#6](https://github.com/pleaseai/docs/issues/6)) ([facd76c](https://github.com/pleaseai/docs/commit/facd76c061a43b2e026f83303351792949a7f2c8))


### Bug Fixes

* **deps:** add zod and zod-to-json-schema for Nuxt Content schema support ([6ec61a2](https://github.com/pleaseai/docs/commit/6ec61a2a964b0712a000e10ad26dd72d052f442e))
* **docs:** update compatibility date and change nitro preset to cloudflare_pages ([d873a08](https://github.com/pleaseai/docs/commit/d873a08dd50933fd691f50deab99415ff23178d9))
* **layer:** add [@source](https://github.com/source) for TypeScript files in Tailwind CSS v4 ([140b06c](https://github.com/pleaseai/docs/commit/140b06c6813c1bef59f46bc5c5c1379509cdd373))
* **layer:** add proper code block styling with Tailwind import ([#7](https://github.com/pleaseai/docs/issues/7)) ([450599c](https://github.com/pleaseai/docs/commit/450599cb68c1818ba388e9f74ab51e6858f9c436))
* **layer:** replace nuxt-shiki with @nuxt/content built-in highlighting ([54b7a42](https://github.com/pleaseai/docs/commit/54b7a423bbc8a5a0d288fd3fd829e9a7d9c4878f))
* **layer:** resolve UI components from layer directory in multi-layer setup ([#3](https://github.com/pleaseai/docs/issues/3)) ([1f40071](https://github.com/pleaseai/docs/commit/1f400718dd7f59f8ca5080f3e7d26a2b168e2458))


### Documentation

* **components:** add content/MDC component documentation ([fa975a9](https://github.com/pleaseai/docs/commit/fa975a92f7b0ce3f5044b3f92c00bbe4d361dd01))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * docs-please bumped to 0.2.0-beta.0
