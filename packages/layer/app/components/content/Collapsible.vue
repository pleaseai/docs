<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import {
  Collapsible as UICollapsible,
  CollapsibleContent as UICollapsibleContent,
  CollapsibleTrigger as UICollapsibleTrigger,
} from '~/components/ui/collapsible'

export interface CollapsibleProps {
  /**
   * The trigger label text.
   * @default 'Show props'
   */
  label?: string
  /**
   * Whether the collapsible is open by default.
   * @default false
   */
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CollapsibleProps>(), {
  label: 'Show props',
  defaultOpen: false,
})

defineSlots<{
  default(): VNode[]
}>()

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <UICollapsible
    v-model:open="isOpen"
    :class="cn('mt-4', props.class)"
  >
    <UICollapsibleTrigger
      class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ChevronDown
        class="size-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
      <span>{{ label }}</span>
    </UICollapsibleTrigger>
    <UICollapsibleContent class="mt-2 text-left [&_[data-slot=prose-table]]:my-0 [&_[data-slot=prose-table]]:border-0 [&_[data-slot=prose-table]]:rounded-none">
      <slot />
    </UICollapsibleContent>
  </UICollapsible>
</template>
