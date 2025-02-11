"use client"

import type { Heading } from "nextra"
import type { FC } from "react"

import { cn } from "@zeno/ui/lib/utils"
import { Anchor } from "nextra/components"
import { useEffect, useRef } from "react"
import scrollIntoView from "scroll-into-view-if-needed"

import { useActiveAnchor, useConfig, useThemeConfig } from "../stores"
import { getGitIssueUrl, gitUrlParse } from "../utils"
import { BackToTop } from "./back-to-top"

type TOCProps = {
  filePath: string
  pageTitle: string
  toc: Heading[]
}

const linkClassName = cn(
  "text-xs font-medium transition",
  "text-gray-600 dark:text-gray-400",
  "hover:text-gray-800 dark:hover:text-gray-200",
  "contrast-more:text-gray-700 contrast-more:dark:text-gray-100",
)

export const TOC: FC<TOCProps> = ({ filePath, pageTitle, toc }) => {
  const activeSlug = useActiveAnchor()
  const tocReference = useRef<HTMLUListElement>(null)
  const themeConfig = useThemeConfig()

  const hasMetaInfo
    = themeConfig.feedback.content
      || themeConfig.editLink
      || themeConfig.toc.extraContent
      || themeConfig.toc.backToTop

  const { activeType } = useConfig().normalizePagesResult
  const anchors = themeConfig.toc.float || activeType === "page" ? toc : []

  const hasHeadings = anchors.length > 0
  const activeIndex = toc.findIndex(({ id }) => id === activeSlug)

  useEffect(() => {
    if (!activeSlug) return
    const anchor = tocReference.current?.querySelector(`a[href="#${activeSlug}"]`)
    if (!anchor) return

    scrollIntoView(anchor, {
      behavior: "smooth",
      block: "center",
      boundary: tocReference.current,
      inline: "center",
      scrollMode: "if-needed",
    })
  }, [activeSlug])

  return (
    <div
      className={cn(
        "grid grid-rows-[min-content_1fr_min-content]", // 1fr: toc headings, min-content: title/footer
        "sticky top-(--nextra-navbar-height) text-sm",
        "max-h-[calc(100vh-var(--nextra-navbar-height))]",
      )}
    >
      {hasHeadings && (
        <>
          <p className="pt-6 px-4 font-semibold tracking-tight">
            {themeConfig.toc.title}
          </p>
          <ul
            className={cn(
              "p-4 nextra-scrollbar overscroll-y-contain overflow-y-auto hyphens-auto",
              "nextra-mask", // for title/footer shadow
            )}
            ref={tocReference}
          >
            {anchors.map(({ depth, id, value }) => (
              <li className="my-2 scroll-my-6 scroll-py-6" key={id}>
                <a
                  className={cn(
                    "focus-visible:nextra-focus",
                    {
                      2: "font-semibold",
                      3: "ms-3",
                      4: "ms-6",
                      5: "ms-9",
                      6: "ms-12",
                    }[depth],
                    "block transition-colors subpixel-antialiased",
                    id === activeSlug
                      ? "text-primary-600 contrast-more:text-primary-600!"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300",
                    "contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words",
                  )}
                  href={`#${id}`}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasMetaInfo && (
        <div
          className={cn(
            "grid gap-2 py-4 mx-4",
            hasHeadings && "border-t nextra-border",
          )}
        >
          {themeConfig.feedback.content && (
            <Anchor
              className={linkClassName}
              href={getGitIssueUrl({
                labels: themeConfig.feedback.labels,
                repository: themeConfig.docsRepositoryBase,
                title: `Feedback for “${pageTitle}”`,
              })}
            >
              {themeConfig.feedback.content}
            </Anchor>
          )}

          {filePath && themeConfig.editLink && (
            <Anchor
              className={linkClassName}
              href={
                filePath.startsWith("http")
                  ? filePath
                  : `${gitUrlParse(themeConfig.docsRepositoryBase).href}/${filePath}`
              }
            >
              {themeConfig.editLink}
            </Anchor>
          )}

          {themeConfig.toc.extraContent}

          {themeConfig.toc.backToTop && (
            <BackToTop className={linkClassName} hidden={activeIndex < 2}>
              {themeConfig.toc.backToTop}
            </BackToTop>
          )}
        </div>
      )}
    </div>
  )
}
