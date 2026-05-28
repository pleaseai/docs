import { existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Returns true when the consuming app ships its own `app/pages/index.vue`,
 * in which case the layer should not define a `landing` collection.
 */
export function landingPageExists(rootDir: string): boolean {
  return existsSync(join(rootDir, 'app', 'pages', 'index.vue'))
}

/**
 * Returns true when a `content/docs/` folder exists (optionally under a locale).
 * When true, the docs collection should be prefixed with `/docs` and source from that folder.
 */
export function docsFolderExists(rootDir: string, locale?: string): boolean {
  const docsPath = locale
    ? join(rootDir, 'content', locale, 'docs')
    : join(rootDir, 'content', 'docs')
  return existsSync(docsPath)
}
