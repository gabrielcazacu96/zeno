"use client"

import type { FC, ReactNode } from "react"

import { usePathname } from "next/navigation"

import { useMounted } from "../hooks/use-mounted"
import { Link } from "../mdx-components/link"
import { useThemeConfig } from "../stores"
import { getGitIssueUrl } from "../utils"

export const NotFoundLink: FC<{
  children: ReactNode
  labels: string
}> = ({ children, labels }) => {
  const config = useThemeConfig()
  const pathname = usePathname()
  const mounted = useMounted()
  const reference = mounted && document.referrer
  const referrer = reference ? ` from "${reference}"` : ""

  return (
    <Link
      className="mt-6"
      href={getGitIssueUrl({
        labels,
        repository: config.docsRepositoryBase,
        title: `Found broken "${mounted ? pathname : ""}" link${referrer}. Please fix!`,
      })}
    >
      {children}
    </Link>
  )
}
