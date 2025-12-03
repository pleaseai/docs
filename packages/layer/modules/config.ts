import { defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { getGitBranch, getGitEnv } from '../utils/git'
import { getPackageJsonMetadata, inferSiteURL } from '../utils/meta'

export default defineNuxtModule({
  meta: {
    name: 'docs-config',
  },
  async setup(_options, nuxt) {
    const dir = nuxt.options.rootDir
    const url = inferSiteURL()
    const meta = await getPackageJsonMetadata(dir)
    const gitInfo = getGitEnv()
    const siteName = meta.name || gitInfo?.name || 'Docs'

    nuxt.options.appConfig.docs = defu(nuxt.options.appConfig.docs, {
      title: siteName,
      description: meta.description || '',
      url,
      github: {
        owner: gitInfo?.owner,
        name: gitInfo?.name,
        url: gitInfo?.url,
        branch: getGitBranch(),
      },
    })

    // SEO defaults
    nuxt.options.app.head = defu(nuxt.options.app.head, {
      title: siteName,
      titleTemplate: `%s - ${siteName}`,
      meta: [
        { name: 'description', content: meta.description || '' },
      ],
    })
  },
})
