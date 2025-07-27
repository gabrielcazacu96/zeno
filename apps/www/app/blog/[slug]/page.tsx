import { BlogBody } from "@zeno/layouts/blog/body"
import { BlogHeader } from "@zeno/layouts/blog/header"
import { BlogPage } from "@zeno/layouts/blog/page"
import { defaultMdxComponents } from "@zeno/layouts/ui"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { createMetadata } from "../../../lib/metadata"
import { blog } from "../../../lib/source"

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = blog.getPage([params.slug])

  if (!page) {
    notFound()
  }

  return createMetadata({
    description:
      page.data.description ?? "The library for building documentation sites",
    title: page.data.title,
  })
}

export function generateStaticParams(): { slug: string | undefined }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }))
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = blog.getPage([params.slug])

  if (!page) {
    notFound()
  }
  const MDX = page.data.body

  return (
    <BlogPage toc={page.data.toc}>
      <BlogHeader {...page.data} />
      <BlogBody toc={page.data.toc}>
        <MDX
          components={{
            ...defaultMdxComponents,
          }}
        />
      </BlogBody>
    </BlogPage>
  )
}
