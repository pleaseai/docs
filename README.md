# docs-please-workspace

A documentation system using **shadcn-vue** + **Nuxt Content**, inspired by Docus.

## Packages

### @pleaseai/docs-layer

A Nuxt layer for documentation sites. Replaces nuxt-ui with shadcn-vue components.

**Features:**

- shadcn-vue UI components (Button, Separator, etc.)
- Tailwind CSS v4 with CSS variables (oklch colors)
- Documentation layout with sidebar navigation
- Table of contents
- Dark/Light mode
- Mobile responsive

**Location:** `packages/layer`

## Reference Projects

- `ref/docus` - Docus documentation theme (nuxt-ui based)
- `ref/shadcn-vue` - shadcn-vue documentation site
- `ref/fumadocs` - Fumadocs reference

## Development

```bash
# Install dependencies
bun install

# Development (from packages/layer)
cd packages/layer
bun dev
```

## Architecture

```
docs/
├── packages/
│   └── layer/              # @pleaseai/docs-layer
│       ├── app/            # Vue components, layouts, pages
│       ├── modules/        # Nuxt modules (config, css)
│       └── ...
├── docs/                   # Documentation
│   └── ref-analysis.md     # Reference analysis
└── ref/                    # Reference projects (git submodules)
    ├── docus/
    ├── shadcn-vue/
    └── fumadocs/
```

## License

MIT
