import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 's47moswb',
    dataset: 'production',
  },
  // @ts-expect-error typegen is supported in Sanity CLI schema configuration
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
