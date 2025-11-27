import type { ContentNavigationItem } from '@nuxt/content'

export type NavigationItemType = 'page' | 'group'

export interface NavigationItem {
  title: string
  path: string
  stem?: string
  children?: NavigationItem[]
  page?: false
  type?: NavigationItemType
  [key: string]: unknown
}

function navigationItemType(item: ContentNavigationItem): NavigationItemType {
  if (item.children && item.children.length > 0) {
    return 'group'
  }
  return 'page'
}

function mapWithType(item: ContentNavigationItem): NavigationItem {
  return {
    ...item,
    type: navigationItemType(item),
    children: item.children?.map(child => mapWithType(child)),
  }
}

export async function useNavigation() {
  const { data } = useAsyncData('navigation', () => {
    return queryCollectionNavigation('docs')
  }, {
    default: () => ([]),
    transform: (data) => {
      return data.map(item => mapWithType(item))
    },
  })

  return {
    data,
  }
}
