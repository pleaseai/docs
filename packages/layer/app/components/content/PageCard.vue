<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NuxtLinkProps } from '#app'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

const props = defineProps<{
  title?: string
  description?: string
  icon?: string
  to?: NuxtLinkProps['to']
  target?: string
  orientation?: 'vertical' | 'horizontal'
  class?: HTMLAttributes['class']
}>()

const isLink = computed(() => !!props.to)
</script>

<template>
  <Card
    :class="[
      'transition-colors',
      isLink && 'hover:border-primary/50 cursor-pointer',
      props.class,
    ]"
  >
    <component
      :is="isLink ? 'NuxtLink' : 'div'"
      :to="props.to"
      :target="props.target"
      :class="[
        'block h-full',
        props.orientation === 'horizontal' && 'flex flex-col sm:flex-row',
      ]"
    >
      <!-- Default slot for media/illustration -->
      <div
        v-if="$slots.default"
        :class="[
          props.orientation === 'horizontal' ? 'sm:w-1/3 shrink-0' : '',
        ]"
      >
        <slot />
      </div>

      <div :class="props.orientation === 'horizontal' && 'flex-1'">
        <CardHeader v-if="$slots.title || $slots.description || props.title || props.description || props.icon">
          <!-- Icon -->
          <div
            v-if="props.icon"
            class="mb-2"
          >
            <Icon
              :name="props.icon"
              class="size-8 text-primary"
            />
          </div>

          <!-- Title -->
          <CardTitle v-if="$slots.title || props.title">
            <slot name="title">
              {{ props.title }}
            </slot>
          </CardTitle>

          <!-- Description -->
          <CardDescription v-if="$slots.description || props.description">
            <slot name="description">
              {{ props.description }}
            </slot>
          </CardDescription>
        </CardHeader>

        <CardContent v-if="$slots.body">
          <slot name="body" />
        </CardContent>
      </div>
    </component>
  </Card>
</template>
