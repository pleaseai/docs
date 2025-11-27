---
title: PleaseAI Docs
description: Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box. Built with shadcn-vue and Nuxt Content.
---

::div{.flex.flex-col.items-center.text-center.py-16.md:py-24}

# Write beautiful docs with Markdown.

Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box.

Built with **shadcn-vue** and **Nuxt Content**.

::div{.flex.flex-wrap.justify-center.gap-4.mt-8}
  ::ButtonA{to="/docs"}
  Get Started
  ::

  ::ButtonA{to="https://github.com/pleaseai/docs" target="_blank" external}
  GitHub
  ::
::

::

---

## Features

::div{.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-6.mt-8}

::div{.rounded-lg.border.bg-card.p-6}
### shadcn-vue Components
Beautiful, accessible UI components built with Reka UI primitives and styled with Tailwind CSS.
::

::div{.rounded-lg.border.bg-card.p-6}
### Tailwind CSS v4
Modern CSS with native CSS variables, oklch colors, and lightning-fast performance.
::

::div{.rounded-lg.border.bg-card.p-6}
### Dark Mode
Built-in dark/light mode support with smooth transitions and system preference detection.
::

::div{.rounded-lg.border.bg-card.p-6}
### MDC Syntax
Write pages in Markdown and extend with MDC syntax to embed Vue components seamlessly.
::

::div{.rounded-lg.border.bg-card.p-6}
### Full-text Search
Auto-generated navigation and full-text search for your documentation.
::

::div{.rounded-lg.border.bg-card.p-6}
### Nuxt Layer
Reusable Nuxt layer architecture - extend and customize to fit your needs.
::

::

---

## Quick Start

```bash
npm install @pleaseai/docs
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@pleaseai/docs']
})
```

```md [content/docs/index.md]
---
title: Introduction
description: Getting started with your documentation
---

# Welcome

Start writing your documentation in Markdown.
```

---

## Documentation

Explore the documentation to learn more about features and customization options.

::div{.flex.flex-wrap.gap-4.mt-6}
  ::ButtonA{to="/docs/getting-started/introduction"}
  Introduction
  ::

  ::ButtonA{to="/docs/components/overview"}
  Components
  ::
::
