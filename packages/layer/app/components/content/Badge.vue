<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { cn } from '~/lib/utils'

export interface BadgeProps {
  /**
   * Badge color variant.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'primary',
})

defineSlots<{
  default(): VNode[]
}>()

const colorClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border-secondary',
  success: 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400',
  warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  muted: 'bg-muted text-muted-foreground border-border',
}
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
      colorClasses[color],
      props.class,
    )"
  >
    <slot mdc-unwrap="p" />
  </span>
</template>
