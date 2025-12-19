<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { computed, onBeforeUpdate, ref } from 'vue'
import { cn } from '~/lib/utils'
import {
  Accordion as UIAccordion,
  AccordionContent as UIAccordionContent,
  AccordionItem as UIAccordionItem,
  AccordionTrigger as UIAccordionTrigger,
} from '~/components/ui/accordion'

export interface AccordionProps {
  /**
   * Accordion type - single or multiple items open at once.
   * @default 'multiple'
   */
  type?: 'single' | 'multiple'
  /**
   * Default open items (comma-separated indices for multiple, single index for single).
   * @example '0,1' or '0'
   */
  defaultValue?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'multiple',
})

const slots = defineSlots<{
  default(): VNode[]
}>()

const rerenderCount = ref(1)

interface AccordionItemData {
  value: string
  label: string
  icon?: string
  component: VNode
}

const items = computed<AccordionItemData[]>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  rerenderCount.value

  let counter = 0
  function transformSlot(slot: VNode): AccordionItemData | null {
    if (typeof slot.type === 'symbol') {
      return null
    }

    const slotProps = slot.props as { label?: string, icon?: string } | null
    if (!slotProps?.label) {
      return null
    }

    return {
      value: String(counter++),
      label: slotProps.label,
      icon: slotProps.icon,
      component: slot,
    }
  }

  function flattenSlots(slot: VNode): VNode[] {
    if (typeof slot.type === 'symbol') {
      const children = slot.children as VNode[] | null
      return children?.flatMap(flattenSlots) ?? []
    }
    return [slot]
  }

  return slots.default?.()?.flatMap(flattenSlots).map(transformSlot).filter((item): item is AccordionItemData => item !== null) || []
})

const defaultValue = computed(() => {
  if (props.defaultValue) {
    return props.type === 'multiple'
      ? props.defaultValue.split(',').map(v => v.trim())
      : props.defaultValue
  }
  return props.type === 'multiple' ? [] : undefined
})

onBeforeUpdate(() => rerenderCount.value++)
</script>

<template>
  <UIAccordion
    :type="type"
    :default-value="defaultValue"
    :class="cn('mt-6', props.class)"
    collapsible
  >
    <UIAccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <UIAccordionTrigger class="items-center">
        <div class="flex items-center text-left">
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="size-4 mr-2 shrink-0"
            aria-hidden="true"
          />
          <span>{{ item.label }}</span>
        </div>
      </UIAccordionTrigger>
      <UIAccordionContent class="text-left">
        <component :is="item.component" />
      </UIAccordionContent>
    </UIAccordionItem>
  </UIAccordion>
</template>
