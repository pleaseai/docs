<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { getIconForLanguageExtension } from '~/components/Icons'
import { cn } from '~/lib/utils'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: HTMLAttributes['class']
  unwrap?: boolean
}>()

const npmBlock = ['npm install', 'npm create', 'npm run', 'npx']
const isNpmCommand = computed(() => props.code && npmBlock.some(s => props.code!.startsWith(s)))
const isShowingLineNumber = computed(() => props.meta?.includes('showLineNumbers'))

const title = computed(() => props.filename || props.meta?.match(/title="([^"]+)"/)?.[1])

const lang = computed(() => props.language?.replace('language-', '') || '')
const IconExtension = computed(() => {
  return getIconForLanguageExtension(lang.value)
})

const codeAttributes = computed(() => isShowingLineNumber.value
  ? ({
      'data-line-numbers': '',
      'data-line-numbers-max-digits': 2,
    })
  : undefined)
</script>

<template>
  <pre
    v-if="unwrap"
    :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent', props.class)"
    :data-language="lang"
  ><code v-bind="codeAttributes"><slot /></code></pre>
  <figure
    v-else
    data-pretty-code-figure
  >
    <pre
      v-if="isNpmCommand"
      :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"
    ><CodeBlockCommand :code="code!" /></pre>

    <template v-else-if="title">
      <figcaption
        data-pretty-code-title
        :data-language="lang"
        class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
      >
        <component
          :is="IconExtension"
          v-if="IconExtension"
        />
        {{ title }}
      </figcaption>
      <pre
        :data-language="lang"
        :class="cn('relative no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"
      ><CopyButton
v-if="code"
                                                                                                                                                                                                                       :value="code"
      /><code v-bind="codeAttributes"><slot /></code></pre>
    </template>

    <pre
      v-else
      :data-language="lang"
      :class="cn('relative no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"
    ><CopyButton
v-if="code"
                                                                                                                                                                                                                                           :value="code"
    /><code v-bind="codeAttributes"><slot /></code></pre>
  </figure>
</template>
