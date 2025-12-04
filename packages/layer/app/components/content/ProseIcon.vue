<script lang="ts">
export interface ProseIconProps {
  name: string | any
  mode?: 'svg' | 'css'
  size?: string | number
  class?: any
}
</script>

<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'

const props = defineProps<ProseIconProps>()

const iconProps = useForwardProps(reactivePick(props, 'name', 'mode', 'size'))
</script>

<template>
  <Icon v-if="typeof name === 'string'" v-bind="iconProps" :class="props.class" />
  <component :is="name" v-else :class="props.class" />
</template>
