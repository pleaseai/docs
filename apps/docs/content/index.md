---
title: PleaseAI Docs
seo:
  title: Write beautiful docs with Markdown
  description: Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box. Built with shadcn-vue and Nuxt Content.
---

::u-page-hero
#headline
  :::u-button{to="https://github.com/pleaseai/docs/releases" target="_blank" variant="outline" size="sm"}
  docs-please v1.0 →
  :::

#title
Write beautiful docs with Markdown.

#description
Ship fast, flexible, and SEO-optimized documentation with beautiful design out of the box. Built with **shadcn-vue** and **Nuxt Content**.

#links
  :::u-button{to="/docs/getting-started/introduction" size="lg"}
  Get Started →
  :::

  :::u-button{to="https://github.com/pleaseai/docs" target="_blank" variant="outline" size="lg"}
  Star on GitHub
  :::
::

::u-page-section
  :::u-page-grid{class="lg:grid-cols-2"}
    ::::u-page-card
    ---
    spotlight: true
    class: col-span-1
    target: _blank
    to: https://nuxt.com
    ---
      :::::floating-nuxt
      :::::

    #title
    Built with [Nuxt 4]{.text-primary}

    #description
    Optimized by the most famous Vue framework. Everything you need to build fast, performant, and SEO-friendly documentation websites.
    ::::

    ::::u-page-card{to="https://ui.shadcn.com" target="_blank" class="col-span-1"}
    #title
    Powered by [shadcn-vue]{.text-primary}

    #description
    Beautiful, accessible UI components built with Reka UI primitives. Minimal by design but highly customizable for your documentation needs.
    ::::

    ::::u-page-card{class="col-span-1 lg:col-span-2"}
    #title
    Enhanced Markdown syntax by [Nuxt Content]{.text-primary}

    #description
    Write your pages in Markdown and extend with MDC syntax to embed Vue components seamlessly. Structure, routing, and rendering are handled for you.

    #body
      :::::callout{title="Note" variant="default" class="mt-4"}
      Here's some additional information for you.
      :::::

      :::::callout{title="Tip" variant="default" class="mt-2"}
      Here's a helpful suggestion.
      :::::
    ::::

    ::::u-page-card{class="col-span-1"}
    #title
    Customize with [App Config]{.text-primary}

    #description
    Update colors, social links, header logos and component styles globally using `app.config.ts`, no direct code modifications required.

    #body
    ```ts [app.config.ts]
    export default defineAppConfig({
      docs: {
        title: 'My Docs',
        github: {
          owner: 'myorg',
          name: 'my-docs'
        }
      }
    })
    ```
    ::::

    ::::u-page-card{class="col-span-1"}
    #title
    [Dark Mode]{.text-primary} built-in

    #description
    Built-in dark/light mode support with smooth transitions and system preference detection. No configuration required.
    ::::

    ::::u-page-card{class="col-span-1 lg:col-span-2"}
    #title
    Built-in navigation and [full-text search]{.text-primary}

    #description
    Only focus on ordering your content. Auto-generated side navigation and full-text search are built-in to help users find what they need.
    ::::
  :::
::
