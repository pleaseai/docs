<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const { data: navigation } = await useNavigation()
const route = useRoute()

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="sticky top-20 -ml-2 h-[calc(100vh-5rem)] overflow-y-auto pb-10 pr-4">
    <div class="space-y-4">
      <template
        v-for="section in navigation"
        :key="section.path"
      >
        <!-- Section with children (group) -->
        <div
          v-if="section.children?.length"
          class="space-y-2"
        >
          <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {{ section.title }}
          </h4>
          <div class="space-y-1">
            <template
              v-for="item in section.children"
              :key="item.path"
            >
              <!-- Nested group -->
              <div
                v-if="item.children?.length"
                class="space-y-1"
              >
                <NuxtLink
                  :to="item.path"
                  class="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  :class="[
                    isActive(item.path)
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground',
                  ]"
                >
                  {{ item.title }}
                  <ChevronRight class="ml-auto size-4" />
                </NuxtLink>
                <div class="ml-4 space-y-1 border-l pl-2">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.path"
                    :to="child.path"
                    class="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    :class="[
                      route.path === child.path
                        ? 'bg-accent font-medium text-accent-foreground'
                        : 'text-muted-foreground',
                    ]"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </div>
              </div>
              <!-- Single item -->
              <NuxtLink
                v-else
                :to="item.path"
                class="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                :class="[
                  route.path === item.path
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground',
                ]"
              >
                {{ item.title }}
              </NuxtLink>
            </template>
          </div>
        </div>
        <!-- Single item without children -->
        <NuxtLink
          v-else
          :to="section.path"
          class="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          :class="[
            route.path === section.path
              ? 'bg-accent font-medium text-accent-foreground'
              : 'text-muted-foreground',
          ]"
        >
          {{ section.title }}
        </NuxtLink>
      </template>
    </div>
  </nav>
</template>
