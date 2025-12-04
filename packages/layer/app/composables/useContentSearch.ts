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

export function flattenNavigation(items: NavigationItem[], prefix = ''): SearchItem[] {
  return items.flatMap((item) => {
    const result: SearchItem[] = []

    if (item.type === 'page' && item.path) {
      result.push({
        id: item.path,
        label: item.title,
        to: item.path,
        prefix: prefix || undefined,
      })
    }

    if (item.children?.length) {
      result.push(...flattenNavigation(item.children, item.title))
    }

    return result
  })
}
