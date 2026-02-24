"use client"

import { cn } from "@zeno/ui/lib/utils"
import { Link, usePathname } from "fumadocs-core/framework"
import { isTabActive } from "fumadocs-ui/components/sidebar/tabs/dropdown"
import {
  getSidebarTabs,
  type SidebarTab,
} from "fumadocs-ui/components/sidebar/tabs/index"
import { type ComponentProps, useMemo } from "react"
import { source } from "@/lib/source"

function LayoutTabs({
  options,
  ...props
}: ComponentProps<"div"> & {
  options: SidebarTab[]
}) {
  const pathname = usePathname()
  const selected = useMemo(() => {
    return options.findLast((option) => isTabActive(option, pathname))
  }, [options, pathname])

  return (
    <div
      {...props}
      className={cn(
        "flex flex-row items-end gap-6 overflow-auto [grid-area:main]",
        props.className
      )}
    >
      {options.map((option, i) => (
        <Link
          className={cn(
            "inline-flex items-center gap-1 text-nowrap border-transparent border-b-2 pb-1.5 font-medium text-fd-muted-foreground text-sm transition-colors hover:text-fd-accent-foreground [&_svg]:size-4!",
            option.unlisted && selected !== option && "hidden",
            selected === option && "border-fd-primary text-fd-primary"
          )}
          href={option.url}
          // biome-ignore lint/suspicious/noArrayIndexKey: can't do better
          key={i}
        >
          {option.icon}
          {option.title}
        </Link>
      ))}
    </div>
  )
}

export function DocsLayoutHeaderTabs({
  className,
  ...props
}: ComponentProps<"div">) {
  const tabs = useMemo(() => {
    return getSidebarTabs(source.getPageTree())
  }, [])

  return (
    <div
      className={cn(
        "top-[60px] z-30 hidden *:mx-auto *:max-w-(--fd-layout-width) md:block",
        className
      )}
      id="nd-docs-nav"
      {...props}
    >
      <LayoutTabs
        className="z-10 border-b bg-fd-background px-4 pt-3 max-md:hidden"
        options={tabs}
      />
    </div>
  )
}
