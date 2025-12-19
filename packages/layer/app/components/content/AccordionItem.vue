<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { cn } from '~/lib/utils'

export interface AccordionItemProps {
  /**
   * The label displayed in the accordion trigger.
   */
  label: string
  /**
   * Optional icon name for the accordion item.
   */
  icon?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<AccordionItemProps>()
defineSlots<{
  default(): VNode[]
}>()
</script>

<template>
  <div :class="cn('text-left', props.class)">
    <slot />
  </div>
</template>
