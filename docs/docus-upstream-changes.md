# Docus Upstream Changes — Applicability Survey

> 조사 시점: 2026-05-28
> Pinned: `ref/docus` @ `0eafdaaa` (v5.4.1+2)
> Upstream: `origin/main` (v5.11.0 이후 164 commits 앞섬)

## 배경

`ref/docus` 서브모듈을 v5.4.1 → v5.11.0+main까지 비교했다. docus는 **`@nuxt/ui v3`**, 우리 `packages/layer`는 **`shadcn-vue` + `Tailwind v4`** 스택이라 컴포넌트 단의 변경은 대부분 이식 불가하지만, **서버 라우트 / 모듈 / 유틸 / 컴포저블 단의 변경은 거의 그대로 적용 가능**하다.

## 적용 가능 변경

### 🟢 즉시 적용 가능 (높은 ROI, 저위험)

#### 1. `inferSiteURL` 보강

- **파일**: `packages/layer/utils/meta.ts:5-13`
- **상류 commit**: 일반 유틸 개선 (시간 경과 누적)
- **변경 내용**:
  - 감지하는 env vars 확장: `NUXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_BRANCH_URL`, `VERCEL_URL` 추가
  - `ufo.withHttps`로 정규화
- **현재 우리 상태**: `NUXT_SITE_URL`, `NEXT_PUBLIC_VERCEL_URL`, `URL`, `CI_PAGES_URL`, `CF_PAGES_URL`만 감지

#### 2. raw markdown 경로 prerender 등록

- **파일**: `packages/layer/app/pages/[...slug].vue`
- **상류 commit**: `9ceafe6f` — `feat(llms): add docs page redirection to raw markdown for agents (#1264)`
- **변경 내용**: 문서 페이지 setup script 끝에 `addPrerenderPath(\`/raw${route.path}.md\`)` 한 줄 추가
- **효과**: 정적 생성 시 `/raw/*.md`가 함께 생성되어 AI 에이전트가 곧바로 fetch 가능

#### 3. baseURL 인식 raw 링크

- **상류 commit**: `16f5e353` — `fix(links): handle app.baseURL in Markdown generated link (#1221)`
- **변경 내용**: `${origin}/raw${path}.md` → `${origin}${appBaseURL}raw${path}.md`
- **적용 시점**: `DocsPageHeader.vue`에 "Copy markdown link" 버튼을 추가할 때 같이 적용. 현재 우리 헤더는 비어 있어서 단독으로는 효과 없음.

#### 4. `content.config.ts` 자동 감지

- **파일**: `packages/layer/content.config.ts`, 신규 `packages/layer/utils/pages.ts`
- **상류 commit**: `f9e999d8` (root docs prefix), `99c78508` (handle docs prefix & folder)
- **변경 내용**:
  - `app/pages/index.vue` 존재 시 `landing` 컬렉션 정의 생략 → 사용자가 자체 랜딩 페이지를 가질 수 있음
  - `content/docs/` 폴더 존재 시 자동으로 `/docs` prefix
  - i18n locales 존재 시 collection을 `docs_<lang>` 단위로 자동 분기 (현재는 i18n 비활성이므로 이 부분은 보류해도 됨)
- **신규 헬퍼**:

  ```ts
  // packages/layer/utils/pages.ts
  export function landingPageExists(rootDir: string): boolean
  export function docsFolderExists(rootDir: string, locale?: string): boolean
  ```

#### 5. 네비게이션 유틸 보강

- **파일**: `packages/layer/app/utils/navigation.ts`
- **현재**: `flattenNavigation` 한 개만 존재
- **추가**:

  ```ts
  export interface BreadcrumbItem { title: string, path: string }
  export function transformNavigation(data, isI18nEnabled, locale?): ContentNavigationItem[]
  export function findPageBreadcrumbs(navigation, path, currentPath?): BreadcrumbItem[] | undefined
  ```

- **용도**: i18n/`docs/` prefix 자동 스트립, breadcrumb 렌더링, JSON-LD 스키마

---

### 🟡 중간 노력 (신규 파일이지만 stack-agnostic)

#### 6. `sitemap.xml` 라우트

- **파일**: 신규 `packages/layer/server/routes/sitemap.xml.ts`
- **상류 commit**: `45bffbc5` (initial), `cd2c62e4` (exclude navigation)
- **변경 내용**: `queryCollection`으로 docs/landing 컬렉션 순회, `frontmatter.sitemap: false` 및 `.navigation` 경로 제외, `<lastmod>` 포함
- **현재 우리 상태**: `nuxt-og-image`는 있지만 sitemap.xml 라우트 없음. `@nuxtjs/sitemap`을 추가하는 대안도 있으나 docus는 의도적으로 자체 라우트로 처리.

#### 7. Skills 모듈 (`.well-known/skills`)

- **파일**: 신규 `packages/layer/modules/skills/index.ts` + `runtime/server/routes/`
- **상류 commit**: `2f7861bd` (initial), `764329f5` (configurable dir)
- **변경 내용**:
  - 루트 `skills/<name>/SKILL.md`(frontmatter `name`, `description`) 스캔
  - `/.well-known/skills/index.json` + 파일별 라우트 노출
  - Anthropic Agent Skills 네이밍 스펙 검증 (`^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`, 64자 이내)
- **prerender**: 모든 스킬 파일 경로를 사전 등록

#### 8. MCP 서버 도구

- **파일**: 신규 `packages/layer/server/mcp/tools/{list-pages,get-page}.ts`
- **상류 commit**: `ec3b468c` (initial), `3eb54da4` (exclude .navigation), `f7e42ebf` (baseURL fix), `6043beb1` (derive URLs from request origin)
- **선행 작업**:
  - `@nuxtjs/mcp-toolkit` 의존성 추가 + `nuxt.config.ts` modules에 등록
  - `packages/layer/server/utils/content.ts` 신규 (`getAvailableLocales`, `getCollectionsToQuery`, `isNavigationPath`, `getCollectionFromPath`)
- **도구**:
  - `list-pages`: 컬렉션의 페이지 메타 전체 반환 (locale 필터)
  - `get-page`: 경로로 한 페이지 + `$fetch('/raw{path}.md')`로 본문까지 반환
- **효과**: Claude/MCP 클라이언트가 문서를 도구로 직접 조회 가능

#### 9. Vercel `markdown-rewrite` 모듈

- **파일**: 신규 `packages/layer/modules/markdown-rewrite.ts`
- **상류 commit**: `6fd8686b` (homepage → llms.txt), `9ceafe6f` (docs pages → raw)
- **변경 내용**: Vercel preset 빌드 후 `config.json`에 rewrite 규칙 주입
  - `Accept: text/markdown` 또는 `User-Agent: curl/*` 일 때
  - `/` → `/llms.txt`
  - `/{locale}` → `/llms.txt`
  - 문서 페이지 → `/raw/{path}.md`
- **제약**: Vercel preset 전용 (다른 호스팅엔 무영향). 현재 `nuxt-llms`만 있고 호스팅 단 리라이트는 없음.

---

### 🔴 부분 적용 / 검토 필요

#### 10. `useSeo` composable

- **파일**: 신규 `packages/layer/app/composables/useSeo.ts`
- **상류 commit**: `d283f9aa` — `feat(layer): add more seo optimization (#1267)`
- **변경 내용**:
  - Article / WebSite / BreadcrumbList JSON-LD 자동 생성
  - canonical link, OG/twitter meta
  - hreflang 태그 (i18n 활성 시)
- **제약**: hreflang 부분은 `@nuxtjs/i18n` 의존. i18n 도입 전에는 해당 분기 skip하거나 주석 처리해서 도입 가능.

#### 11. `d` 단축키로 컬러모드 토글

- **파일**: 신규 `packages/layer/app/composables/useDocusShortcuts.ts` (이름은 조정)
- **상류 commit**: `61c36d03` — `feat(layer): add d shortcut to toggle color mode (#1377)`
- **제약**: docus는 `@nuxt/ui`의 `defineShortcuts` 사용. 우리는 `@vueuse/core`의 `useMagicKeys` 또는 `onKeyStroke`로 대체 구현 필요.

#### 12. GitHub edit 링크 가드

- **상류 commit**: `d056a2c9` (do not display edit page if github url missing), `bd2455ca` (do not show separator if github is disabled)
- **적용 시점**: `DocsPageHeader`에 edit/markdown 액션 버튼을 추가할 때 같이.

---

### ⛔ 적용 보류 (스택 의존, 큰 리팩토링 필요)

| 항목 | 상류 commit | 보류 이유 |
| --- | --- | --- |
| AppHeaderLeft / CTA / Bottom 분할 | `313ef59e`, `72205f9f` | `@nuxt/ui` 컴포넌트 조립 패턴 |
| Assistant 모듈 전체 | `1ff28292` 외 다수 | `USidebar` 등 `@nuxt/ui` 의존 |
| ContentTOC `circuit` variant | `7d90d20c` | TOC 컴포넌트 구조 자체가 다름 |
| `defaultVariants` 포워딩 | `8abf0d4a` | `@nuxt/ui` 전용 |
| LanguageSelect | — | `@nuxtjs/i18n` 의존 |
| `useDocusI18n` 전체 | `dd4a5267`, `7032533e` | i18n 모듈 도입 후 검토 |
| 컬러모드 강제 middleware | `8d8b0a71` | `@nuxt/ui`의 `forced` 컬러모드 API 의존 |

---

## 추천 1차 PR 묶음

다음 5개를 하나의 PR로 묶으면 응집도 좋고 사이즈도 적절함:

1. **#1** `inferSiteURL` Vercel/withHttps 보강
2. **#2** raw `.md` prerender 등록
3. **#4** `content.config.ts` 자동 감지 + `utils/pages.ts`
4. **#5** `app/utils/navigation.ts` 보강 (`transformNavigation`, `findPageBreadcrumbs`)
5. **#6** `sitemap.xml` 라우트

**후속 PR (선택)**:
- **#7 + #8 + #9**: Skills + MCP + markdown-rewrite (AI/에이전트 통합 묶음, `@nuxtjs/mcp-toolkit` 의존성 추가 동반)
- **#10**: `useSeo` (단, hreflang는 i18n 도입 시점까지 보류 또는 noop)
- **#11 + #12**: 컬러모드 단축키 + GitHub edit 가드 (헤더 액션 버튼 추가와 함께)

## 참고 commit 인덱스

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
