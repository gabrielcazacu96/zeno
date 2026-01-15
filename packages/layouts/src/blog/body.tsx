import { cn } from "@zeno/ui/lib/utils"
import { AnchorProvider } from "fumadocs-core/toc"
import {
  TOCItems,
  TOCProvider,
  TOCScrollArea,
} from "fumadocs-ui/components/layout/toc"
import type { ComponentProps, ReactNode } from "react"

import type { TableOfContents } from "../core"

export interface BlogBodyProps extends ComponentProps<"article"> {
  children: ReactNode
  toc?: TableOfContents
}

export function BlogBody({
  children,
  className,
  toc = [],
  ...props
}: BlogBodyProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="flex justify-center gap-6">
        <article {...props} className={cn("prose max-w-3xl pt-12", className)}>
          {children}
        </article>
        <div className="sticky top-0 max-h-screen py-6">
          <TOCProvider toc={toc}>
            <TOCScrollArea>
              <TOCItems />
            </TOCScrollArea>
          </TOCProvider>
        </div>
      </div>
    </AnchorProvider>
  )
}
