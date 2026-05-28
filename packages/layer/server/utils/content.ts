interface LocaleEntry {
  code: string
}

interface RuntimePublicI18n {
  locales?: Array<string | LocaleEntry>
}

/**
 * Resolve the available i18n locale codes from a runtime public config object.
 * Returns an empty array when i18n is not configured.
 */
export function getAvailableLocales(publicConfig: Record<string, unknown>): string[] {
  const i18n = publicConfig.i18n as RuntimePublicI18n | undefined
  if (!i18n?.locales)
    return []
  return i18n.locales.map(locale => typeof locale === 'string' ? locale : locale.code)
}

/**
 * Build the list of content collection names to query based on the requested
 * locale and the available i18n locales.
 *
 * - When a specific locale is given on an i18n site:
 *   - if recognized → `['docs_<locale>']`
 *   - if not recognized → `[]` (so the caller returns no pages instead of
 *     silently falling back to every other language)
 * - When a specific locale is given on a non-i18n site → `['docs']`
 *   (single-locale sites have no concept of "wrong locale")
 * - When no locale is given and i18n is configured → one collection per
 *   locale (`docs_<lc>`)
 * - Otherwise → `['docs']`
 */
export function getCollectionsToQuery(locale: string | undefined, availableLocales: string[]): string[] {
  if (locale) {
    if (availableLocales.length === 0)
      return ['docs']
    return availableLocales.includes(locale) ? [`docs_${locale}`] : []
  }

  return availableLocales.length > 0
    ? availableLocales.map(l => `docs_${l}`)
    : ['docs']
}

/**
 * Whether the given content path points at a `.navigation` metadata file
 * (those are internal and should be excluded from public listings).
 */
export function isNavigationPath(path: string): boolean {
  return path.endsWith('.navigation') || path.includes('/.navigation/')
}

/**
 * Derive the content collection name from a content path. If the path's first
 * segment is a known locale, return the locale-suffixed `docs_<lc>` collection,
 * otherwise return the default `docs` collection.
 */
export function getCollectionFromPath(path: string, availableLocales: string[]): string {
  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  if (firstSegment && availableLocales.includes(firstSegment))
    return `docs_${firstSegment}`

  return 'docs'
}
