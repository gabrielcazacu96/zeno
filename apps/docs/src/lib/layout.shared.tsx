import Link from "fumadocs-core/link"
import {
  type Folder,
  findPath,
  getPageTreeRoots,
  type Item,
} from "fumadocs-core/page-tree"
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import type { ReactNode } from "react"
import { source } from "@/lib/source"

interface SubMenuLinkProps {
  description: ReactNode
  href: string
  icon: ReactNode
  title: ReactNode
}

function SubMenuLink({ description, href, icon, title }: SubMenuLinkProps) {
  return (
    <NavbarMenuLink href={href}>
      <div className="mb-2 self-start rounded-md bg-fd-primary p-1 text-fd-primary-foreground [&>svg]:size-4">
        {icon}
      </div>
      <p className="font-medium">{title}</p>
      <p className="text-fd-muted-foreground text-sm">{description}</p>
    </NavbarMenuLink>
  )
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
    nav: {
      title: "Zeno",
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
        children: (
          <NavbarMenu>
            <NavbarMenuTrigger>
              <Link href="/docs">Documentation</Link>
            </NavbarMenuTrigger>
            <NavbarMenuContent>
              {docsMenuItems.map((item) => (
                <SubMenuLink key={item.href} {...item} />
              ))}
            </NavbarMenuContent>
          </NavbarMenu>
        ),
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
