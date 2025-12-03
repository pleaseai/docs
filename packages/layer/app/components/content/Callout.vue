<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertVariants } from '~/components/ui/alert'
import type { Component } from 'vue'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '~/lib/utils'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/components/ui/alert'

export type CalloutType = 'note' | 'tip' | 'warning' | 'caution' | 'info' | 'success' | 'error'

const props = withDefaults(defineProps<{
  icon?: boolean | Component
  title?: string
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
  type?: CalloutType
}>(), {
  icon: true,
})

const typeConfig: Record<CalloutType, { icon: Component, variant: AlertVariants['variant'], defaultTitle: string }> = {
  note: { icon: InfoIcon, variant: 'info', defaultTitle: 'Note' },
  tip: { icon: LightbulbIcon, variant: 'success', defaultTitle: 'Tip' },
  warning: { icon: TriangleAlertIcon, variant: 'warning', defaultTitle: 'Warning' },
  caution: { icon: CircleAlertIcon, variant: 'error', defaultTitle: 'Caution' },
  info: { icon: InfoIcon, variant: 'info', defaultTitle: 'Info' },
  success: { icon: CircleCheckIcon, variant: 'success', defaultTitle: 'Success' },
  error: { icon: CircleXIcon, variant: 'error', defaultTitle: 'Error' },
}

const config = computed(() => {
  if (props.type && typeConfig[props.type]) {
    return typeConfig[props.type]
  }
  return null
})

const resolvedVariant = computed(() => props.variant ?? config.value?.variant ?? 'default')
const resolvedIcon = computed(() => {
  if (props.icon === false) return null
  if (typeof props.icon === 'object') return props.icon
  return config.value?.icon ?? InfoIcon
})
</script>

<template>
  <Alert
    :class="cn(
      'my-6 w-auto md:-mx-1',
      props.class,
    )"
    :variant="resolvedVariant"
  >
    <component :is="resolvedIcon" v-if="resolvedIcon" />
    <AlertTitle v-if="title || $slots.title">
      <slot name="title">{{ title }}</slot>
    </AlertTitle>
    <AlertDescription>
      <slot name="description">
        <slot />
      </slot>
    </AlertDescription>
  </Alert>
</template>
