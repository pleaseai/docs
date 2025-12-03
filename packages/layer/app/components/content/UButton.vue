<script setup lang="ts">
import type { NuxtLinkProps } from '#app'
import type { ButtonVariants } from '~/components/ui/button'
import Button from '~/components/ui/button/Button.vue'

interface Props extends NuxtLinkProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  variant: 'default',
})
</script>

<template>
  <Button
    :size="size"
    :variant="variant"
    as-child
    class="no-underline"
  >
    <NuxtLink
      :to="to"
      :href="href"
      :target="target"
      :rel="rel"
      :external="external"
    >
      <slot />
    </NuxtLink>
  </Button>
</template>
