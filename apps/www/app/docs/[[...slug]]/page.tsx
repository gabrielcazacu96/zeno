import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  defaultMdxComponents,
} from "@zeno/layouts/ui"
import { notFound } from "next/navigation"

import { metadataImage } from "../../../lib/metadata"
import { documentation } from "../../../lib/source"

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const parameters = await props.params
  const page = documentation.getPage(parameters.slug)
  if (!page) {
    notFound()
  }

  return metadataImage.withImage(page.slugs, {
    description: page.data.description,
    title: page.data.title,
  })
}

export function generateStaticParams() {
  return documentation.generateParams()
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const parameters = await props.params
  const page = documentation.getPage(parameters.slug)
  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  )
}
