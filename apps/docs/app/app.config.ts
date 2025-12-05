export default defineAppConfig({
  docs: {
    title: 'docs-please',
    github: {
      url: 'https://github.com/pleaseai/docs',
      owner: 'pleaseai',
      name: 'docs',
      branch: 'main',
    },
  },
  github: {
    rootDir: 'apps/docs',
  },
  ui: {
    pageHero: {
      slots: {
        title: 'font-semibold sm:text-6xl',
        container: '!pb-0',
      },
    },
    pageCard: {
      slots: {
        container: 'lg:flex min-w-0',
        wrapper: 'flex-none',
      },
    },
  },
})
