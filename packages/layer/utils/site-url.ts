import process from 'node:process'
import { withHttps } from 'ufo'

/**
 * Infer the site URL from common deploy-platform env vars. Runtime-safe
 * (no node:fs / node:path imports) so it can be imported from server routes
 * bundled into edge runtimes like Cloudflare Workers.
 */
export function inferSiteURL(): string | undefined {
  const url = (
    process.env.NUXT_PUBLIC_SITE_URL // Nuxt public runtime config
    || process.env.NUXT_SITE_URL // Nuxt site config
    || process.env.VERCEL_PROJECT_PRODUCTION_URL // Vercel production URL
    || process.env.VERCEL_BRANCH_URL // Vercel branch URL
    || process.env.VERCEL_URL // Vercel deployment URL
    || (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    || process.env.URL // Netlify
    || process.env.CI_PAGES_URL // Gitlab Pages
    || process.env.CF_PAGES_URL // Cloudflare Pages
  )

  return url ? withHttps(url) : undefined
}
