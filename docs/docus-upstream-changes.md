# Docus Upstream Changes — Applicability Survey

> Surveyed: 2026-05-28
> Pinned: `ref/docus` @ `0eafdaaa` (v5.4.1+2)
> Upstream: `origin/main` (164 commits ahead, past v5.11.0)

## Background

The `ref/docus` submodule was compared from v5.4.1 to v5.11.0+main. Docus uses **`@nuxt/ui v3`**, while our `packages/layer` is built on **`shadcn-vue` + `Tailwind v4`**, so most UI-component changes are not portable. However, **changes at the server route, module, util, and composable layer are largely portable as-is**.

## Applicable Changes

### 🟢 Apply now (high ROI, low risk)

#### 1. Expand `inferSiteURL`

- **File**: `packages/layer/utils/meta.ts:5-13`
- **Upstream commit**: general util improvements accumulated over time
- **Change**:
  - Detect more env vars: add `NUXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_BRANCH_URL`, `VERCEL_URL`
  - Normalize with `ufo.withHttps`
- **Current state**: only detects `NUXT_SITE_URL`, `NEXT_PUBLIC_VERCEL_URL`, `URL`, `CI_PAGES_URL`, `CF_PAGES_URL`

#### 2. Prerender raw markdown paths

- **File**: `packages/layer/app/pages/[...slug].vue`
- **Upstream commit**: `9ceafe6f` — `feat(llms): add docs page redirection to raw markdown for agents (#1264)`
- **Change**: add `addPrerenderPath(\`/raw${route.path}.md\`)` at the end of the page's setup script
- **Effect**: `/raw/*.md` files are generated during static build, ready for AI agents to fetch directly

#### 3. baseURL-aware raw link

- **Upstream commit**: `16f5e353` — `fix(links): handle app.baseURL in Markdown generated link (#1221)`
- **Change**: `${origin}/raw${path}.md` → `${origin}${appBaseURL}raw${path}.md`
- **When to apply**: alongside adding a "Copy markdown link" button to `DocsPageHeader.vue`. Our header is currently empty, so this isn't useful in isolation.

#### 4. Auto-detection in `content.config.ts`

- **Files**: `packages/layer/content.config.ts`, new `packages/layer/utils/pages.ts`
- **Upstream commits**: `f9e999d8` (root docs prefix), `99c78508` (handle docs prefix & folder)
- **Change**:
  - If `app/pages/index.vue` exists, skip defining the `landing` collection — users can ship their own landing page
  - If `content/docs/` exists, automatically prefix the collection with `/docs`
  - When i18n locales are configured, split collections into `docs_<lang>` (can defer until i18n is wired up)
- **New helpers**:

  ```ts
  // packages/layer/utils/pages.ts
  export function landingPageExists(rootDir: string): boolean
  export function docsFolderExists(rootDir: string, locale?: string): boolean
  ```

#### 5. Expand navigation utils

- **File**: `packages/layer/app/utils/navigation.ts`
- **Current**: only `flattenNavigation`
- **Add**:

  ```ts
  export interface BreadcrumbItem { title: string, path: string }
  export function transformNavigation(data, isI18nEnabled, locale?): ContentNavigationItem[]
  export function findPageBreadcrumbs(navigation, path, currentPath?): BreadcrumbItem[] | undefined
  ```

- **Use cases**: strip i18n / `docs` prefix levels, render breadcrumbs, feed JSON-LD schemas

---

### 🟡 Moderate effort (new files but stack-agnostic)

#### 6. `sitemap.xml` route

- **File**: new `packages/layer/server/routes/sitemap.xml.ts`
- **Upstream commits**: `45bffbc5` (initial), `cd2c62e4` (exclude navigation)
- **Change**: iterate docs/landing collections via `queryCollection`, skip pages with `frontmatter.sitemap: false` and `.navigation` paths, include `<lastmod>`
- **Current state**: we have `nuxt-og-image` but no sitemap route. Adding `@nuxtjs/sitemap` is an alternative; docus deliberately rolls its own route.

#### 7. Skills module (`.well-known/skills`)

- **Files**: new `packages/layer/modules/skills/index.ts` + `runtime/server/routes/`
- **Upstream commits**: `2f7861bd` (initial), `764329f5` (configurable dir)
- **Change**:
  - Scan `skills/<name>/SKILL.md` (frontmatter `name`, `description`) at project root
  - Expose `/.well-known/skills/index.json` plus per-file routes
  - Validate against the Anthropic Agent Skills naming spec (`^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`, max 64 chars)
- **Prerender**: register every skill file path up-front

#### 8. MCP server tools

- **Files**: new `packages/layer/server/mcp/tools/{list-pages,get-page}.ts`
- **Upstream commits**: `ec3b468c` (initial), `3eb54da4` (exclude .navigation), `f7e42ebf` (baseURL fix), `6043beb1` (derive URLs from request origin)
- **Prereqs**:
  - Add `@nuxtjs/mcp-toolkit` dependency and register it in `nuxt.config.ts` modules
  - New `packages/layer/server/utils/content.ts` (`getAvailableLocales`, `getCollectionsToQuery`, `isNavigationPath`, `getCollectionFromPath`)
- **Tools**:
  - `list-pages`: return all collection page metadata (with optional locale filter)
  - `get-page`: return a single page by path, body fetched via `$fetch('/raw{path}.md')`
- **Effect**: Claude / MCP clients can query docs directly as tools

#### 9. Vercel `markdown-rewrite` module

- **File**: new `packages/layer/modules/markdown-rewrite.ts`
- **Upstream commits**: `6fd8686b` (homepage → llms.txt), `9ceafe6f` (docs pages → raw)
- **Change**: after the Vercel preset build, inject rewrite rules into `config.json`
  - When `Accept: text/markdown` or `User-Agent: curl/*`:
  - `/` → `/llms.txt`
  - `/{locale}` → `/llms.txt`
  - any docs page → `/raw/{path}.md`
- **Constraint**: Vercel-preset only (no-op on other hosting). We have `nuxt-llms` but no host-level rewrites today.

---

### 🔴 Partial / needs review

#### 10. `useSeo` composable

- **File**: new `packages/layer/app/composables/useSeo.ts`
- **Upstream commit**: `d283f9aa` — `feat(layer): add more seo optimization (#1267)`
- **Change**:
  - Auto-generate Article / WebSite / BreadcrumbList JSON-LD
  - canonical link, OG/twitter meta
  - hreflang tags (when i18n is enabled)
- **Constraint**: hreflang depends on `@nuxtjs/i18n`. Before i18n lands, skip that branch or stub it out.

#### 11. `d` shortcut to toggle color mode

- **File**: new `packages/layer/app/composables/useDocusShortcuts.ts` (name TBD)
- **Upstream commit**: `61c36d03` — `feat(layer): add d shortcut to toggle color mode (#1377)`
- **Constraint**: docus uses `@nuxt/ui`'s `defineShortcuts`. We need to reimplement using `@vueuse/core`'s `useMagicKeys` or `onKeyStroke`.

#### 12. Guard the GitHub edit link

- **Upstream commits**: `d056a2c9` (do not display edit page if github url missing), `bd2455ca` (do not show separator if github is disabled)
- **When to apply**: when adding edit / markdown action buttons to `DocsPageHeader`.

---

### ⛔ Defer (stack-dependent, large refactor)

| Item | Upstream commit | Reason for deferral |
| --- | --- | --- |
| AppHeaderLeft / CTA / Bottom split | `313ef59e`, `72205f9f` | `@nuxt/ui` component composition pattern |
| Assistant module | `1ff28292` + others | Relies on `USidebar` etc. from `@nuxt/ui` |
| ContentTOC `circuit` variant | `7d90d20c` | TOC component structure differs entirely |
| `defaultVariants` forwarding | `8abf0d4a` | `@nuxt/ui` specific |
| LanguageSelect | — | Requires `@nuxtjs/i18n` |
| `useDocusI18n` (full) | `dd4a5267`, `7032533e` | Revisit after the i18n module is introduced |
| Forced color mode middleware | `8d8b0a71` | Relies on `@nuxt/ui`'s `forced` color mode API |

---

## Recommended first PR bundle

These five fit nicely into a single PR — cohesive scope, manageable size:

1. **#1** Expand `inferSiteURL` (Vercel envs, `withHttps`)
2. **#2** Register raw `.md` prerender path
3. **#4** `content.config.ts` auto-detection + `utils/pages.ts`
4. **#5** Expand `app/utils/navigation.ts` (`transformNavigation`, `findPageBreadcrumbs`)
5. **#6** `sitemap.xml` route

**Follow-up PRs (optional)**:
- **#7 + #8 + #9**: Skills + MCP + markdown-rewrite (AI / agent integration bundle; pulls in `@nuxtjs/mcp-toolkit`)
- **#10**: `useSeo` (defer hreflang or no-op it until i18n lands)
- **#11 + #12**: color-mode shortcut + GitHub edit guard (paired with header action buttons)

## Commit index for reference

```
9ceafe6f  feat(llms): add docs page redirection to raw markdown for agents
6fd8686b  feat(llms): redirect homepage to /llms.txt
45bffbc5  feat(layer): add sitemap.xml generation
cd2c62e4  fix(layer): enhance sitemap generation, exclude navigation files
ec3b468c  feat(ai): add mcp server
2f7861bd  feat(skills): add agent skills discovery via .well-known
764329f5  feat(skills): make directory configurable via module options
d283f9aa  feat(layer): add more seo optimization
99c78508  feat(layer): handle docs prefix & folder
f9e999d8  fix(layer): root docs prefix
16f5e353  fix(links): handle app.baseURL in Markdown generated link
61c36d03  feat(layer): add d shortcut to toggle color mode
d056a2c9  fix(layer): do not display edit page if github url missing
bd2455ca  fix(docs): do not show separator if github is disabled
3eb54da4  fix(mcp): exclude .navigation paths from pages tools
f7e42ebf  fix(layer): incorrect MCP tools when app.baseURL is set
6043beb1  fix(mcp): derive Docus MCP page URLs from request origin
7032533e  fix(typescript): support nuxt typecheck in apps extending docus
```
