import type { ContentNavigationItem } from '@nuxt/content'

export const flattenNavigation = (items?: ContentNavigationItem[]): ContentNavigationItem[] => items?.flatMap(
  item => item.children
    ? flattenNavigation(item.children)
    : [item],
) || []

/**
 * Strip locale and/or `/docs` levels off the navigation tree so consumers can
 * render a clean sidebar regardless of source layout.
 */
export function transformNavigation(
  data: ContentNavigationItem[],
  isI18nEnabled: boolean,
  locale?: string,
): ContentNavigationItem[] {
  if (isI18nEnabled && locale) {
    const localeResult = data.find(item => item.path === `/${locale}`)?.children || data
    return localeResult.find(item => item.path === `/${locale}/docs`)?.children || localeResult
  }

  return data.find(item => item.path === '/docs')?.children || data
}

export interface BreadcrumbItem {
  title: string
  path: string
}

/**
 * Walk the navigation tree to build a breadcrumb trail leading to `path`.
 * Returns undefined when the path is not present in the navigation.
 */
export function findPageBreadcrumbs(
  navigation: ContentNavigationItem[] | undefined,
  path: string,
  currentPath: BreadcrumbItem[] = [],
): BreadcrumbItem[] | undefined {
  if (!navigation) return undefined

  for (const item of navigation) {
    const itemPath = [...currentPath, { title: item.title, path: item.path }]

    if (item.path === path) {
      return itemPath
    }

    if (item.children) {
      const found = findPageBreadcrumbs(item.children, path, itemPath)
      if (found) return found
    }
  }

  return undefined
}
