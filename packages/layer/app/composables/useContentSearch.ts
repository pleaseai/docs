import type { NavigationItem } from './useNavigation'

const open = ref(false)

export interface SearchItem {
  id: string
  label: string
  icon?: Component
  to?: string
  onSelect?: () => void
  prefix?: string
  suffix?: string
  active?: boolean
  disabled?: boolean
  isDoc?: boolean
}

export interface SearchGroup {
  id: string
  label: string
  items: SearchItem[]
}

export function useContentSearch() {
  return {
    open,
  }
}

export function flattenNavigation(items: NavigationItem[], prefix = '', isDocSection = false): SearchItem[] {
  return items.flatMap((item) => {
    const result: SearchItem[] = []
    // Determine if this item is a doc page based on parent context or path
    const itemIsDoc = isDocSection || item.path?.startsWith('/docs')

    if (item.type === 'page' && item.path) {
      result.push({
        id: item.path,
        label: item.title,
        to: item.path,
        prefix: prefix || undefined,
        isDoc: itemIsDoc,
      })
    }

    if (item.children?.length) {
      result.push(...flattenNavigation(item.children, item.title, itemIsDoc))
    }

    return result
  })
}
