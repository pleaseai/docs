<script setup lang="ts">
import { Separator } from '~/components/ui/separator'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () =>
  queryCollection('docs').path(route.path).first(),
)

const { data: surround } = await useAsyncData(`surround-${route.path}`, () =>
  queryCollectionItemSurroundings('docs', route.path),
)

// Extract TOC from page body
const toc = computed(() => {
  if (!page.value?.body) return []

  const headings: { id: string, text: string, depth: number }[] = []

  function extractHeadings(node: any) {
    if (node.tag && node.tag.match(/^h[2-4]$/)) {
      const id = node.props?.id
      const text = extractText(node.children)
      const depth = parseInt(node.tag.charAt(1))
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

  function extractText(children: any[]): string {
    if (!children) return ''
    return children
      .map((child) => {
        if (typeof child === 'string') return child
        if (child.children) return extractText(child.children)
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

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <DocsPageHeader
      :title="page.title"
      :description="page.description"
    />

    <Separator class="my-6" />

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>

    <DocsPageNav
      :prev="surround?.[0]"
      :next="surround?.[1]"
    />
  </div>
  <div v-else class="py-12 text-center">
    <h1 class="text-2xl font-bold">
      Page not found
    </h1>
    <p class="mt-2 text-muted-foreground">
      The page you're looking for doesn't exist.
    </p>
  </div>
</template>
