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
      header: {
        $schema: {
          title: 'Header Configuration',
          description: 'Header configuration options',
        },
        title: {
          $default: '',
          $schema: {
            title: 'Header Title',
            description: 'Title displayed in the header (defaults to site title)',
            type: 'string',
          },
        },
        logo: {
          $schema: {
            title: 'Logo Configuration',
            description: 'Logo images for light and dark modes',
          },
          light: {
            $default: '',
            $schema: {
              title: 'Light Mode Logo',
              description: 'Logo image for light mode',
              type: 'string',
            },
          },
          dark: {
            $default: '',
            $schema: {
              title: 'Dark Mode Logo',
              description: 'Logo image for dark mode',
              type: 'string',
            },
          },
          alt: {
            $default: '',
            $schema: {
              title: 'Logo Alt Text',
              description: 'Alt text for the logo image',
              type: 'string',
            },
          },
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
