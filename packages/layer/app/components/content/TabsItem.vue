<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'

export interface TabsItemProps {
  /**
   * The label displayed in the tab trigger.
   */
  label: string
  /**
   * Optional icon name for the tab.
   */
  icon?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<TabsItemProps>()
defineSlots<{
  default(): VNode[]
}>()
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
