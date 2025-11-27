<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const appConfig = useAppConfig()
const title = computed(() => appConfig.docs?.title || 'Docs')
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <!-- Logo -->
      <div class="mr-4 flex">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-bold">{{ title }}</span>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-1 items-center space-x-6 text-sm font-medium">
        <NuxtLink
          to="/docs"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Documentation
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          @click="toggleColorMode"
        >
          <Sun v-if="colorMode.value === 'dark'" class="size-5" />
          <Moon v-else class="size-5" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  </header>
</template>
