# PleaseAI Docs

Documentation site using `@pleaseai/docs`.

## Development

```bash
# From workspace root
bun install
bun dev

# Or from this directory
bun dev
```

## Structure

```
apps/docs/
├── app.config.ts       # Site configuration
├── nuxt.config.ts      # Nuxt configuration
├── content/
│   ├── index.md        # Landing page
│   └── docs/
│       ├── 1.getting-started/
│       │   ├── 1.introduction.md
│       │   ├── 2.installation.md
│       │   ├── 3.configuration.md
│       │   └── 4.writing-content.md
│       └── 2.components/
│           ├── 1.overview.md
│           ├── 2.button.md
│           └── 3.separator.md
└── package.json
```

## Customization

Override layer components by creating files in the `components` directory.
