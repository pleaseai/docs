// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    type: 'lib',
    vue: true,
  }, {
    ignores: ['**/dist/**', '**/.nuxt/**', '**/node_modules/**'],
  }),
)
