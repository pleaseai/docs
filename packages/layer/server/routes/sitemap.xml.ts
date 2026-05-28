import type { Collections } from '@nuxt/content'
import { queryCollection } from '@nuxt/content/server'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { inferSiteURL } from '../../utils/meta'

interface SitemapUrl {
  loc: string
  lastmod?: string
}

interface RuntimePublicI18n {
  locales?: Array<string | { code: string }>
}

function getAvailableLocales(publicConfig: Record<string, unknown>): string[] {
  const i18n = publicConfig.i18n as RuntimePublicI18n | undefined
  if (!i18n?.locales) return []
  return i18n.locales.map(locale => typeof locale === 'string' ? locale : locale.code)
}

function isNavigationPath(path: string): boolean {
  return path.endsWith('.navigation') || path.includes('/.navigation/')
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return char
    }
  })
}

function buildSitemap(urls: SitemapUrl[], siteUrl: string): string {
  const base = withoutTrailingSlash(siteUrl)
  const entries = urls
    .map((url) => {
      const loc = joinURL(base, url.loc)
      let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>`
      if (url.lastmod) {
        entry += `\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>`
      }
      entry += `\n  </url>`
      return entry
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = inferSiteURL()

  // Sitemap protocol requires absolute <loc> URLs. Without a site URL we have
  // no way to produce valid entries — return 404 so consumers don't index a
  // broken sitemap.
  if (!siteUrl) {
    throw createError({ statusCode: 404, statusMessage: 'Sitemap unavailable: site URL is not configured.' })
  }

  const baseURL = config.app?.baseURL || '/'

  const availableLocales = getAvailableLocales(config.public as Record<string, unknown>)
  const collections: string[] = availableLocales.length > 0
    ? availableLocales.map(locale => `docs_${locale}`)
    : ['docs']

  if (availableLocales.length > 0) {
    for (const locale of availableLocales) {
      collections.push(`landing_${locale}`)
    }
  }
  else {
    collections.push('landing')
  }

  const urls: SitemapUrl[] = []

  for (const collection of collections) {
    try {
      const pages = await queryCollection(event, collection as keyof Collections)
        .select('path', 'sitemap' as never)
        .all() as Array<Record<string, unknown> & { path?: string }>

      for (const page of pages) {
        const meta = page as Record<string, unknown>
        const pagePath = page.path || '/'

        if (meta.sitemap === false) continue
        if (isNavigationPath(pagePath)) continue

        urls.push({ loc: joinURL(baseURL, pagePath) })
      }
    }
    catch {
      // Collection may not exist (e.g. landing is opt-out, or i18n locale
      // collections are not registered yet). Skip silently.
    }
  }

  setResponseHeader(event, 'content-type', 'application/xml')
  return buildSitemap(urls, siteUrl)
})
