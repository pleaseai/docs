export default defineNuxtSchema({
  appConfig: {
    docs: {
      $schema: {
        title: 'Docs Configuration',
        description: 'Configuration for the documentation layer',
      },
      title: {
        $default: 'Documentation',
        $schema: {
          title: 'Site Title',
          description: 'The title of the documentation site',
          type: 'string',
        },
      },
      description: {
        $default: '',
        $schema: {
          title: 'Site Description',
          description: 'The description of the documentation site',
          type: 'string',
        },
      },
      url: {
        $default: '',
        $schema: {
          title: 'Site URL',
          description: 'The URL of the documentation site',
          type: 'string',
        },
      },
      github: {
        $schema: {
          title: 'GitHub Configuration',
          description: 'GitHub repository configuration',
        },
        owner: {
          $default: '',
          $schema: {
            title: 'Repository Owner',
            type: 'string',
          },
        },
        name: {
          $default: '',
          $schema: {
            title: 'Repository Name',
            type: 'string',
          },
        },
        url: {
          $default: '',
          $schema: {
            title: 'Repository URL',
            type: 'string',
          },
        },
        branch: {
          $default: 'main',
          $schema: {
            title: 'Default Branch',
            type: 'string',
          },
        },
      },
    },
  },
})
