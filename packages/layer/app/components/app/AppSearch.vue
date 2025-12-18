<script setup lang="ts">
import { ArrowRight, FileText, Monitor, Moon, Sun } from 'lucide-vue-next'
import { useFuse } from '@vueuse/integrations/useFuse'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { flattenNavigation, useContentSearch } from '~/composables/useContentSearch'

const router = useRouter()
const colorMode = useColorMode()
const { open } = useContentSearch()
const { data: navigation } = await useNavigation()

const searchTerm = ref('')

// Flatten navigation for search
const searchItems = computed(() => flattenNavigation(navigation.value))

// Fuse search
const { results } = useFuse(searchTerm, searchItems, {
  fuseOptions: {
    keys: ['label', 'prefix'],
    threshold: 0.3,
  },
  matchAllWhenSearchEmpty: true,
})

const filteredItems = computed(() => {
  if (!searchTerm.value) {
    return searchItems.value
  }
  return results.value.map(r => r.item)
})

// Group items by prefix (parent title)
const groupedItems = computed(() => {
  const groups = new Map<string, typeof searchItems.value>()

  for (const item of filteredItems.value) {
    const groupKey = item.prefix || 'Pages'
    if (!groups.has(groupKey)) {
      groups.set(groupKey, [])
    }
    groups.get(groupKey)!.push(item)
  }

  return Array.from(groups.entries()).map(([label, items]) => ({
    label,
    items,
  }))
})

function runCommand(command: () => unknown) {
  open.value = false
  searchTerm.value = ''
  command()
}

function handleColorMode(mode: 'system' | 'light' | 'dark') {
  runCommand(() => {
    colorMode.preference = mode
  })
}

// Keyboard shortcut
onMounted(() => {
  const down = (e: KeyboardEvent) => {
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable)
        || e.target instanceof HTMLInputElement
        || e.target instanceof HTMLTextAreaElement
        || e.target instanceof HTMLSelectElement
      ) {
        return
      }
      e.preventDefault()
      open.value = !open.value
    }
  }
  document.addEventListener('keydown', down)
  onUnmounted(() => document.removeEventListener('keydown', down))
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="overflow-hidden p-0 shadow-lg"
      :show-close-button="false"
    >
      <DialogHeader class="sr-only">
        <DialogTitle>Search documentation</DialogTitle>
        <DialogDescription>Search for pages in the documentation</DialogDescription>
      </DialogHeader>
      <Command
        v-model:search-term="searchTerm"
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5"
      >
        <CommandInput placeholder="Search documentation..." />
        <CommandList class="max-h-[300px]">
          <CommandEmpty>No results found.</CommandEmpty>

          <!-- Navigation groups -->
          <CommandGroup
            v-for="group in groupedItems"
            :key="group.label"
            :heading="group.label"
          >
            <CommandItem
              v-for="item in group.items"
              :key="item.id"
              :value="item.label"
              @select="() => runCommand(() => router.push(item.to!))"
            >
              <FileText
                v-if="item.isDoc"
                class="mr-2 size-4"
              />
              <ArrowRight
                v-else
                class="mr-2 size-4"
              />
              <span>{{ item.label }}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <!-- Theme group -->
          <CommandGroup heading="Theme">
            <CommandItem
              value="System theme"
              @select="() => handleColorMode('system')"
            >
              <Monitor class="mr-2 size-4" />
              <span>System</span>
              <span
                v-if="colorMode.preference === 'system'"
                class="ml-auto text-xs text-muted-foreground"
              >
                Active
              </span>
            </CommandItem>
            <CommandItem
              value="Light theme"
              @select="() => handleColorMode('light')"
            >
              <Sun class="mr-2 size-4" />
              <span>Light</span>
              <span
                v-if="colorMode.preference === 'light'"
                class="ml-auto text-xs text-muted-foreground"
              >
                Active
              </span>
            </CommandItem>
            <CommandItem
              value="Dark theme"
              @select="() => handleColorMode('dark')"
            >
              <Moon class="mr-2 size-4" />
              <span>Dark</span>
              <span
                v-if="colorMode.preference === 'dark'"
                class="ml-auto text-xs text-muted-foreground"
              >
                Active
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  </Dialog>
</template>
