import { Outlet, json, useLoaderData } from '@tanstack/react-router'
import {
  repo,
  getBranch,
  colorTo,
  latestVersion,
  colorFrom,
  textColor,
  availableVersions,
  frameworks,
} from '~/projects/ranger'
import { seo } from '~/utils/seo'
import { DocsLayout } from '~/components/DocsLayout'
import { getTanstackDocsConfig } from '~/utils/config'
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'

export const loader = async (context) => {
  const { version } = context.params
  const branch = getBranch(version)

  const config = await getTanstackDocsConfig(repo, branch)

  return json({
    config,
    version,
  })
}

export const meta = () => {
  return seo({
    title: 'TanStack Ranger Docs | React Ranger',
    description: 'Modern and headless ranger UI library',
  })
}

export default function DocsRoute() {
  const { version, config } = Route.useLoaderData()

  return (
    <DocsLayout
      name="Ranger"
      version={version === 'latest' ? latestVersion : version!}
      colorFrom={colorFrom}
      colorTo={colorTo}
      textColor={textColor}
      config={config}
      frameworks={frameworks}
      availableVersions={availableVersions}
      repo={repo}
    >
      <Outlet />
    </DocsLayout>
  )
}
