import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    resolve('./modules/config'),
    resolve('./modules/css'),
    resolve('./modules/shadcn'),
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-shiki',
    'nuxt-og-image',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  shadcn: {
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
  css: [resolve('./app/assets/css/main.css')],
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
  },
  shiki: {
    defaultTheme: {
      light: 'github-light-default',
      dark: 'github-dark',
    },
    bundledLangs: [
      'ts',
      'tsx',
      'js',
      'vue',
      'vue-html',
      'html',
      'css',
      'json',
      'bash',
      'shell',
      'yaml',
      'md',
      'mdc',
    ],
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      autoSubfolderIndex: false,
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  compatibilityDate: '2025-01-01',
})
