import { Outlet, json, redirect, useLoaderData } from '@tanstack/react-router'

import { availableVersions, latestVersion } from '~/projects/query'
import { RedirectVersionBanner } from '~/components/RedirectVersionBanner'
import { useClientOnlyRender } from '~/utils/useClientOnlyRender'
import type { LoaderFunctionArgs } from '@remix-run/node'

export const loader = async (context) => {
  const { version } = context.params

  const redirectUrl = context.request.url.replace(version!, 'latest')

  if (!availableVersions.concat('latest').includes(version!)) {
    throw redirect(redirectUrl)
  }

  return {
    version,
  }
}

export default function RouteVersionParam() {
  const { version, redirectUrl } = Route.useLoaderData()

  if (!useClientOnlyRender()) {
    return null
  }

  return (
    <>
      <RedirectVersionBanner
        version={version!}
        latestVersion={latestVersion}
        redirectUrl={redirectUrl}
      />
      <Outlet />
    </>
  )
}
