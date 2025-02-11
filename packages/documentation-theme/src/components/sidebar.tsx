"use client"

import type { Heading } from "nextra"
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages"
import type { FC, FocusEventHandler, MouseEventHandler } from "react"

import { cn } from "@zeno/ui/lib/utils"
import { usePathname } from "next/navigation"
import { Anchor, Button, Collapse } from "nextra/components"
import { useFSRoute, useHash } from "nextra/hooks"
import { ArrowRightIcon, ExpandIcon } from "nextra/icons"
import { forwardRef, useEffect, useId, useRef, useState } from "react"
import scrollIntoView from "scroll-into-view-if-needed"

import {
  setFocusedRoute,
  setMenu,
  useActiveAnchor,
  useConfig,
  useFocusedRoute,
  useMenu,
  useThemeConfig,
  useToc,
} from "../stores"
import { LocaleSwitch } from "./locale-switch"
import { ThemeSwitch } from "./theme-switch"

const TreeState: Record<string, boolean> = Object.create(null)

const classes = {
  active: cn(
    "bg-primary-100 font-semibold text-primary-800 dark:bg-primary-400/10 dark:text-primary-600",
    "contrast-more:border-primary-500!",
  ),
  border: cn(
    "relative before:absolute before:inset-y-1",
    "before:w-px before:bg-gray-200 before:content-[\"\"] dark:before:bg-neutral-800",
    "ps-3 before:start-0 pt-1 ms-3",
  ),
  footer: cn(
    "nextra-sidebar-footer border-t nextra-border flex items-center gap-2 py-4 mx-4",
  ),
  inactive: cn(
    "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
    "dark:text-neutral-400 dark:hover:bg-primary-100/5 dark:hover:text-gray-50",
    "contrast-more:text-gray-900 contrast-more:dark:text-gray-50",
    "contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50",
  ),
  link: cn(
    "flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word]",
    "cursor-pointer contrast-more:border",
  ),
  list: cn("grid gap-1"),
  wrapper: cn("p-4 overflow-y-auto nextra-scrollbar nextra-mask"),
}

type FolderProps = {
  anchors: Heading[]
  item: Item | MenuItem | PageItem
  level: number
  onFocus: FocusEventHandler
}

const Folder: FC<FolderProps> = ({ anchors, item: _item, level, onFocus }) => {
  const routeOriginal = useFSRoute()
  const route = routeOriginal.split("#", 1)[0]!

  const item = {
    ..._item,
    children:
      _item.type === "menu" ? getMenuChildren(_item as MenuItem) : _item.children,
  }

  const hasRoute = !!item.route // for item.type === 'menu' will be ''
  const active = hasRoute && [route, route + "/"].includes(item.route + "/")
  const activeRouteInside
    = active || (hasRoute && route.startsWith(item.route + "/"))

  const focusedRoute = useFocusedRoute()
  const focusedRouteInside = focusedRoute.startsWith(item.route + "/")

  const { theme } = item as Item
  const { autoCollapse, defaultMenuCollapseLevel } = useThemeConfig().sidebar

  const open
    = TreeState[item.route] === undefined
      ? active
      || activeRouteInside
      || focusedRouteInside
      || (theme && "collapsed" in theme
        ? !theme.collapsed
        : level < defaultMenuCollapseLevel)
      : TreeState[item.route] || focusedRouteInside

  const [, rerender] = useState<object>()

  const handleClick: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (event) => {
    const element = event.currentTarget
    const isClickOnIcon
      = element
        !== /* will be always <a> or <button> */ event.target /* can be <svg> or <path> */
    if (isClickOnIcon) {
      event.preventDefault()
    }
    const isOpen = element.parentElement!.classList.contains("open")
    TreeState[item.route] = !isOpen
    rerender({})
  }

  useEffect(() => {
    function updateTreeState() {
      if (activeRouteInside || focusedRouteInside) {
        TreeState[item.route] = true
      }
    }

    function updateAndPruneTreeState() {
      if (activeRouteInside && focusedRouteInside) {
        TreeState[item.route] = true
      }
      else {
        delete TreeState[item.route]
      }
    }

    if (autoCollapse) {
      updateAndPruneTreeState()
    }
    else {
      updateTreeState()
    }
  }, [activeRouteInside, focusedRouteInside, item.route, autoCollapse])

  const isLink = "frontMatter" in item
  // use button when link don't have href because it impacts on SEO
  const ComponentToUse = isLink ? Anchor : Button

  return (
    <li className={cn({ active, open })}>
      <ComponentToUse
        className={cn(
          "items-center justify-between gap-2",
          !isLink && "text-start w-full",
          classes.link,
          active ? classes.active : classes.inactive,
        )}
        data-href={isLink ? undefined : item.route}
        href={isLink ? item.route : undefined}
        onClick={handleClick}
        onFocus={onFocus}
      >
        {item.title}
        <ArrowRightIcon
          className={cn(
            "shrink-0",
            "rounded-sm p-0.5 hover:bg-gray-800/5 dark:hover:bg-gray-100/5",
            "motion-reduce:*:transition-none *:origin-center *:transition-transform *:rtl:-rotate-180",
            open && "*:ltr:rotate-90 *:rtl:-rotate-270",
          )}
          height="18"
        />
      </ComponentToUse>
      {item.children && (
        <Collapse isOpen={open}>
          <Menu
            anchors={anchors}
            className={classes.border}
            // @ts-expect-error -- fixme
            directories={item.children}
            level={level}
          />
        </Collapse>
      )}
    </li>
  )
}

function getMenuChildren(menu: MenuItem) {
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route]),
  )
  return Object.entries(menu.items || {})
    .map(([key, item]) => ({
      ...(routes[key] || { name: key /* for React key prop */ }),
      ...(item as object),
    }))
}

const Separator: FC<{ title: string }> = ({ title }) => {
  return (
    <li
      className={cn(
        "[word-break:break-word]",
        title
          ? "not-first:mt-5 mb-2 px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100"
          : "my-4",
      )}
    >
      {title || (
        <hr className="mx-2 border-t border-gray-200 dark:border-primary-100/10" />
      )}
    </li>
  )
}

const handleClick = () => {
  setMenu(false)
}

const File: FC<{
  anchors: Heading[]
  item: Item | PageItem
  onFocus: FocusEventHandler
}> = ({ anchors, item, onFocus }) => {
  const route = useFSRoute()
  // It is possible that the item doesn't have any route - for example, an external link.
  const active = item.route && [route, route + "/"].includes(item.route + "/")
  const activeSlug = useActiveAnchor()

  if (item.type === "separator") {
    return <Separator title={item.title} />
  }

  return (
    <li className={cn({ active })}>
      <Anchor
        className={cn(classes.link, active ? classes.active : classes.inactive)}
        href={(item as PageItem).href || item.route}
        onFocus={onFocus}
      >
        {item.title}
      </Anchor>
      {active && anchors.length > 0 && (
        <ul className={cn(classes.list, classes.border)}>
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <a
                className={cn(
                  classes.link,
                  "focus-visible:nextra-focus flex gap-2 before:opacity-25 before:content-[\"#\"]",
                  id === activeSlug ? classes.active : classes.inactive,
                )}
                href={`#${id}`}
                onClick={handleClick}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

interface MenuProps {
  anchors: Heading[]
  className?: string
  directories: Item[] | PageItem[]
  level: number
}

const handleFocus: FocusEventHandler<HTMLAnchorElement> = (event) => {
  const route
    = event.target.getAttribute("href") || event.target.dataset.href || ""
  setFocusedRoute(route)
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ anchors, className, directories, level }, forwardedReference) => (
    <ul className={cn(classes.list, className)} ref={forwardedReference}>
      {directories.map((item) => {
        const ComponentToUse
          = item.type === "menu" || item.children?.length ? Folder : File

        return (
          <ComponentToUse
            anchors={anchors}
            item={item}
            key={item.name}
            level={level + 1}
            onFocus={handleFocus}
          />
        )
      })}
    </ul>
  ),
)
Menu.displayName = "Menu"

export const MobileNav: FC = () => {
  const { directories } = useConfig().normalizePagesResult
  const toc = useToc()

  const menu = useMenu()
  const pathname = usePathname()
  const hash = useHash()

  useEffect(() => {
    setMenu(false)
    // Close mobile menu when path changes or hash changes (e.g. clicking on search result which points to the current page)
  }, [pathname, hash])

  const anchors = toc.filter(v => v.depth === 2)
  const sidebarReference = useRef<HTMLUListElement>(null!)

  useEffect(() => {
    const activeElement = sidebarReference.current.querySelector("li.active")

    if (activeElement && menu) {
      scrollIntoView(activeElement, {
        block: "center",
        boundary: sidebarReference.current.parentNode as HTMLElement,
        inline: "center",
        scrollMode: "always",
      })
    }
  }, [menu])

  const themeConfig = useThemeConfig()
  const hasI18n = themeConfig.i18n.length > 0
  const hasMenu = themeConfig.darkMode || hasI18n

  return (
    <aside
      className={cn(
        "nextra-mobile-nav", // targeted from userspace
        "flex flex-col",
        "fixed inset-0 pt-(--nextra-navbar-height) z-10 overscroll-contain",
        "[contain:layout_style]",
        "md:hidden",
        "[.nextra-banner:not([class$=hidden])~&]:pt-[calc(var(--nextra-banner-height)+var(--nextra-navbar-height))]",
        "bg-nextra-bg",
        menu
          ? "[transform:translate3d(0,0,0)]"
          : "[transform:translate3d(0,-100%,0)]",
      )}
    >
      {themeConfig.search && (
        <div className="px-4 pt-4">{themeConfig.search}</div>
      )}
      <Menu
        // Always show the anchor links on mobile (`md`).
        anchors={anchors}
        className={classes.wrapper}
        // The mobile dropdown menu, shows all the directories.
        directories={directories}
        level={0}
        ref={sidebarReference}
      />

      {hasMenu && (
        <div className={cn(classes.footer, "mt-auto")}>
          <ThemeSwitch className="grow" />
          <LocaleSwitch className="grow justify-end" />
        </div>
      )}
    </aside>
  )
}

export const Sidebar: FC<{ toc: Heading[] }> = ({ toc }) => {
  const { hideSidebar, normalizePagesResult } = useConfig()
  const themeConfig = useThemeConfig()
  const [isExpanded, setIsExpanded] = useState(themeConfig.sidebar.defaultOpen)
  const [showToggleAnimation, setToggleAnimation] = useState(false)
  const sidebarReference = useRef<HTMLDivElement>(null)
  const sidebarControlsId = useId()

  const { activeThemeContext, docsDirectories } = normalizePagesResult
  const includePlaceholder = activeThemeContext.layout === "default"

  useEffect(() => {
    const activeElement = sidebarReference.current?.querySelector("li.active")

    if (activeElement && window.innerWidth > 767) {
      scrollIntoView(activeElement, {
        block: "center",
        boundary: sidebarReference.current!.parentNode as HTMLDivElement,
        inline: "center",
        scrollMode: "always",
      })
    }
  }, [])

  const anchors
    // When the viewport size is larger than `md`, hide the anchors in
    // the sidebar when `floatTOC` is enabled.
    = themeConfig.toc.float ? [] : toc.filter(v => v.depth === 2)

  const hasI18n = themeConfig.i18n.length > 0
  const hasMenu
    = themeConfig.darkMode || hasI18n || themeConfig.sidebar.toggleButton

  return (
    <>
      {includePlaceholder && hideSidebar && (
        <div className="max-xl:hidden h-0 w-64 shrink-0" />
      )}
      <aside
        className={cn(
          "nextra-sidebar print:hidden",
          "transition-all ease-in-out",
          "max-md:hidden flex flex-col",
          "h-[calc(100dvh-var(--nextra-menu-height))]",
          "top-(--nextra-navbar-height) shrink-0",
          isExpanded ? "w-64" : "w-20",
          hideSidebar ? "hidden" : "sticky",
        )}
        id={sidebarControlsId}
      >
        <div
          className={cn(
            classes.wrapper,
            "grow",
            !isExpanded && "no-scrollbar",
          )}
          ref={sidebarReference}
        >
          {/* without !hideSidebar check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
          {(!hideSidebar || !isExpanded) && (
            <Collapse horizontal isOpen={isExpanded}>
              <Menu
                anchors={anchors}
                // The sidebar menu, shows only the docs directories.
                directories={docsDirectories}
                level={0}
              />
            </Collapse>
          )}
        </div>
        {hasMenu && (
          <div
            className={cn(
              "sticky bottom-0 bg-nextra-bg",
              classes.footer,
              !isExpanded && "flex-wrap justify-center",
              showToggleAnimation && [
                "*:opacity-0",
                isExpanded
                  ? "*:animate-[fade-in_1s_ease_.2s_forwards]"
                  : "*:animate-[fade-in2_1s_ease_.2s_forwards]",
              ],
            )}
          >
            <LocaleSwitch
              className={isExpanded ? "grow" : ""}
              lite={!isExpanded}
            />
            <ThemeSwitch
              className={!isExpanded || hasI18n ? "" : "grow"}
              lite={!isExpanded || hasI18n}
            />
            {themeConfig.sidebar.toggleButton && (
              <Button
                aria-controls={sidebarControlsId}
                aria-expanded={isExpanded}
                className={({ hover }) =>
                  cn(
                    "rounded-md p-2",
                    hover
                      ? "bg-gray-100 text-gray-900 dark:bg-primary-100/5 dark:text-gray-50"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                onClick={() => {
                  setIsExpanded(previous => !previous)
                  setToggleAnimation(true)
                }}
                title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              >
                <ExpandIcon
                  className={cn(
                    !isExpanded && "*:first:origin-[35%] *:first:rotate-180",
                  )}
                  height="12"
                />
              </Button>
            )}
          </div>
        )}
      </aside>
    </>
  )
}
