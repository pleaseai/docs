<script setup lang="ts">
const appConfig = useAppConfig()
const title = computed(() => appConfig.docs?.title || 'Docs')
</script>

<template>
  <footer class="border-t py-6 md:py-0">
    <div class="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
      <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built with
        <NuxtLink
          to="https://github.com/pleaseai/docs"
          target="_blank"
          class="font-medium underline underline-offset-4"
        >
          @pleaseai/docs-layer
        </NuxtLink>
      </p>
      <p class="text-center text-sm text-muted-foreground md:text-right">
        {{ title }}
      </p>
    </div>
  </footer>
</template>
