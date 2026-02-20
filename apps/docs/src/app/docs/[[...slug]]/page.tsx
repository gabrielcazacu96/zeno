import { findSiblings, type Item } from "fumadocs-core/page-tree"
import { Card, Cards } from "fumadocs-ui/components/card"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions"
import { getPageImage, source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  const MDX = page.data.body
  const gitConfig = {
    branch: "main",
    repo: "repo",
    user: "username",
  }

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`}
          // update it to match your repo
          markdownUrl={`${page.url}.mdx`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            // biome-ignore lint/correctness/noNestedComponentDefinitions: STFU
            DocsCategory: ({ url }) => {
              return <DocsCategory url={url ?? page.url} />
            },
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {/** biome-ignore lint/suspicious/useIterableCallbackReturn: it does */}
      {findSiblings(source.getPageTree(), url).map((item) => {
        if (item.type === "separator") {
          return
        }
        if (item.type === "folder" && !item.index) {
          return
        }

        const renderedItem: Item =
          item.type === "folder" && item.index ? item.index : (item as Item)

        return (
          <Card
            href={renderedItem.url}
            key={renderedItem.url}
            title={renderedItem.name}
          >
            {renderedItem.description}
          </Card>
        )
      })}
    </Cards>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  return {
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
    title: page.data.title,
  }
}
