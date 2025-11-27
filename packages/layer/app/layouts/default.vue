<script setup lang="ts">
</script>

<template>
  <div class="relative flex min-h-svh flex-col bg-background">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
