import { createResolver, useNuxt } from '@nuxt/kit'
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
    '@nuxt/icon',
    'nuxt-og-image',
  ],
  devtools: { enabled: true },
  css: [resolve('./app/assets/css/main.css')],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
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
  mdc: {
    components: {
      map: {
        'browser-frame': 'BrowserFrame',
        'callout': 'Callout',
        'caution': 'Caution',
        'icon': 'ProseIcon',
        'note': 'Note',
        'tip': 'Tip',
        'warning': 'Warning',
        'tabs': 'Tabs',
        'tabs-item': 'TabsItem',
        'u-color-mode-image': 'UColorModeImage',
          'kdb': 'ProseKbd',
      },
    },
  },
  compatibilityDate: '2025-01-01',
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      autoSubfolderIndex: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
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
    'nitro:config': (nitroConfig) => {
      const nuxt = useNuxt()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const i18nOptions = (nuxt.options as any).i18n

      const routes: string[] = []
      if (!i18nOptions) {
        routes.push('/')
      }
      else {
        routes.push(...(i18nOptions.locales?.map((locale: string | { code: string }) =>
          typeof locale === 'string' ? `/${locale}` : `/${locale.code}`) || []))
      }

      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
      nitroConfig.prerender.routes.push(...routes)
    },
  },
  ogImage: {
    fonts: [
      'Geist:400',
      'Geist:500',
      'Geist:600',
    ],
  },
})
