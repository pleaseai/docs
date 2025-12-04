<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUpdate, onMounted, ref, watch } from 'vue'
import { cn } from '~/lib/utils'
import {
  Tabs as UITabs,
  TabsContent as UITabsContent,
  TabsList as UITabsList,
  TabsTrigger as UITabsTrigger,
} from '~/components/ui/tabs'

export interface TabsProps {
  /**
   * Default selected tab index (0-based).
   * @default 0
   */
  defaultIndex?: number
  /**
   * Sync selected tab across all tabs with this key via localStorage.
   * @example 'package-manager'
   */
  sync?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TabsProps>(), {
  defaultIndex: 0,
})

const slots = defineSlots<{
  default(): any
}>()

const defaultValue = computed(() => String(props.defaultIndex))
const model = ref<string>(defaultValue.value)
const rerenderCount = ref(1)

interface TabItem {
  value: string
  label: string
  icon?: string
  component: any
}

const items = computed<TabItem[]>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  rerenderCount.value
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || []
})

function transformSlot(slot: any, index: number): TabItem | TabItem[] | null {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot)
  }

  if (!slot.props?.label) {
    return null
  }

  return {
    value: String(index),
    label: slot.props.label,
    icon: slot.props?.icon,
    component: slot,
  }
}

onMounted(() => {
  if (props.sync) {
    const syncKey = `tabs-${props.sync}`
    const stored = localStorage.getItem(syncKey)

    if (stored && items.value.some(item => item.value === stored)) {
      model.value = stored
    }

    watch(model, (value) => {
      if (value) {
        localStorage.setItem(syncKey, value)
      }
    })
  }
})

onBeforeUpdate(() => rerenderCount.value++)
</script>

<template>
  <UITabs
    v-model="model"
    :default-value="defaultValue"
    :class="cn('relative mt-6', props.class)"
  >
    <UITabsList>
      <UITabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </UITabsTrigger>
    </UITabsList>
    <UITabsContent
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="mt-2"
    >
      <component :is="item.component" />
    </UITabsContent>
  </UITabs>
</template>
