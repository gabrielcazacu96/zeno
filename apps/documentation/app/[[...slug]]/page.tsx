import { metadataImage } from "@/lib/metadata"
import { source } from "@/lib/source"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@zeno/layouts/ui"
import { defaultMdxComponents } from "@zeno/layouts/ui"
import { notFound } from "next/navigation"
import React from "react"

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const parameters = await props.params
  const page = source.getPage(parameters.slug)
  if (!page) notFound()

  return metadataImage.withImage(page.slugs, {
    description: page.data.description,
    title: page.data.title,
  })
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  return source.generateParams()
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const parameters = await props.params
  const page = source.getPage(parameters.slug)
  if (!page) notFound()

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
