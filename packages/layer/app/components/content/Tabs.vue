<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
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
  default(): VNode[]
}>()

const defaultValue = computed(() => String(props.defaultIndex))
const model = ref<string>(defaultValue.value)
const rerenderCount = ref(1)

interface TabItem {
  value: string
  label: string
  icon?: string
  component: VNode
}

const items = computed<TabItem[]>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  rerenderCount.value

  let counter = 0
  function transformSlot(slot: VNode): TabItem | null {
    if (typeof slot.type === 'symbol') {
      return null // Fragments are handled by flatMap in parent call
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

  return slots.default?.()?.flatMap(flattenSlots).map(transformSlot).filter((item): item is TabItem => item !== null) || []
})

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
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="size-4 mr-1.5"
          aria-hidden="true"
        />
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
