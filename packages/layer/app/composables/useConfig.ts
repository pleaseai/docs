import { createSharedComposable } from '@vueuse/core'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const COOKIE_NAME = 'docs_config'

export const useConfig = createSharedComposable(() => {
  const config = useCookie<{
    packageManager: PackageManager
  }>(
    COOKIE_NAME,
    {
      default: () => ({ packageManager: 'pnpm' }),
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    },
  )

  return {
    config,
  }
})
