<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Kbd, KbdGroup } from '~/components/ui/kbd'
import { useContentSearch } from '~/composables/useContentSearch'

interface Props {
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const { open } = useContentSearch()

const isMac = computed(() => {
  if (import.meta.server) return true
  return navigator.platform.toUpperCase().includes('MAC')
})
</script>

<template>
  <Button
    v-if="collapsed"
    variant="ghost"
    size="icon"
    aria-label="Search documentation"
    @click="open = true"
  >
    <Search class="size-5" />
  </Button>
  <Button
    v-else
    variant="outline"
    class="relative h-8 w-full max-w-sm justify-start bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64"
    @click="open = true"
  >
    <Search class="mr-2 size-4" />
    <span class="hidden lg:inline-flex">Search documentation...</span>
    <span class="inline-flex lg:hidden">Search...</span>
    <div class="absolute right-1.5 top-1.5 hidden gap-1 sm:flex">
      <ClientOnly>
        <KbdGroup>
          <Kbd class="border">{{ isMac ? '⌘' : 'Ctrl' }}</Kbd>
          <Kbd class="border">K</Kbd>
        </KbdGroup>
      </ClientOnly>
    </div>
  </Button>
</template>
