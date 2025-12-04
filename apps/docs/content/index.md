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

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    ---
      :::::tabs
        ::::::tabs-item{label="Preview" icon="lucide:eye" class="mt-5"}
        :::::::div{class="flex flex-col gap-4"}
          ::::::::note{class="my-0"}
          Here's some additional information for you.
          ::::::::

          ::::::::tip{class="my-0"}
          Here's a helpful suggestion.
          ::::::::

          ::::::::warning{class="my-0"}
          Be careful with this action as it might have unexpected results.
          ::::::::

          ::::::::caution{class="my-0"}
          This action cannot be undone.
          ::::::::
        :::::::
        ::::::

        ::::::tabs-item{label="Code" icon="lucide:code" class="mt-5 mb-2 text-xs overflow-x-auto"}
        ```mdc
        ::note
        Here's some additional information.
        ::

        ::tip
        Here's a helpful suggestion.
        ::

        ::warning
        Be careful with this action.
        ::

        ::caution
        This action cannot be undone.
        ::
        ```
        ::::::
      :::::

    #title
    Enhanced Markdown syntax by [Nuxt Content]{.text-primary}

    #description
    Write your pages in Markdown and extend with MDC syntax to embed Vue components seamlessly. Structure, routing, and rendering are handled for you.
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

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-1 min-h-[450px]
    ---
      :::::color-mode-switch
      :::::

    #title
    [Color Mode]{.text-primary} built-in

    #description
    Built-in dark mode provided, no configuration required.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    ---
      :::::u-color-mode-image
      ---
      height: 554
      width: 859
      alt: Built-in navigation and full-text search
      class: rounded-lg
      dark: /landing/dark/command-menu.png
      format: webp
      light: /landing/light/command-menu.png
      loading: lazy
      ---
      :::::

    #title
    Built-in navigation and [full-text search]{.text-primary}

    #description
    Only focus on ordering your content. Auto-generated side navigation and full-text search are built-in to help users find what they need.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    target: _blank
    ---
      :::::browser-frame
      :video{class="rounded-md" controls loop playsinline src="https://res.cloudinary.com/nuxt/video/upload/v1747230893/studio/wzt9zfmdvk7hgmdx3cnt.mp4"}
      :::::

    #title
    Collaborate on [Nuxt Studio]{.text-primary}

    #description
    Write and manage your content visually, with zero Markdown knowledge required. Let your non technical colleagues collaborate on the documentation and integrate Vue components without code skills.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    target: _blank
    to: https://image.nuxt.com/
    ---
      :::::div{class="flex-1 flex items-center justify-center"}
        ::::::u-color-mode-image
        ---
        alt: Nuxt Image visual
        class: w-[30%] lg:w-[70%] my-12 lg:my-0
        dark: /landing/dark/nuxt-image.svg
        light: /landing/light/nuxt-image.svg
        ---
        ::::::
      :::::

    #title
    [Nuxt Image]{.text-primary} optimization

    #description
    Automatically converts Markdown images to use `<NuxtImg>` for optimized loading.
    ::::
  :::
::
