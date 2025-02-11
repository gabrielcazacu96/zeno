"use client"

import type { MDXWrapper } from "nextra"

import { cn } from "@zeno/ui/lib/utils"
import { cloneElement, useEffect } from "react"

import { Breadcrumb, Pagination, TOC } from "../components"
import { setToc, useConfig, useThemeConfig } from "../stores"

export const ClientWrapper: MDXWrapper = ({
  bottomContent,
  children,
  metadata,
  toc,
}) => {
  const {
    activePath,
    activeThemeContext: themeContext,
    activeType,
  } = useConfig().normalizePagesResult
  const themeConfig = useThemeConfig()

  const date = themeContext.timestamp && metadata.timestamp

  // We can't update store in server component so doing it in client component
  useEffect(() => {
    setToc(toc)
  }, [toc])

  return (
    <>
      {(themeContext.layout === "default" || themeContext.toc) && (
        <nav
          aria-label="table of contents"
          className="nextra-toc order-last max-xl:hidden w-64 shrink-0 print:hidden"
        >
          {themeContext.toc && (
            <TOC
              filePath={metadata.filePath}
              pageTitle={metadata.title}
              toc={toc}
            />
          )}
        </nav>
      )}
      <article
        className={cn(
          "w-full min-w-0 break-words min-h-[calc(100vh-var(--nextra-navbar-height))]",
          "text-slate-700 dark:text-slate-200 pb-8 px-4 pt-4 md:px-12",
          themeContext.typesetting === "article"
          && "nextra-body-typesetting-article",
        )}
      >
        {themeContext.breadcrumb && activeType !== "page" && (
          <Breadcrumb activePath={activePath} />
        )}
        {children}
        {date
          ? (
              <div className="mt-12 mb-8 text-xs text-gray-500 text-end dark:text-gray-400">
                {cloneElement(themeConfig.lastUpdated, { date: new Date(date) })}
              </div>
            )
          : (
              <div className="mt-16" />
            )}
        {themeContext.pagination && activeType !== "page" && <Pagination />}
        {bottomContent}
      </article>
    </>
  )
}
