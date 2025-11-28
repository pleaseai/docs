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

- **`packages/layer`** (`@pleaseai/docs-layer`) - The main Nuxt layer package
- **`apps/docs`** (`@pleaseai/docs-site`) - Example documentation site using the layer
- **`ref/`** - Git submodules containing reference projects (docus, shadcn-vue, fumadocs)

### Layer Package (`packages/layer`)

The `@pleaseai/docs-layer` is a Nuxt 4 layer that provides:

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
  extends: ['@pleaseai/docs-layer'],
})
```

## ESLint

Uses `@antfu/eslint-config` with Vue and formatters enabled.
