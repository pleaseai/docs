<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () =>
  queryCollection('docs').path(route.path).first())

const { data: surround } = await useAsyncData(`surround-${route.path}`, () =>
  queryCollectionItemSurroundings('docs', route.path))

const { data: navigation } = await useNavigation()

const breadcrumbs = computed(() => findPageBreadcrumbs(navigation.value, route.path))

// Extract TOC from page body
const _toc = computed(() => {
  if (!page.value?.body)
    return []

  const headings: { id: string, text: string, depth: number }[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractHeadings(node: any) {
    if (node.tag && node.tag.match(/^h[2-4]$/)) {
      const id = node.props?.id
      const text = extractText(node.children)
      const depth = Number.parseInt(node.tag.charAt(1))
      if (id && text) {
        headings.push({ id, text, depth })
      }
    }
    if (node.children) {
      for (const child of node.children) {
        extractHeadings(child)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractText(children: any[]): string {
    if (!children)
      return ''
    return children
      .map((child) => {
        if (typeof child === 'string')
          return child
        if (child.children)
          return extractText(child.children)
        return ''
      })
      .join('')
  }

  if (page.value.body.children) {
    for (const child of page.value.body.children) {
      extractHeadings(child)
    }
  }

  return headings
})

useSeo({
  title: () => page.value?.title,
  description: () => page.value?.description,
  type: 'article',
  publishedAt: () => (page.value as { publishedAt?: string } | null | undefined)?.publishedAt,
  modifiedAt: () => (page.value as { modifiedAt?: string } | null | undefined)?.modifiedAt,
  breadcrumbs,
})

// Register raw markdown variant so static builds expose /raw/*.md for AI agents.
// Only register when a source page actually exists — otherwise crawler-discovered
// section index routes try to prerender a /raw/*.md that has no backing file and 404.
if (import.meta.server && page.value) {
  prerenderRoutes(`/raw${route.path}.md`)
}
</script>

<template>
  <div v-if="page">
    <DocsPageHeader
      :title="page.title"
      :description="page.description"
    />

    <UiSeparator class="my-6" />

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>

    <DocsPageNav
      :prev="surround?.[0]"
      :next="surround?.[1]"
    />
  </div>
  <div
    v-else
    class="py-12 text-center"
  >
    <h1 class="text-2xl font-bold">
      Page not found
    </h1>
    <p class="mt-2 text-muted-foreground">
      The page you're looking for doesn't exist.
    </p>
  </div>
</template>
