"use client"

import type { MenuItem, PageItem } from "nextra/normalize-pages"
import type { FC, ReactNode } from "react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@zeno/ui/components/dropdown-menu"
import { ArrowRightIcon, MenuIcon } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { Anchor, Button } from "nextra/components"
import { useFSRoute } from "nextra/hooks"

import { setMenu, useConfig, useMenu, useThemeConfig } from "../../stores"

const classes = {
  link: cn(
    "text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap",
    "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
    "ring-inset transition-colors",
  ),
}

const NavbarMenu: FC<{
  children: ReactNode
  menu: MenuItem
}> = ({ children, menu }) => {
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route]),
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          classes.link,
          "items-center flex gap-1.5 cursor-pointer",
        )}
      >
        {children}
        <ArrowRightIcon
          className="*:origin-center *:transition-transform *:rotate-90"
          height="14"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "focus-visible:nextra-focus",
          "nextra-scrollbar origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none",
          "border border-black/5 dark:border-white/20",
          "backdrop-blur-md bg-nextra-bg/70",
          "z-20 rounded-md py-1 text-sm shadow-lg",
          // headlessui adds max-height as style, use !important to override
          "max-h-[min(calc(100vh-5rem),256px)]!",
        )}
      >
        {Object.entries(

          (menu.items as Record<string, { href?: string, title: string }>) || {},
        ).map(([key, item]) => (
          <DropdownMenuItem
            asChild
            className={cn(
              "block py-1.5 transition-colors ps-3 pe-9 text-gray-600 dark:text-gray-400",
            )}
            key={key}
          >
            <Anchor href={item.href || routes[key]?.route}>
              {item.title}
            </Anchor>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const isMenu = (page: MenuItem | PageItem): page is MenuItem => page.type === "menu"

export const ClientNavbar: FC<{
  children: ReactNode
}> = ({ children }) => {
  const items = useConfig().normalizePagesResult.topLevelNavbarItems
  const themeConfig = useThemeConfig()

  const pathname = useFSRoute()
  const menu = useMenu()

  return (
    <>
      <div className="flex gap-4 overflow-x-auto nextra-scrollbar py-1.5 max-md:hidden">
        {items.map((page) => {
          if ("display" in page && page.display === "hidden") return
          if (isMenu(page)) {
            return (
              <NavbarMenu key={page.name} menu={page}>
                {page.title}
              </NavbarMenu>
            )
          }
          let href = page.href || page.route || "#"

          // If it's a directory
          if (page.children) {
            href
              = ("frontMatter" in page ? page.route : page.firstChildRoute)
                || href
          }

          const isCurrentPage
            = page.route === pathname
              || pathname.startsWith(page.route + "/")
              || undefined

          return (
            <Anchor
              aria-current={isCurrentPage}
              className={cn(
                classes.link,
                "aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current",
              )}
              href={href}
              key={page.name}
            >
              {page.title}
            </Anchor>
          )
        })}
      </div>
      {themeConfig.search && (
        <div className="max-md:hidden">{themeConfig.search}</div>
      )}

      {children}

      <Button
        aria-label="Menu"
        className={({ active }) =>
          cn("nextra-hamburger md:hidden", active && "bg-gray-400/20")}
        onClick={() => setMenu(previous => !previous)}
      >
        <MenuIcon className={cn({ open: menu })} height="24" />
      </Button>
    </>
  )
}
