<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps<{
  prev?: { path: string, title: string } | null
  next?: { path: string, title: string } | null
}>()
</script>

<template>
  <div class="flex flex-row items-center justify-between pt-8">
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft class="size-4" />
      {{ prev.title }}
    </NuxtLink>
    <div v-else />

    <NuxtLink
      v-if="next"
      :to="next.path"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
    >
      {{ next.title }}
      <ChevronRight class="size-4" />
    </NuxtLink>
  </div>
</template>
