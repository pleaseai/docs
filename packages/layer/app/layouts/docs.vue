<script setup lang="ts">
</script>

<template>
  <div class="relative flex min-h-svh flex-col bg-background">
    <AppHeader />
    <div class="container flex-1">
      <div class="flex gap-8 py-8">
        <!-- Sidebar -->
        <aside class="hidden w-64 shrink-0 lg:block">
          <DocsSidebar />
        </aside>

        <!-- Main content -->
        <main class="min-w-0 flex-1">
          <slot />
        </main>

        <!-- Table of contents -->
        <aside class="hidden w-56 shrink-0 xl:block">
          <DocsTableOfContents />
        </aside>
      </div>
    </div>
    <AppFooter />
    <AppSearch />
  </div>
</template>
