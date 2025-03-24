import type { ComponentProps, ReactNode } from "react"

import { Text } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { Toc, TOCItems, TOCScrollArea } from "fumadocs-ui/components/layout/toc"

import type { TableOfContents } from "../core"

import { I18nLabel } from "../ui"

export interface BlogBodyProps extends ComponentProps<"article"> {
  children: ReactNode
  toc?: TableOfContents
}

export function BlogBody({ children, className, toc = [], ...props }: BlogBodyProps) {
  return (
    <div className="flex justify-center gap-6">
      <article {...props} className={cn("prose max-w-3xl pt-12", className)}>
        {children}
      </article>
      <Toc>
        <h3 className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground">
          <Text className="size-4" />
          <I18nLabel label="toc" />
        </h3>
        <TOCScrollArea>
          <TOCItems items={toc} />
        </TOCScrollArea>
      </Toc>
    </div>
  )
}
