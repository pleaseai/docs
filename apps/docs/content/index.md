---
title: PleaseAI Docs
seo:
  title: Write beautiful docs with Markdown
  description: Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box. Built with shadcn-vue and Nuxt Content.
---

::PageHero
#headline
docs-please

#title
Write beautiful docs with Markdown.

#description
Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box. Built with **shadcn-vue** and **Nuxt Content**.

#links
  :::ButtonA{to="/docs/getting-started/introduction" size="lg"}
  Get Started
  :::

  :::ButtonA{to="https://github.com/pleaseai/docs" target="_blank" variant="outline" size="lg"}
  GitHub
  :::
::

::PageSection{headline="Features"}
#title
Everything you need for documentation

#description
A complete documentation solution with modern tooling and beautiful design.

  :::div{.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-6.mt-8}
    ::::PageCard{title="shadcn-vue Components" icon="lucide:component"}
    #description
    Beautiful, accessible UI components built with Reka UI primitives and styled with Tailwind CSS.
    ::::

    ::::PageCard{title="Tailwind CSS v4" icon="lucide:palette"}
    #description
    Modern CSS with native CSS variables, oklch colors, and lightning-fast performance.
    ::::

    ::::PageCard{title="Dark Mode" icon="lucide:moon"}
    #description
    Built-in dark/light mode support with smooth transitions and system preference detection.
    ::::

    ::::PageCard{title="MDC Syntax" icon="lucide:file-code"}
    #description
    Write pages in Markdown and extend with MDC syntax to embed Vue components seamlessly.
    ::::

    ::::PageCard{title="Full-text Search" icon="lucide:search"}
    #description
    Auto-generated navigation and full-text search for your documentation.
    ::::

    ::::PageCard{title="Nuxt Layer" icon="lucide:layers"}
    #description
    Reusable Nuxt layer architecture - extend and customize to fit your needs.
    ::::
  :::
::

::PageSection{headline="Quick Start"}
#title
Get started in minutes

#description
Install the layer and start writing your documentation.

```bash
npm install docs-please
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['docs-please']
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
::

::PageSection{headline="Documentation"}
#title
Explore the documentation

#description
Learn more about features and customization options.

#links
  :::ButtonA{to="/docs/getting-started/introduction"}
  Introduction
  :::

  :::ButtonA{to="/docs/components/overview" variant="outline"}
  Components
  :::
::
