import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { joinURL } from 'ufo'
import { docsFolderExists, landingPageExists } from './utils/pages'

const { options } = useNuxt()
const cwd = joinURL(options.rootDir, 'content')

const hasLandingPage = landingPageExists(options.rootDir)
const hasDocsFolder = docsFolderExists(options.rootDir)

const docsSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional(),
  })).optional(),
})

const collections: Record<string, ReturnType<typeof defineCollection>> = {
  docs: defineCollection({
    type: 'page',
    source: {
      cwd,
      include: hasDocsFolder ? 'docs/**' : '**',
      prefix: hasDocsFolder ? '/docs' : '/',
      exclude: ['index.md'],
    },
    schema: docsSchema,
  }),
}

// Only define the landing collection when the consuming app does not ship its own index.vue
if (!hasLandingPage) {
  collections.landing = defineCollection({
    type: 'page',
    source: {
      cwd,
      include: 'index.md',
    },
  })
}

export default defineContentConfig({ collections })
