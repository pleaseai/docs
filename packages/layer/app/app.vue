<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: appConfig.docs?.title,
  description: appConfig.docs?.description,
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="hsl(var(--primary))" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
