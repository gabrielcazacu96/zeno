import type { FC, ReactNode } from "react"

import { cn } from "@zeno/ui/lib/utils"

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
      {children || <h1>404: Page Not Found</h1>}
      <NotFoundLink labels={labels}>{content}</NotFoundLink>
    </div>
  )
}
