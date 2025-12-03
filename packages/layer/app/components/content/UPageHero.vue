<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  headline?: string
  orientation?: 'vertical' | 'horizontal'
  reverse?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <section
    :class="[
      'py-16 md:py-24',
      props.class,
    ]"
  >
    <div class="container">
      <div
        :class="[
          'flex gap-8 lg:gap-12',
          props.orientation === 'horizontal'
            ? props.reverse
              ? 'flex-col lg:flex-row-reverse items-center'
              : 'flex-col lg:flex-row items-center'
            : 'flex-col items-center text-center',
        ]"
      >
        <!-- Header -->
        <div
          :class="[
            'flex flex-col gap-4',
            props.orientation === 'horizontal' ? 'lg:flex-1' : 'max-w-3xl',
          ]"
        >
          <!-- Headline slot -->
          <div v-if="$slots.headline || props.headline">
            <slot name="headline">
              <span class="text-sm font-medium text-primary">
                {{ props.headline }}
              </span>
            </slot>
          </div>

          <!-- Title -->
          <h1
            v-if="$slots.title || props.title"
            class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </h1>

          <!-- Description -->
          <p
            v-if="$slots.description || props.description"
            class="text-lg text-muted-foreground sm:text-xl"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>

          <!-- Links slot -->
          <div
            v-if="$slots.links"
            :class="[
              'flex flex-wrap gap-3 mt-4',
              props.orientation !== 'horizontal' && 'justify-center',
            ]"
          >
            <slot name="links" />
          </div>
        </div>

        <!-- Default slot (illustration) -->
        <div
          v-if="$slots.default"
          :class="[
            props.orientation === 'horizontal' ? 'lg:flex-1' : 'w-full max-w-2xl',
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
