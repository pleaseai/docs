<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div data-slot="prose-table" class="no-scrollbar my-6 w-full overflow-hidden rounded-lg border">
    <table
      :class="cn(
        'w-full border-collapse text-sm',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>
