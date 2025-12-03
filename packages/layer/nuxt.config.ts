import { addComponentsDir, createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  hooks: {
    'components:dirs': (dirs) => {
      // Register app components from the layer directory
      dirs.push({
        path: resolve('./app/components/app'),
        pathPrefix: false,
        global: true,
      })
      // Register docs components from the layer directory
      dirs.push({
        path: resolve('./app/components/docs'),
        pathPrefix: false,
        global: true,
      })
      // Register content components from the layer directory
      dirs.push({
        path: resolve('./app/components/content'),
        pathPrefix: false,
        global: true,
      })
    },
  },
  modules: [
    resolve('./modules/config'),
    resolve('./modules/css'),
    resolve('./modules/shadcn'),
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-og-image',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  css: [resolve('./app/assets/css/main.css')],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            light: 'github-light-default',
            dark: 'github-dark',
          },
          langs: [
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
      },
    },
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
  ogImage: {
    fonts: [
      'Geist:400',
      'Geist:500',
      'Geist:600',
    ],
  },
})
