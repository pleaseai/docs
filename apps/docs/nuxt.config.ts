import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@pleaseai/docs'],
  site: {
    name: 'DOCS PLEASE Docs',
    url: 'https://docs.please.ai',
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  compatibilityDate: '2025-12-03',
  nitro: {
    preset: 'cloudflare_pages',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
