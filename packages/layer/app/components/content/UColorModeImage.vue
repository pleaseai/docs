<script setup lang="ts">
interface Props {
  light: string
  dark: string
  alt?: string
  width?: number | string
  height?: number | string
  class?: string
  format?: string
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  loading: 'lazy',
})

const colorMode = useColorMode()

const src = computed(() => {
  return colorMode.value === 'dark' ? props.dark : props.light
})
</script>

<template>
  <ClientOnly>
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="props.class"
      :loading="loading"
    >
    <template #fallback>
      <img
        :src="light"
        :alt="alt"
        :width="width"
        :height="height"
        :class="props.class"
        :loading="loading"
      >
    </template>
  </ClientOnly>
</template>
