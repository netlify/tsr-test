import { repo, getBranch } from '~/projects/query'

import { seo } from '~/utils/seo'
import { redirect, useLoaderData, useParams } from '@tanstack/react-router'
import { loadDocs } from '~/utils/docs'
import { Doc } from '~/components/Doc'

export const loader = async (context) => {
  const { _splat: docsPath, version } = context.params
  const { url } = context.request

  // Temporary fix for old react docs structure
  if (url.includes('/docs/react/')) {
    throw redirect(url.replace('/docs/react/', '/docs/framework/react/'))
  }

  // Temporary fix for old vue docs structure
  if (url.includes('/docs/vue/')) {
    throw redirect(url.replace('/docs/vue/', '/docs/framework/vue/'))
  }

  return loadDocs({
    repo,
    branch: getBranch(version),
    docPath: `docs/${docsPath}`,
    currentPath: url,
    redirectPath: url.replace(/\/docs.*/, '/docs/framework/react/overview'),
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return seo({
    title: `${data?.title} | TanStack Query Docs`,
    description: data?.description,
  })
}

export default function RouteDocs() {
  const { title, content, filePath } = Route.useLoaderData()
  const { version } = useParams()
  const branch = getBranch(version)
  return (
    <Doc
      title={title}
      content={content}
      repo={repo}
      branch={branch}
      filePath={filePath}
    />
  )
}
