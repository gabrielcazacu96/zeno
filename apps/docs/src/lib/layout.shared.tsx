import {
  type Folder,
  findPath,
  getPageTreeRoots,
  type Item,
} from "fumadocs-core/page-tree"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import type { ReactNode } from "react"
import { HeaderDocumentationItem } from "@/components/layout/header-documentation-item"
import { source } from "./source"

export interface SubMenuLinkProps {
  description: ReactNode
  href: string
  icon: ReactNode
  title: ReactNode
}

function getDocsMenuItems(): SubMenuLinkProps[] {
  const roots = getPageTreeRoots(source.getPageTree())
  return roots
    .filter((root): root is Folder => "type" in root && root.type === "folder")
    .map((folder) => ({
      description: folder.index?.description ?? folder.description ?? "",
      href:
        (findPath(folder.children, (node) => node.type === "page")?.[0] as Item)
          ?.url ?? "/",
      icon: folder.icon,
      title: folder.name,
    }))
}

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/zeno-lib/zeno",
    nav: {
      title: "Zeno",
      transparentMode: "none",
    },
  }
}

export function homeOptions(): BaseLayoutProps {
  const docsMenuItems = getDocsMenuItems()
  return {
    ...baseOptions(),
    links: [
      {
        on: "nav",
        text: "Discover",
        url: "/",
      },
      {
        items: docsMenuItems.map((item) => ({
          icon: item.icon,
          text: item.title,
          url: item.href,
        })),
        on: "menu",
        text: "Documentation",
        type: "menu",
      },
      {
        children: <HeaderDocumentationItem docsMenuItems={docsMenuItems} />,
        on: "nav",
        type: "custom",
      },
      {
        text: "Showcase",
        url: "/showcase",
      },
      {
        text: "About",
        url: "/about",
      },
      {
        text: "Blog",
        url: "/blog",
      },
      {
        text: "Changelog",
        url: "/changelog",
      },
    ],
  }
}
