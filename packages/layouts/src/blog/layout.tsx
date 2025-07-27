import { cn } from "@zeno/ui/lib/utilities"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import type { HTMLAttributes, ReactNode } from "react"

import type { PageTree } from "../core"

import { type PageStyles, StylesProvider, TreeContextProvider } from "../ui"

export interface BlogLayoutProps extends BaseLayoutProps {
  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  tree: PageTree.Root
}

export function BlogLayout({ children, ...props }: BlogLayoutProps): ReactNode {
  const variables = cn(
    "[--fd-tocnav-height:36px] md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px] xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px]"
  )
  const pageStyles: PageStyles = {
    toc: cn("max-xl:hidden"),
    tocNav: cn("xl:hidden"),
  }

  return (
    <TreeContextProvider tree={props.tree}>
      <main
        id="nd-docs-layout"
        {...props.containerProps}
        className={cn(
          "container flex flex-1 flex-row pe-(--fd-layout-offset)",
          variables,
          props.containerProps?.className
        )}
        style={{
          ...props.containerProps?.style,
        }}
      >
        <StylesProvider {...pageStyles}>{children}</StylesProvider>
      </main>
    </TreeContextProvider>
  )
}
