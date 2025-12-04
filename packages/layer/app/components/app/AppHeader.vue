<script setup lang="ts">
import { Github, Moon, Sun } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

const appConfig = useAppConfig()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const links = computed(() => {
  const result = []
  if (appConfig.docs?.github?.url) {
    result.push({
      icon: Github,
      to: appConfig.docs.github.url,
      target: '_blank',
      ariaLabel: 'GitHub',
    })
  }
  return result
})
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="mr-4 flex items-center gap-2"
      >
        <AppHeaderLogo class="h-6 w-auto shrink-0" />
      </NuxtLink>

      <!-- Center (Search) -->
      <div class="hidden flex-1 justify-center lg:flex">
        <AppHeaderCenter />
      </div>

      <!-- Spacer for mobile -->
      <div class="flex-1 lg:hidden" />

      <!-- Right Actions -->
      <div class="flex items-center gap-1">
        <!-- Search button (mobile) -->
        <AppHeaderSearch class="lg:hidden" />

        <!-- Color mode toggle -->
        <ClientOnly>
          <Button
            variant="ghost"
            size="icon"
            @click="toggleColorMode"
          >
            <Moon
              v-if="isDark"
              class="size-5"
            />
            <Sun
              v-else
              class="size-5"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <template #fallback>
            <div class="size-8 animate-pulse rounded-md bg-muted" />
          </template>
        </ClientOnly>

        <!-- External links (GitHub, etc.) -->
        <template v-if="links.length">
          <Separator
            orientation="vertical"
            class="mx-1 h-6"
          />
          <Button
            v-for="(link, index) in links"
            :key="index"
            variant="ghost"
            size="icon"
            as-child
          >
            <a
              :href="link.to"
              :target="link.target"
              :aria-label="link.ariaLabel"
            >
              <component
                :is="link.icon"
                class="size-5"
              />
            </a>
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>
