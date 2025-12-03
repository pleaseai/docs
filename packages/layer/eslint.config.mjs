// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    type: 'lib',
  }, {
    ignores: ['**/dist/**', '**/.nuxt/**', '**/node_modules/**', 'app/components/ui/**' ],
  }),
)
