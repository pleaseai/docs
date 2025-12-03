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
      'py-12 md:py-16',
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
            : 'flex-col',
        ]"
      >
        <!-- Header -->
        <div
          v-if="$slots.title || $slots.description || $slots.headline || props.title || props.description || props.headline"
          :class="[
            'flex flex-col gap-3',
            props.orientation === 'horizontal' ? 'lg:flex-1' : 'max-w-2xl',
          ]"
        >
          <!-- Headline -->
          <div v-if="$slots.headline || props.headline">
            <slot name="headline">
              <span class="text-sm font-medium text-primary uppercase tracking-wide">
                {{ props.headline }}
              </span>
            </slot>
          </div>

          <!-- Title -->
          <h2
            v-if="$slots.title || props.title"
            class="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>

          <!-- Description -->
          <p
            v-if="$slots.description || props.description"
            class="text-lg text-muted-foreground"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>

          <!-- Links slot -->
          <div
            v-if="$slots.links"
            class="flex flex-wrap gap-3 mt-2"
          >
            <slot name="links" />
          </div>
        </div>

        <!-- Default slot (content/illustration) -->
        <div
          v-if="$slots.default"
          :class="[
            props.orientation === 'horizontal' ? 'lg:flex-1' : 'w-full',
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
