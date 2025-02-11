import type { FC } from "react"

import { cn } from "@zeno/ui/lib/utils"
import NextLink from "next/link"
import { ArrowRightIcon } from "nextra/icons"

import { useConfig, useThemeConfig } from "../stores"

const classes = {
  icon: cn("inline shrink-0"),
  link: cn(
    "focus-visible:nextra-focus text-gray-600 dark:text-gray-400",
    "hover:text-gray-800 dark:hover:text-gray-200",
    "contrast-more:text-gray-700 contrast-more:dark:text-gray-100",
    "flex max-w-[50%] items-center gap-1 py-4 text-base font-medium transition-colors [word-break:break-word] md:text-lg",
  ),
}

export const Pagination: FC = () => {
  const { activeIndex, flatDocsDirectories } = useConfig().normalizePagesResult
  const { navigation } = useThemeConfig()

  let previous = navigation.prev && flatDocsDirectories[activeIndex - 1]
  let next = navigation.next && flatDocsDirectories[activeIndex + 1]

  if (previous && !previous.isUnderCurrentDocsTree) previous = false
  if (next && !next.isUnderCurrentDocsTree) next = false

  if (!previous && !next) return

  return (
    <div
      className={cn(
        "mb-8 flex items-center border-t pt-8 nextra-border",
        "print:hidden",
      )}
    >
      {previous && (
        <NextLink
          className={cn(classes.link, "pe-4")}
          href={previous.route}
          title={previous.title}
        >
          <ArrowRightIcon
            className={cn(classes.icon, "ltr:rotate-180")}
            height="20"
          />
          {previous.title}
        </NextLink>
      )}
      {next && (
        <NextLink
          className={cn(classes.link, "ps-4 ms-auto text-end")}
          href={next.route}
          title={next.title}
        >
          {next.title}
          <ArrowRightIcon
            className={cn(classes.icon, "rtl:rotate-180")}
            height="20"
          />
        </NextLink>
      )}
    </div>
  )
}
