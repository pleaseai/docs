<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { toRefs } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<{
  value?: string
  class?: HTMLAttributes['class']
}>(), {
  value: '',
})
const { value } = toRefs(props)

const { copy, copied } = useClipboard({ source: value })
</script>

<template>
  <button
    type="button"
    data-slot="copy-button"
    :class="cn(
      'bg-code absolute top-3 right-2 z-10 size-7 rounded-md flex items-center justify-center opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity',
      props.class,
    )"
    @click="copy()"
  >
    <span class="sr-only">Copy</span>
    <Check
      v-if="copied"
      class="size-4"
    />
    <Copy
      v-else
      class="size-4"
    />
  </button>
</template>
