<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import Callout from './Callout.vue'

defineProps<{
  title?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Callout
    type="note"
    :title="title"
    :class="$attrs.class"
  >
    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>
    <slot />
  </Callout>
</template>
