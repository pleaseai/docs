<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()

const logoSrc = computed(() => {
  const header = appConfig.docs?.header
  if (!header?.logo) return null

  if (colorMode.value === 'dark' && header.logo.dark) {
    return header.logo.dark
  }
  return header.logo.light || header.logo.dark
})

const logoAlt = computed(() => {
  return appConfig.docs?.header?.logo?.alt || appConfig.docs?.title || 'Logo'
})

const title = computed(() => {
  return appConfig.docs?.header?.title || appConfig.docs?.title || 'Documentation'
})
</script>

<template>
  <ClientOnly>
    <img
      v-if="logoSrc"
      :src="logoSrc"
      :alt="logoAlt"
      class="h-6 w-auto shrink-0"
    >
    <span
      v-else
      class="font-bold"
    >
      {{ title }}
    </span>

    <template #fallback>
      <span class="font-bold">{{ title }}</span>
    </template>
  </ClientOnly>
</template>
