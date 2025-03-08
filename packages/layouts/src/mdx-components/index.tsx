// TODO: check why components in object aren't optimized
"use no memo"

import type { MDXComponents } from "nextra/mdx-components"
import type { ComponentProps, FC } from "react"

import { Code } from "@zeno/ui/components/code"
import { Summary } from "@zeno/ui/components/summary"
import { cn } from "@zeno/ui/lib/utils"
import {
  Callout,
  Details,
  Pre,
  Table,
  withGitHubAlert,
  withIcons,
} from "nextra/components"
import { useMDXComponents as getNextraMDXComponents } from "nextra/mdx-components"
import { removeLinks } from "nextra/remove-links"

import { Sidebar } from "../components"
import { H1, H2, H3, H4, H5, H6 } from "./heading"
import { Link } from "./link"
import { ClientWrapper } from "./wrapper.client"

const Blockquote: FC<ComponentProps<"blockquote">> = props => (
  <blockquote
    className={cn(
      "not-first:mt-6 border-gray-300 italic text-gray-700 dark:border-gray-700 dark:text-gray-400",
      "border-s-2 ps-6",
    )}
    {...props}
  />
)

const DEFAULT_COMPONENTS = getNextraMDXComponents({
  a: Link,
  blockquote: withGitHubAlert(({ type, ...props }) => {
    const calloutType = (
      {
        caution: "error",
        important: "error", // TODO
        note: "info",
        tip: "default",
        warning: "warning",
      } as const
    )[type]

    return <Callout type={calloutType} {...props} />
  }, Blockquote),
  code: Code,
  details: Details,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: props => <hr className="my-8 nextra-border" {...props} />,
  li: props => <li className="my-2" {...props} />,
  ol: props => (
    <ol
      className="[:is(ol,ul)_&]:my-3 not-first:mt-6 list-decimal ms-6"
      {...props}
    />
  ),
  p: props => <p className="not-first:mt-6 leading-7" {...props} />,
  pre: withIcons(Pre),
  summary: Summary,
  table: ({ className, ...props }) => (
    <Table
      className={cn("nextra-scrollbar not-first:mt-6 p-0", className)}
      {...props}
    />
  ),
  td: Table.Td,
  th: Table.Th,
  tr: Table.Tr,
  ul: props => (
    <ul
      className="[:is(ol,ul)_&]:my-3 not-first:mt-6 list-disc ms-6"
      {...props}
    />
  ),
  wrapper({ bottomContent, children, metadata, toc, ...props }) {
    // @ts-expect-error fixme
    toc = toc.map(item => ({
      ...item,
      value: removeLinks(item.value),
    }))
    return (
      <div
        className="mx-auto flex max-w-(--nextra-content-width)"
        // Attach user-defined props to wrapper container, e.g. `data-pagefind-filter`
        {...props}
      >
        <Sidebar toc={toc} />

        <ClientWrapper
          bottomContent={bottomContent}
          metadata={metadata}
          toc={toc}
        >
          <main
            data-pagefind-body={
              (metadata as any).searchable !== false || undefined
            }
          >
            {children}
          </main>
        </ClientWrapper>
      </div>
    )
  },
})

export const useMDXComponents = (components?: Readonly<MDXComponents>) => {
  return {
    ...DEFAULT_COMPONENTS,
    ...components,
  } satisfies MDXComponents
}
