import { addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { joinURL } from 'ufo'
import { resolveModulePath } from 'exsolve'

export default defineNuxtModule({
  meta: {
    name: 'docs-css',
  },
  async setup(_options, nuxt) {
    const dir = nuxt.options.rootDir
    const resolver = createResolver(import.meta.url)

    const contentDir = joinURL(dir, 'content')
    const layerDir = resolver.resolve('../app')
    const mainCssPath = resolver.resolve('../app/assets/css/main.css')
    const tailwindPath = resolveModulePath('tailwindcss', { from: import.meta.url, conditions: ['style'] })

    // Create a CSS template that includes source directives for Tailwind
    const cssTemplate = addTemplate({
      filename: 'docs-layer.css',
      getContents: () => {
        return `@import ${JSON.stringify(tailwindPath)};

@source "${contentDir.replace(/\\/g, '/')}/**/*";
@source "${layerDir.replace(/\\/g, '/')}/**/*";
@source "../../app.config.ts";

@import ${JSON.stringify(mainCssPath)};`
      },
    })

    // Remove main.css from nuxt.options.css if present (we import it in docs-layer.css)
    nuxt.options.css = nuxt.options.css.filter(css => !css.includes('main.css'))

    // Add the generated CSS file to Nuxt - unshift to load first
    nuxt.options.css.unshift(cssTemplate.dst)
  },
})
