# Reference Analysis

This document summarizes the analysis of Docus and shadcn-vue reference projects.

## 1. Docus Layer Analysis (`ref/docus/layer`)

### Architecture

```
layer/
├── app/                    # Application layer
│   ├── components/         # Vue components (app/, docs/)
│   ├── composables/        # useDocusI18n, navigation utils
│   ├── layouts/            # default.vue, docs.vue
│   ├── pages/              # [[lang]]/[...slug].vue
│   ├── plugins/            # i18n.ts
│   └── utils/              # navigation, prerender
├── modules/                # Nuxt modules
│   ├── config.ts           # Site metadata, git info
│   ├── routing.ts          # Page routing with i18n
│   └── css.ts              # Tailwind CSS injection
├── i18n/locales/           # 40+ language files
├── server/routes/          # Raw markdown endpoint
├── content.config.ts       # Content collections
├── nuxt.config.ts          # Layer configuration
└── nuxt.schema.ts          # App config schema
```

### Key Components (nuxt-ui based)

| Component             | Purpose                  |
| --------------------- | ------------------------ |
| `UApp`                | Root wrapper with locale |
| `UHeader`, `UFooter`  | Site chrome              |
| `UPage`, `UPageAside` | Page layout              |
| `UContentNavigation`  | Sidebar navigation       |
| `UContentToc`         | Table of contents        |
| `UContentSearch`      | Search command palette   |
| `UContentSurround`    | Prev/Next navigation     |

### Composables

- **useDocusI18n** - i18n abstraction (locale, t, localePath, switchLocalePath)
- **flattenNavigation** - Recursive navigation flattening
- **addPrerenderPath** - Nitro prerender helper

### Content Configuration

```typescript
// Collections: landing, docs (or landing_en, docs_en with i18n)
defineCollection({
  type: 'page',
  source: { include: '**/*.md' },
  schema: z.object({
    links: z.array(z.object({
      label: z.string(),
      icon: z.string(),
      to: z.string(),
      target: z.string().optional()
    })).optional()
  })
})
```

---

## 2. shadcn-vue v4 Analysis (`ref/shadcn-vue/apps/v4`)

### Architecture

```
apps/v4/
├── components/
│   ├── content/            # 35+ prose components
│   ├── demo/               # Component demos
│   ├── ui/                 # (imported from registry)
│   └── Site*.vue           # Header, Footer, etc.
├── registry/
│   └── new-york-v4/
│       ├── ui/             # shadcn components
│       ├── blocks/         # Pre-built blocks
│       └── charts/         # Chart components
├── composables/
│   ├── useUserConfig.ts    # Theme/layout preferences
│   └── useNavigation.ts    # Content navigation
├── assets/css/
│   ├── main.css            # Tailwind v4 + theme
│   └── themes.css          # Color variants
├── pages/docs/[...slug].vue
└── content/docs/           # Markdown files
```

### UI Components (reka-ui based)

Core components used for documentation:

| Component      | Files     | Purpose            |
| -------------- | --------- | ------------------ |
| `Sidebar`      | 10+ files | Navigation sidebar |
| `Command`      | 7 files   | Search palette     |
| `Button`       | 1 file    | Actions            |
| `Dialog`       | 4 files   | Modals             |
| `Sheet`        | 4 files   | Mobile drawer      |
| `DropdownMenu` | 8 files   | Menus              |
| `Tooltip`      | 3 files   | Hover info         |
| `Alert`        | 3 files   | Callouts           |
| `Collapsible`  | 3 files   | Expandable         |
| `ScrollArea`   | 2 files   | Custom scroll      |

### Styling (Tailwind v4)

```css
/* CSS Variables */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --border: oklch(0.922 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}

/* Tailwind v4 theme inline */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --radius-lg: var(--radius);
}
```

### Composables

- **useUserConfig** - Cookie-based preferences (theme, layout, package manager)
- **useNavigation** - Content tree with type awareness (page, component, block)
- **useColor** - Theme color utilities

### Prose Components

Override markdown rendering:

- `ProseH1.vue` - `ProseH6.vue`
- `ProseP.vue`, `ProseA.vue`
- `ProsePre.vue`, `ProseCode.vue`
- `ProseTable.vue`, `ProseUl.vue`, `ProseOl.vue`

---

## 3. Nuxt Content Analysis (`ref/content`)

Core content module for Nuxt - file-based CMS with markdown support.

### Architecture

```
src/
├── runtime/
│   ├── components/       # ContentRenderer, ContentPreviewMode
│   └── utils/            # Query helpers, transformers
├── utils/
│   └── content/
│       └── transformers/ # CSV, YAML, JSON parsers
└── module.ts             # Module setup
```

### Key Features

- File-based content management (Markdown, YAML, JSON, CSV)
- SQLite-powered content database
- Collection-based content organization
- Query builder API

---

## 4. MDC Analysis (`ref/mdc`)

Markdown Components parser - enables Vue components in Markdown.

### Architecture

```
src/runtime/
├── components/
│   └── prose/           # Prose components
│       ├── ProseA.vue
│       ├── ProseCode.vue
│       ├── ProseH1-H6.vue
│       ├── ProsePre.vue
│       ├── ProseTable.vue
│       └── ...
├── parser/              # MDC syntax parser
└── highlighter/         # Code highlighting
```

### Prose Components

Default HTML element overrides for markdown rendering:
- `ProseA`, `ProseP`, `ProseStrong`, `ProseEm`
- `ProseH1` - `ProseH6`
- `ProsePre`, `ProseCode`
- `ProseTable`, `ProseTh`, `ProseTd`, `ProseTr`
- `ProseUl`, `ProseOl`, `ProseLi`
- `ProseBlockquote`, `ProseHr`, `ProseImg`

---

## 5. Nuxt UI Analysis (`ref/ui`)

UI component library with MDC integration.

### Architecture

```
src/
├── module.ts                    # Module setup + MDC mapping
└── runtime/
    ├── components/
    │   ├── prose/               # MDC prose components
    │   │   ├── Tabs.vue         # ::tabs container
    │   │   ├── TabsItem.vue     # ::tabs-item
    │   │   ├── Callout.vue      # ::callout
    │   │   ├── Note.vue         # ::note
    │   │   ├── Tip.vue          # ::tip
    │   │   ├── Warning.vue      # ::warning
    │   │   ├── Caution.vue      # ::caution
    │   │   ├── Steps.vue        # ::steps
    │   │   ├── CodeGroup.vue    # ::code-group
    │   │   └── ...
    │   ├── content/             # Content-specific components
    │   └── Tabs.vue             # Base tabs component (UTabs)
    ├── composables/
    └── utils/
```

### Prose Tabs Implementation

**`prose/Tabs.vue`** - Container component:
- Extracts child `tabs-item` components from slots via `transformSlot()`
- Creates `items` array with `{ label, icon, component }`
- Supports `sync` prop for localStorage persistence
- Supports `hash` prop for scroll-to-section

**`prose/TabsItem.vue`** - Individual tab:
- Exposes `label`, `description`, `icon` props
- Parent reads these props to build tab headers

---

## 6. MDC Component Mapping

Nuxt UI's `module.ts` (line 188-213) shows how MDC syntax maps to Vue components:

```typescript
// nuxt.config.ts or module setup
mdc: {
  components: {
    map: {
      'accordion': 'ProseAccordion',
      'accordion-item': 'ProseAccordionItem',
      'badge': 'ProseBadge',
      'callout': 'ProseCallout',
      'card': 'ProseCard',
      'card-group': 'ProseCardGroup',
      'caution': 'ProseCaution',
      'code-collapse': 'ProseCodeCollapse',
      'code-group': 'ProseCodeGroup',
      'code-icon': 'ProseCodeIcon',
      'code-preview': 'ProseCodePreview',
      'code-tree': 'ProseCodeTree',
      'collapsible': 'ProseCollapsible',
      'field': 'ProseField',
      'field-group': 'ProseFieldGroup',
      'icon': 'ProseIcon',
      'kbd': 'ProseKbd',
      'note': 'ProseNote',
      'steps': 'ProseSteps',
      'tabs': 'ProseTabs',
      'tabs-item': 'ProseTabsItem',
      'tip': 'ProseTip',
      'warning': 'ProseWarning'
    }
  }
}
```

### How It Works

| MDC Syntax | Vue Component | Location |
|------------|---------------|----------|
| `::tabs` | `ProseTabs.vue` | `components/content/` or global |
| `::tabs-item{label="Tab 1"}` | `ProseTabsItem.vue` | `components/content/` or global |
| `::note` | `ProseNote.vue` | `components/content/` or global |

### For @pleaseai/docs (without @nuxt/ui)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  mdc: {
    components: {
      map: {
        'tabs': 'Tabs',
        'tabs-item': 'TabsItem',
        'note': 'Note',
        'tip': 'Tip',
        'warning': 'Warning',
        'caution': 'Caution',
        // custom mappings for components in components/content/
      }
    }
  }
})
```

---

## 7. Component Mapping

| Docus (nuxt-ui)      | Layer (shadcn-vue)          |
| -------------------- | --------------------------- |
| `UApp`               | Remove (plain div)          |
| `UHeader`            | Custom `AppHeader.vue`      |
| `UFooter`            | Custom `AppFooter.vue`      |
| `UPage`              | CSS Grid layout             |
| `UPageAside`         | shadcn `Sidebar`            |
| `UContentNavigation` | `DocsSidebar.vue`           |
| `UContentToc`        | `DocsTableOfContents.vue`   |
| `UContentSurround`   | `DocsPageNav.vue`           |
| `UContentSearch`     | shadcn `Command` + `Dialog` |
| `UButton`            | shadcn `Button`             |
| `UColorModeButton`   | `ModeSwitcher.vue`          |

---

## 8. Key Files to Reference

### From Docus

- `modules/config.ts` - Configuration module pattern
- `modules/routing.ts` - Routing with i18n support
- `content.config.ts` - Content collections
- `app/composables/useDocusI18n.ts` - i18n composable
- `app/pages/[[lang]]/[...slug].vue` - Docs page

### From shadcn-vue

- `assets/css/main.css` - Tailwind v4 theme
- `registry/new-york-v4/ui/sidebar/` - Sidebar components
- `registry/new-york-v4/ui/command/` - Command palette
- `components/DocsSidebar.vue` - Sidebar implementation
- `components/DocsTableOfContents.vue` - TOC
- `composables/useNavigation.ts` - Navigation

### From Nuxt UI (`ref/ui`)

- `src/module.ts` - MDC component mapping (line 188-213)
- `src/runtime/components/prose/Tabs.vue` - MDC tabs container
- `src/runtime/components/prose/TabsItem.vue` - Tab item wrapper
- `src/runtime/components/Tabs.vue` - Base tabs component (UTabs)

### From MDC (`ref/mdc`)

- `src/runtime/components/prose/` - All default prose components

### From Nuxt Content (`ref/content`)

- `src/runtime/components/ContentRenderer.vue` - Content rendering
- `docs/content/` - Documentation examples with MDC syntax

---

## 9. Dependencies

### Docus

```json
{
  "@nuxt/ui": "^4.2.1",
  "@nuxt/content": "^3.8.2",
  "@nuxtjs/i18n": "^10.2.1",
  "nuxt-og-image": "^5.1.12",
  "tailwindcss": "^4.1.17"
}
```

### shadcn-vue

```json
{
  "reka-ui": "^2.2.1",
  "@nuxt/content": "^3.8.2",
  "nuxt-shiki": "^0.3.1",
  "tailwindcss": "^4.1.17",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.2",
  "lucide-vue-next": "^0.513.0"
}
```

---

## 10. Design Decisions for @pleaseai/docs

1. **No nuxt-ui** - Use reka-ui primitives via shadcn-vue
2. **Tailwind v4** - oklch colors, @theme inline
3. **Hybrid approach** - Docus modules + shadcn components
4. **English only initially** - i18n-ready structure
5. **Copy components** - Full control, no external runtime
