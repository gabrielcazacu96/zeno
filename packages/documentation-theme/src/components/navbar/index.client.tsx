"use client"

import type { MenuItem, PageItem } from "nextra/normalize-pages"
import type { FC, ReactNode } from "react"

import {
  MenuItem as _MenuItem,
  Menu,
  MenuButton,
  MenuItems,
} from "@headlessui/react"
import { cn } from "@zeno/ui/lib/utils"
import { Anchor, Button } from "nextra/components"
import { useFSRoute } from "nextra/hooks"
import { ArrowRightIcon, MenuIcon } from "nextra/icons"

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
    <Menu>
      <MenuButton
        className={({ focus }) =>
          cn(
            classes.link,
            "items-center flex gap-1.5 cursor-pointer",
            focus && "nextra-focus",
          )}
      >
        {children}
        <ArrowRightIcon
          className="*:origin-center *:transition-transform *:rotate-90"
          height="14"
        />
      </MenuButton>
      <MenuItems
        anchor={{ gap: 10, padding: 16, to: "bottom" }}
        className={cn(
          "focus-visible:nextra-focus",
          "nextra-scrollbar origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none",
          "border border-black/5 dark:border-white/20",
          "backdrop-blur-md bg-nextra-bg/70",
          "z-20 rounded-md py-1 text-sm shadow-lg",
          // headlessui adds max-height as style, use !important to override
          "max-h-[min(calc(100vh-5rem),256px)]!",
        )}
        transition
      >
        {Object.entries(

          (menu.items as Record<string, { href?: string, title: string }>) || {},
        ).map(([key, item]) => (
          <_MenuItem
            as={Anchor}
            className={({ focus }) =>
              cn(
                "block py-1.5 transition-colors ps-3 pe-9",
                focus
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400",
              )}
            href={item.href || routes[key]?.route}
            key={key}
          >
            {item.title}
          </_MenuItem>
        ))}
      </MenuItems>
    </Menu>
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
