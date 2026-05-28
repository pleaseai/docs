import type { MaybeRefOrGetter } from 'vue'
import type { BreadcrumbItem } from '../utils/navigation'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { inferSiteURL } from '../../utils/site-url'

export interface UseSeoOptions {
  /**
   * Page title.
   */
  title: MaybeRefOrGetter<string | undefined>
  /**
   * Page description.
   */
  description: MaybeRefOrGetter<string | undefined>
  /**
   * Page type for `og:type` (default: `'article'`).
   */
  type?: MaybeRefOrGetter<'website' | 'article'>
  /**
   * Custom OG image URL (absolute).
   */
  ogImage?: MaybeRefOrGetter<string | undefined>
  /**
   * Published date (ISO string) for Article schema.
   */
  publishedAt?: MaybeRefOrGetter<string | undefined>
  /**
   * Modified date (ISO string) for Article schema.
   */
  modifiedAt?: MaybeRefOrGetter<string | undefined>
  /**
   * Breadcrumb trail for BreadcrumbList schema.
   */
  breadcrumbs?: MaybeRefOrGetter<BreadcrumbItem[] | undefined>
}

type JsonLdScript = {
  type: 'application/ld+json'
  textContent: string
} & { [key: `data-${string}`]: string }

type LinkTag = {
  rel: string
  href?: string
  hreflang?: string
} & { [key: `data-${string}`]: string }

/**
 * Comprehensive SEO setup for documentation pages:
 *
 * - Title/description meta + OpenGraph + Twitter card tags
 * - Canonical `<link>` resolved from app config / inferred site URL
 * - JSON-LD structured data (Article or WebSite, optional BreadcrumbList)
 *
 * Ported from upstream docus commit `d283f9aa`
 * (`feat(layer): add more seo optimization`). Hreflang emission is deferred
 * until `@nuxtjs/i18n` is wired into the layer.
 */
export function useSeo(options: UseSeoOptions): void {
  const route = useRoute()
  const appConfig = useAppConfig()

  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  const type = computed<'website' | 'article'>(() => toValue(options.type) ?? 'article')
  const ogImage = computed(() => toValue(options.ogImage))
  const publishedAt = computed(() => toValue(options.publishedAt))
  const modifiedAt = computed(() => toValue(options.modifiedAt))
  const breadcrumbs = computed(() => toValue(options.breadcrumbs))

  // Resolve a usable site URL: prefer the explicit app config (populated by
  // `modules/config.ts` at build time), fall back to env inference for
  // server-side rendering.
  const baseUrl = computed<string | undefined>(() => {
    const configured = appConfig.docs?.url
    const resolved = (typeof configured === 'string' && configured.length > 0)
      ? configured
      : inferSiteURL()
    return resolved ? withoutTrailingSlash(resolved) : undefined
  })

  const canonicalUrl = computed<string | undefined>(() => {
    if (!baseUrl.value) return undefined
    return joinURL(baseUrl.value, route.path)
  })

  const siteName = computed<string | undefined>(() => {
    const name = appConfig.docs?.title
    return typeof name === 'string' && name.length > 0 ? name : undefined
  })

  // Standard meta tags (title/description/OG/Twitter).
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  })

  // Canonical + (future) hreflang links.
  useHead({
    link: computed<LinkTag[]>(() => {
      const links: LinkTag[] = []

      if (canonicalUrl.value) {
        links.push({ rel: 'canonical', href: canonicalUrl.value })
      }

      // TODO: emit hreflang tags once @nuxtjs/i18n is wired in
      // (upstream uses runtimeConfig.public.i18n).

      return links
    }),
  })

  // JSON-LD structured data.
  useHead({
    script: computed<JsonLdScript[]>(() => {
      const scripts: JsonLdScript[] = []

      if (!baseUrl.value) return scripts

      const pageUrl = joinURL(baseUrl.value, route.path)

      // Article/WebSite schemas require a title; breadcrumbs do not.
      if (title.value) {
        if (type.value === 'article') {
          const articleSchema: Record<string, unknown> = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': title.value,
            'description': description.value,
            'url': pageUrl,
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': pageUrl,
            },
          }
          if (publishedAt.value) {
            articleSchema.datePublished = publishedAt.value
          }
          if (modifiedAt.value) {
            articleSchema.dateModified = modifiedAt.value
          }
          if (siteName.value) {
            articleSchema.publisher = {
              '@type': 'Organization',
              'name': siteName.value,
            }
          }
          scripts.push({
            type: 'application/ld+json',
            textContent: JSON.stringify(articleSchema),
          })
        }
        else if (type.value === 'website') {
          const websiteSchema: Record<string, unknown> = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': siteName.value ?? title.value,
            'description': description.value,
            'url': baseUrl.value,
          }
          scripts.push({
            type: 'application/ld+json',
            textContent: JSON.stringify(websiteSchema),
          })
        }
      }

      if (breadcrumbs.value && breadcrumbs.value.length > 0) {
        const breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': breadcrumbs.value.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.title,
            'item': joinURL(baseUrl.value!, item.path),
          })),
        }
        scripts.push({
          type: 'application/ld+json',
          textContent: JSON.stringify(breadcrumbSchema),
        })
      }

      return scripts
    }),
  })
}
