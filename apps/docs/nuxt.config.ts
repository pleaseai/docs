export default defineNuxtConfig({
  extends: ['@pleaseai/docs'],

  site: {
    name: 'PleaseAI Docs',
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
})
