import { Outlet } from '@tanstack/react-router'
import { seo } from '~/utils/seo'

import { Scarf } from '~/components/Scarf'

export const meta = () => {
  return seo({
    title: 'TanStack Table | React Table, Solid Table, Svelte Table, Vue Table',
    description:
      'Headless UI for building powerful tables & datagrids with TS/JS, React, Solid, Svelte and Vue',
    image: 'https://github.com/tanstack/table/raw/main/media/repo-header.png',
  })
}

export const loader = async (context) => {
  if (
    !context.request.url.includes('/table/v') &&
    !context.request.url.includes('/table/latest')
  ) {
    return redirect(`${new URL(context.request.url).origin}/table/latest`)
  }

  return new Response('OK')
}

export default function RouteReactTable() {
  return (
    <>
      <Outlet />
      <Scarf id="dc8b39e1-3fe9-4f3a-8e56-d4e2cf420a9e" />
    </>
  )
}
