export default defineNuxtConfig({
  extends: ['@pleaseai/docs-layer'],

  compatibilityDate: '2025-01-01',

  nitro: {
    preset: 'cloudflare-pages',
  },
})
