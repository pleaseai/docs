import { addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { joinURL } from 'ufo'

export default defineNuxtModule({
  meta: {
    name: 'docs-css',
  },
  async setup(_options, nuxt) {
    const dir = nuxt.options.rootDir
    const resolver = createResolver(import.meta.url)

    const contentDir = joinURL(dir, 'content')
    const layerDir = resolver.resolve('../app')

    // Create a CSS template that includes source directives for Tailwind
    const cssTemplate = addTemplate({
      filename: 'docs-layer.css',
      getContents: () => {
        return `/* Auto-generated Tailwind source directives */
@source "${contentDir.replace(/\\/g, '/')}/**/*";
@source "${layerDir.replace(/\\/g, '/')}/**/*";
@source "../../app.config.ts";`
      },
    })

    // Add the generated CSS file to Nuxt
    nuxt.options.css.push(cssTemplate.dst)
  },
})
