<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
}

const props = defineProps<{
  toc?: TocItem[]
}>()

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-80px 0px -80% 0px',
    },
  )

  props.toc?.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el)
      observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <nav v-if="toc?.length" class="sticky top-20 -ml-2 h-[calc(100vh-5rem)] overflow-y-auto pb-10">
    <p class="mb-4 text-sm font-semibold">
      On this page
    </p>
    <ul class="space-y-2 text-sm">
      <li
        v-for="item in toc"
        :key="item.id"
        :style="{ paddingLeft: `${(item.depth - 2) * 12}px` }"
      >
        <a
          :href="`#${item.id}`"
          class="block py-1 text-muted-foreground transition-colors hover:text-foreground"
          :class="[
            activeId === item.id && 'font-medium text-foreground',
          ]"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
