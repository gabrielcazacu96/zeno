"use client"

import { usePathname } from "fumadocs-core/framework"
import Link from "fumadocs-core/link"
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar"
import type { SubMenuLinkProps } from "@/lib/layout.shared"
import { DocsLayoutHeaderTabs } from "./header-tabs"

function normalize(urlOrPath: string) {
  if (urlOrPath.length > 1 && urlOrPath.endsWith("/")) {
    return urlOrPath.slice(0, -1)
  }
  return urlOrPath
}

/**
 * @returns if `href` is matching the given pathname
 */
function isActive(href: string, pathname: string, nested = false): boolean {
  const normalizedHref = normalize(href)
  const normalizedPathname = normalize(pathname)

  return (
    normalizedHref === normalizedPathname ||
    (nested && normalizedPathname.startsWith(`${normalizedHref}/`))
  )
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

export function HeaderDocumentationItem({
  docsMenuItems,
}: {
  docsMenuItems: SubMenuLinkProps[]
}) {
  const pathname = usePathname()
  const active = isActive("/docs", pathname, true)

  return (
    <>
      {active && <DocsLayoutHeaderTabs />}
      <NavbarMenu>
        <NavbarMenuTrigger data-active={active}>
          <Link href="/docs">Documentation</Link>
        </NavbarMenuTrigger>
        {!active && (
          <NavbarMenuContent>
            {docsMenuItems.map((item) => (
              <SubMenuLink key={item.href} {...item} />
            ))}
          </NavbarMenuContent>
        )}
      </NavbarMenu>
    </>
  )
}
