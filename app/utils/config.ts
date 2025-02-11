import { z } from 'zod'
import { fetchRepoFile } from './documents.server'
import { createServerFn } from '@tanstack/react-router'

export type FrameworkMenu = {
  framework: string
  menuItems: MenuItem[]
}

export type MenuItem = {
  label: string | React.ReactNode
  children: {
    label: string | React.ReactNode
    to: string
    badge?: string
  }[]
}

const menuItemSchema = z.object({
  label: z.string(),
  children: z.array(
    z.object({
      label: z.string(),
      to: z.string(),
      badge: z.string().optional(),
    })
  ),
})

const frameworkMenuSchema = z.object({
  framework: z.string(),
  menuItems: z.array(menuItemSchema),
})

const configSchema = z.object({
  docSearch: z.object({
    appId: z.string(),
    apiKey: z.string(),
    indexName: z.string(),
  }),
  menu: z.array(menuItemSchema),
  frameworkMenus: z.array(frameworkMenuSchema),
  users: z.array(z.string()).optional(),
})

export type ConfigSchema = z.infer<typeof configSchema>

/**
  Fetch the config file for the project and validate it.
  */
export const getTanstackDocsConfig = createServerFn(
  'GET',
  async ({ repo, branch }: { repo: string; branch: string }) => {
    'use server'

    const config = await fetchRepoFile(repo, branch, `docs/config.json`)

    if (!config) {
      throw new Error('Repo docs/config.json not found!')
    }

    try {
      const tanstackDocsConfigFromJson = JSON.parse(config)
      const validationResult = configSchema.safeParse(
        tanstackDocsConfigFromJson
      )

      if (!validationResult.success) {
        // Log the issues that come up during validation
        console.error(JSON.stringify(validationResult.error, null, 2))
        throw new Error('Zod validation failed')
      }

      return validationResult.data
    } catch (e) {
      throw new Error('Invalid docs/config.json file')
    }
  }
)
