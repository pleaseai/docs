<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="[
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>
