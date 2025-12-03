# docs-please

A documentation system using **shadcn-vue** + **Nuxt Content**, inspired by Docus.

## Installation

```bash
npm install docs-please
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['docs-please']
})
```

## Features

- shadcn-vue UI components (Button, Separator, etc.)
- Tailwind CSS v4 with CSS variables (oklch colors)
- Documentation layout with sidebar navigation
- Table of contents
- Dark/Light mode
- Mobile responsive

## Packages

| Package | Description |
|---------|-------------|
| `docs-please` | Nuxt layer for documentation sites |
| `@pleaseai/docs-site` | Example documentation site |

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Lint
bun lint
bun lint:fix

# Type check
bun typecheck
```

## Architecture

```
docs/
├── packages/
│   └── layer/              # docs-please
│       ├── app/            # Vue components, layouts, pages
│       ├── modules/        # Nuxt modules (config, css)
│       └── ...
├── apps/
│   └── docs/               # Example documentation site
└── ref/                    # Reference projects (git submodules)
    ├── docus/
    ├── shadcn-vue/
    └── fumadocs/
```

## License

MIT
