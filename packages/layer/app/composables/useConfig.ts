import { createSharedComposable, isClient, watchImmediate } from '@vueuse/core'

const COOKIE_NAME = 'docs_config'
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallationType = 'cli' | 'manual'

export const useConfig = createSharedComposable(() => {
  const config = useCookie<{
    packageManager: PackageManager
    installationType: InstallationType
  }>(
    COOKIE_NAME,
    {
      default: () => ({ packageManager: 'bun', installationType: 'cli' }),
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    },
  )

  return {
    config,
  }
})
