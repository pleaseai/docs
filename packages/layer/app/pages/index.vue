<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { data: page } = await useAsyncData('landing', () =>
  queryCollection('landing').path('/').first())
</script>

<template>
  <div class="container py-12">
    <ContentRenderer v-if="page" :value="page" class="prose dark:prose-invert max-w-none" />
    <div v-else class="text-center">
      <h1 class="text-4xl font-bold">
        Welcome
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Create an <code>index.md</code> file in your <code>content</code> folder to customize this page.
      </p>
    </div>
  </div>
</template>
