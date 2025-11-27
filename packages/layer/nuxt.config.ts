import tailwindcss from '@tailwindcss/vite'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    resolve('./modules/config'),
    resolve('./modules/css'),
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-shiki',
    'nuxt-og-image',
  ],

  devtools: { enabled: true },

  components: [
    { path: resolve('./app/components'), ignore: ['ui/**/*', 'content/**/*'] },
    // UI components are NOT globally registered - import explicitly from ~/components/ui/*
    { path: resolve('./app/components/content'), global: true, pathPrefix: false },
  ],

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
  compatibilityDate: '2025-01-01',
    ogImage: {
        fonts: [
            'Geist:400',
            'Geist:500',
            'Geist:600',
        ],
    },
})
