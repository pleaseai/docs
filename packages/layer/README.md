# @pleaseai/docs

A Nuxt layer for documentation sites using **shadcn-vue** instead of nuxt-ui.

## Overview

This layer provides a complete documentation theme built with:

- **shadcn-vue** - Beautiful, accessible UI components
- **Nuxt Content** - Markdown-based content management
- **Tailwind CSS v4** - Modern CSS with CSS variables

## Installation

```bash
# Install the layer
pnpm add @pleaseai/docs
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@pleaseai/docs']
})
```

## Features

- Documentation layout with sidebar navigation
- Command palette search
- Table of contents
- Dark/Light mode
- Mobile responsive
- MDC components (Callout, CodeBlock, etc.)

## Configuration

```typescript
// app.config.ts
export default defineAppConfig({
  docs: {
    title: 'My Docs',
    description: 'Documentation site',
    github: {
      url: 'https://github.com/owner/repo'
    }
  }
})
```

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev
```

## License

MIT
