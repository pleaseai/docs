<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const props = defineProps<{
  title?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Card :class="props.class">
    <CardHeader v-if="title">
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
