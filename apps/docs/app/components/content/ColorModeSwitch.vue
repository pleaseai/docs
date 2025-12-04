<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const colorMode = useColorMode()

const isLight = computed(() => colorMode.value === 'light')

function toggleColorMode(checked: boolean) {
  colorMode.preference = checked ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <div class="flex-1 flex items-center justify-center">
      <SwitchRoot
        :checked="isLight"
        aria-label="Toggle color mode"
        class="relative w-[140px] h-[280px] rounded-lg bg-muted cursor-pointer transition-colors"
        @update:checked="toggleColorMode"
      >
        <SwitchThumb
          class="absolute top-[2px] left-[2px] flex items-center justify-center rounded-lg bg-background shadow-lg transition-all duration-300 ease-in-out size-[136px] data-[state=checked]:translate-y-[140px]"
        >
          <Icon
            :name="isLight ? 'lucide:sun' : 'lucide:moon'"
            class="size-16 text-foreground"
          />
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <template #fallback>
      <div class="flex-1 flex items-center justify-center">
        <div class="w-[140px] h-[280px] rounded-lg bg-muted" />
      </div>
    </template>
  </ClientOnly>
</template>
