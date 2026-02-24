import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { DocsLayoutHeaderTabs } from "@/components/layout/header-tabs"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <DocsLayoutHeaderTabs />
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
      </DocsLayout>
    </>
  )
}
