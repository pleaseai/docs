import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineNuxtModule, logger } from '@nuxt/kit'

const log = logger.withTag('docs-please:markdown-rewrite')

type I18nLocale = string | { code: string }

interface VercelHeaderHas {
  type: 'header'
  key: string
  value: string
}

interface VercelRoute {
  src: string
  dest?: string
  headers?: Record<string, string>
  has?: VercelHeaderHas[]
  continue?: boolean
  [key: string]: unknown
}

interface VercelBuildOutputConfig {
  version: number
  routes?: VercelRoute[]
  [key: string]: unknown
}

const MARKDOWN_HEADERS: Record<string, string> = {
  'content-type': 'text/markdown; charset=utf-8',
}

const ACCEPT_MATCH: VercelHeaderHas = {
  type: 'header',
  key: 'accept',
  value: '(.*)text/markdown(.*)',
}

const USER_AGENT_MATCH: VercelHeaderHas = {
  type: 'header',
  key: 'user-agent',
  value: 'curl/.*',
}

/**
 * Build a pair of Vercel routes (one matching `Accept: text/markdown`, one matching
 * `User-Agent: curl/*`) for a given `src` → `dest` rewrite.
 *
 * Vercel's `has` array is AND-ed, so OR semantics across header matchers require
 * emitting two separate route entries.
 */
function buildMarkdownRoutePair(src: string, dest: string): VercelRoute[] {
  return [
    {
      src,
      dest,
      headers: MARKDOWN_HEADERS,
      has: [ACCEPT_MATCH],
      continue: true,
    },
    {
      src,
      dest,
      headers: MARKDOWN_HEADERS,
      has: [USER_AGENT_MATCH],
      continue: true,
    },
  ]
}

export default defineNuxtModule({
  meta: {
    name: 'docs-markdown-rewrite',
  },
  setup(_options, nuxt) {
    nuxt.hooks.hook('nitro:init', (nitro) => {
      nitro.hooks.hook('compiled', async () => {
        // Only run for Vercel presets (`vercel`, `vercel-edge`, `vercel-static`, ...).
        const preset = nitro.options.preset
        if (!preset || !preset.startsWith('vercel')) {
          return
        }

        // Vercel build output config lives at <output.dir>/config.json, i.e. the
        // parent of <output.publicDir>.
        // https://vercel.com/docs/build-output-api
        const vcConfigPath = resolve(nitro.options.output.publicDir, '..', 'config.json')

        let raw: string
        try {
          raw = await readFile(vcConfigPath, 'utf8')
        }
        catch (err) {
          log.warn(`Could not read Vercel build output config at ${vcConfigPath}; skipping markdown rewrites.`, err)
          return
        }

        let vcConfig: VercelBuildOutputConfig
        try {
          vcConfig = JSON.parse(raw) as VercelBuildOutputConfig
        }
        catch (err) {
          log.warn(`Could not parse Vercel build output config at ${vcConfigPath}; skipping markdown rewrites.`, err)
          return
        }

        // Confirm llms.txt is actually present in the build output before we wire
        // rewrites that target it.
        const llmsTxtPath = resolve(nitro.options.output.publicDir, 'llms.txt')
        let llmsTxt: string
        try {
          llmsTxt = await readFile(llmsTxtPath, 'utf8')
        }
        catch {
          log.warn('llms.txt not found in publicDir; skipping markdown rewrite routes.')
          return
        }

        const routes: VercelRoute[] = []

        // 1. Homepage → /llms.txt
        routes.push(...buildMarkdownRoutePair('^/$', '/llms.txt'))

        // 2. Per-locale homepage → /llms.txt
        //    Locales are read from the actual `@nuxtjs/i18n` module options on
        //    `nuxt.options.i18n` (the same source used by the `nitro:config`
        //    hook in nuxt.config.ts). `runtimeConfig.public.i18n` is not a
        //    reliable source — the module does not always populate it, so
        //    relying on it can cause locale routes to silently never be
        //    generated. If absent, no per-locale routes are added.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const i18nOptions = (nuxt.options as any).i18n as
          | { locales?: I18nLocale[] }
          | undefined
        const locales: I18nLocale[] = i18nOptions?.locales ?? []
        const localeCodes: string[] = locales
          .map(locale => (typeof locale === 'string' ? locale : locale.code))
          .filter((code): code is string => typeof code === 'string' && code.length > 0)

        if (localeCodes.length > 0) {
          // Escape regex metacharacters defensively — locale codes are usually
          // safe (`en`, `pt-BR`, `zh-Hans`), but we shouldn't trust them blindly.
          const localePattern = localeCodes
            .map(code => code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            .join('|')
          routes.push(...buildMarkdownRoutePair(`^/(${localePattern})/?$`, '/llms.txt'))
        }

        // 3. Docs pages → /raw<path>.md
        //    Enumerate pages from llms.txt links (the source of truth for what was
        //    prerendered for AI agents). This mirrors upstream docus (`6fd8686b`,
        //    `9ceafe6f`) and avoids accidentally rewriting asset URLs.
        const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
        const seenPagePaths = new Set<string>()

        for (const match of llmsTxt.matchAll(urlRegex)) {
          const url = match[2]
          if (!url) continue

          let rawPath: string
          try {
            // Decode the pathname so URL-encoded characters (e.g. `%20` for
            // spaces) are matched against Vercel's router, which compares
            // against the decoded request pathname.
            rawPath = decodeURIComponent(new URL(url).pathname)
          }
          catch {
            continue
          }

          // Only handle /raw/<...>.md entries; skip the homepage and anything else.
          if (rawPath === '/' || !rawPath.startsWith('/raw/')) {
            continue
          }

          // Convert /raw/en/getting-started/installation.md → /en/getting-started/installation
          const pagePath = rawPath.replace(/^\/raw/, '').replace(/\.md$/, '')

          // Skip locale homepages (already covered by rule 2).
          if (localeCodes.some(code => pagePath === `/${code}`)) {
            continue
          }

          if (seenPagePaths.has(pagePath)) continue
          seenPagePaths.add(pagePath)

          // Escape regex metacharacters in the path so it matches literally.
          // Allow an optional trailing slash (`/?$`) so requests like
          // `/en/getting-started/installation/` are matched consistently with
          // the per-locale homepage routes above.
          const escapedPath = pagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          routes.push(...buildMarkdownRoutePair(`^${escapedPath}/?$`, rawPath))
        }

        // Inject at the top so we fire before the SPA fallback.
        vcConfig.routes = vcConfig.routes ?? []
        vcConfig.routes.unshift(...routes)

        await writeFile(vcConfigPath, JSON.stringify(vcConfig, null, 2), 'utf8')
        log.info(
          `Injected ${routes.length} markdown-rewrite route(s) into ${vcConfigPath} (serve markdown to AI agents).`,
        )
      })
    })
  },
})
