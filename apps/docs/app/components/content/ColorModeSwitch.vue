<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const colorMode = useColorMode()

const isLight = ref(false)

onMounted(() => {
  isLight.value = colorMode.value === 'light'
})

// Sync from external color mode changes
watch(() => colorMode.value, (newVal) => {
  isLight.value = newVal === 'light'
})

// Sync to color mode when switch changes
watch(isLight, (newVal) => {
  if ((colorMode.value === 'light') !== newVal) {
    colorMode.preference = newVal ? 'light' : 'dark'
  }
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
