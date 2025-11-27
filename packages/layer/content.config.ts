import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const docsSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional(),
  })).optional(),
})

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: {
        include: 'index.md',
      },
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md'],
      },
      schema: docsSchema,
    }),
  },
})
