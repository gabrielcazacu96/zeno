import type { FC, ReactNode } from "react"

import { cn } from "@zeno/ui/lib/utils"

import { H1 } from "../mdx-components/heading"
import { NotFoundLink } from "./index.client"

type NotFoundPageProps = {
  children?: ReactNode
  className?: string
  content?: ReactNode
  labels?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = ({
  children,
  className,
  content = "Submit an issue about broken link",
  labels = "bug",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-[calc(100dvh-var(--nextra-navbar-height))]",
        className,
      )}
    >
      {children || <H1>404: Page Not Found</H1>}
      <NotFoundLink labels={labels}>{content}</NotFoundLink>
    </div>
  )
}
