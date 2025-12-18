<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const colorMode = useColorMode()

// Single computed with getter/setter for clean two-way binding
const isLight = computed({
  get: () => colorMode.value === 'light',
  set: (value: boolean) => {
    colorMode.preference = value ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <div class="flex-1 flex items-center justify-center">
      <SwitchRoot
        v-model="isLight"
        aria-label="Toggle color mode"
        class="relative w-[140px] h-[280px] rounded-lg bg-muted cursor-pointer transition-colors"
      >
        <SwitchThumb
          class="absolute top-[2px] left-[2px] flex items-center justify-center rounded-lg bg-background shadow-lg transition-all duration-300 ease-in-out size-[136px] data-[state=checked]:translate-y-[140px]"
        >
          <Icon
            :name="isLight ? 'lucide:sun' : 'lucide:moon'"
            size="48"
            class="text-foreground"
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
