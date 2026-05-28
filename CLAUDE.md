# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A documentation system using **shadcn-vue + Nuxt Content**, inspired by Docus. This is a Bun monorepo containing a reusable Nuxt layer for documentation sites.

## Commands

```bash
# Install dependencies
bun install

# Development (docs site)
bun dev

# Build
bun build

# Generate static site
bun generate

# Preview production build
bun preview

# Lint
bun lint
bun lint:fix

# Type check (in packages/layer)
cd packages/layer && bun typecheck
```

## Architecture

### Monorepo Structure

- **`packages/layer`** (`@pleaseai/docs`) - The main Nuxt layer package
- **`apps/docs`** (`@pleaseai/docs-site`) - Example documentation site using the layer
- **`ref/`** - Git submodules containing reference projects (docus, shadcn-vue, fumadocs)
- **`docs/ref-analysis.md`** - Analysis summary of Docus and shadcn-vue reference projects

#### Reference Submodules (pinned commits)

| Submodule | Repository | Commit | Version |
| --- | --- | --- | --- |
| `ref/content` | [nuxt/content](https://github.com/nuxt/content) | `fbfd05b3aa1c6c500417d99ddbfe524936cfaa7b` | v3.9.0 |
| `ref/docus` | [nuxt-content/docus](https://github.com/nuxt-content/docus) | `0eafdaaa7050f0703dc89565c8bdb4622b22bb77` | v5.4.1-2-g0eafdaaa |
| `ref/fumadocs` | [fuma-nama/fumadocs](https://github.com/fuma-nama/fumadocs) | `7e820e27169ec7ece54b8e54d365fe1ba78f84d4` | create-fumadocs-app@16.0.19-29-g7e820e271 |
| `ref/mdc` | [nuxt-content/mdc](https://github.com/nuxt-content/mdc) | `d4483f6d85830232fd647d44daa67ef4f2b0ebc3` | v0.19.1 |
| `ref/shadcn-vue` | [unovue/shadcn-vue](https://github.com/unovue/shadcn-vue) | `1e2fe1769cf5bfd75a4f8d716fb26fb3ef2a2f02` | v2.3.3-25-g1e2fe176 |
| `ref/ui` | [nuxt/ui](https://github.com/nuxt/ui) | `8dc6b222c9a3f265073a25e04f105c42c33aacc9` | v4.2.1-35-g8dc6b222c |

### Layer Package (`packages/layer`)

The `@pleaseai/docs` is a Nuxt 4 layer that provides:

```
packages/layer/
├── app/
│   ├── components/
│   │   ├── app/          # Application-level components
│   │   ├── docs/         # Documentation-specific components
│   │   └── ui/           # shadcn-vue primitives (button, separator)
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   ├── composables/      # Vue composables
│   └── assets/css/       # Tailwind CSS v4 styles
├── modules/              # Nuxt modules (config, css)
├── i18n/                 # Internationalization
└── utils/                # Utility functions
```

### Key Technologies

- **Nuxt 4** with layer architecture
- **shadcn-vue** components built on **reka-ui** primitives
- **Tailwind CSS v4** with oklch colors via CSS variables
- **Nuxt Content v3** for markdown processing
- **nuxt-shiki** for syntax highlighting
- **@nuxtjs/color-mode** for dark/light theme

### Configuration Schema

Site configuration in `app.config.ts`:

- `docs.title` - Site title
- `docs.description` - Site description
- `docs.url` - Site URL
- `docs.github.{owner,name,url,branch}` - GitHub repository info

### Using the Layer

Apps extend the layer via `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@pleaseai/docs'],
})
```

## References

- [Nuxt Content Markdown Documentation](https://content.nuxt.com/raw/docs/files/markdown.md)
- [MDC Prose Components](https://github.com/nuxt-content/mdc/tree/main/src/runtime/components/prose)

## ESLint

Uses `@antfu/eslint-config` with Vue and formatters enabled.
