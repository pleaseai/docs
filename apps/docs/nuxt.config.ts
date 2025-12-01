import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@pleaseai/docs'],
  site: {
    name: 'DOCS PLEASE Docs',
    url: 'https://docs.please.ai',
  },
  compatibilityDate: '2025-01-01',
  nitro: {
      preset: "cloudflare_module",
      cloudflare: {
          deployConfig: true,
          nodeCompat: true
      }
  },
    eslint: {
    config: {
        standalone: false
    }
},
})