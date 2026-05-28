import type { Collections } from '@nuxt/content'
import { queryCollection } from '@nuxt/content/server'
import { joinURL, withLeadingSlash } from 'ufo'
import { z } from 'zod'
import { inferSiteURL } from '../../../utils/meta'
import { getAvailableLocales, getCollectionFromPath, isNavigationPath } from '../../utils/content'

export default defineMcpTool({
  description: `Retrieves the full content and details of a specific documentation page.

WHEN TO USE: Use this tool when you know the EXACT path to a documentation page. Common use cases:
- User asks for a specific page: "Show me the getting started guide" -> /en/getting-started/installation
- User asks about a known topic with a dedicated page
- You found a relevant path from list-pages and want the full content
- User references a specific section or guide they want to read

WHEN NOT TO USE: If you don't know the exact path and need to search/explore, use list-pages first.

WORKFLOW: This tool returns the complete page content including title, description, and full markdown. Use this when you need to provide detailed answers or code examples from specific documentation pages.
`,
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  inputSchema: {
    path: z.string().describe(
      'The page path from list-pages or provided by the user (e.g., /en/getting-started/installation)',
    ),
  },
  inputExamples: [
    { path: '/en/getting-started/installation' },
    { path: '/getting-started/introduction' },
  ],
  cache: '1h',
  handler: async ({ path }) => {
    if (isNavigationPath(path))
      throw createError({ statusCode: 404, message: 'Page not found' })

    const event = useEvent()
    const config = useRuntimeConfig(event)
    const publicConfig = config.public as Record<string, unknown>
    const siteUrl = getRequestURL(event).origin || inferSiteURL()
    const baseURL = config.app?.baseURL || '/'

    const availableLocales = getAvailableLocales(publicConfig)
    const collectionName = availableLocales.length > 0
      ? getCollectionFromPath(path, availableLocales)
      : 'docs'

    try {
      const page = await queryCollection(event, collectionName as keyof Collections)
        .path(path)
        .select('title', 'path', 'description')
        .first() as { title: string, path: string, description: string } | null

      if (!page)
        throw createError({ statusCode: 404, message: 'Page not found' })

      // Normalize so we always produce `/raw<path>.md` with a single leading slash.
      const rawPath = `/raw${withLeadingSlash(path)}.md`
      const content = await event.$fetch<string>(rawPath)

      return {
        title: page.title,
        path: page.path,
        description: page.description,
        content,
        url: siteUrl ? joinURL(siteUrl, baseURL, page.path) : joinURL(baseURL, page.path),
      }
    }
    catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404)
        throw error
      throw createError({ statusCode: 500, message: 'Failed to get page' })
    }
  },
})
