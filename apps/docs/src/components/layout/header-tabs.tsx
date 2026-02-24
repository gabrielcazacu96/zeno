"use client"

import { Tabs, TabsList, TabsTrigger } from "@zeno/ui/components/tabs"
import { cn } from "@zeno/ui/lib/utils"
import { Link, usePathname } from "fumadocs-core/framework"
import { isTabActive } from "fumadocs-ui/components/sidebar/tabs/dropdown"
import { getSidebarTabs } from "fumadocs-ui/components/sidebar/tabs/index"
import { useMemo } from "react"
import { source } from "@/lib/source"

export function DocsLayoutHeaderTabs() {
  const tabs = useMemo(() => {
    return getSidebarTabs(source.getPageTree())
  }, [])
  const pathname = usePathname()
  const selected = useMemo(() => {
    return tabs.findLast((tab) => isTabActive(tab, pathname))
  }, [tabs, pathname])

  return (
    <div
      className="top-[62px] z-30 hidden *:mx-auto *:max-w-(--fd-layout-width) md:block"
      id="nd-docs-nav"
    >
      <div className="border-b bg-fd-background px-4 py-1.5">
        <Tabs>
          <TabsList>
            {tabs.map((option, i) => (
              <TabsTrigger
                asChild
                className={cn(
                  "text-fd-muted-foreground [&_svg]:size-4!",
                  option.unlisted && selected !== option && "hidden",
                  selected === option && "border-fd-primary text-fd-primary",
                  selected !== option && "hover:text-fd-accent-foreground"
                )}
                // biome-ignore lint/suspicious/noArrayIndexKey: can't do better
                key={i}
                value={option.url}
              >
                <Link href={option.url}>
                  {option.icon}
                  {option.title}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
