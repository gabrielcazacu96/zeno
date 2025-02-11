"use client"

import type { FC, ReactNode } from "react"

import { usePathname } from "next/navigation"

import { useThemeConfig } from "../stores"

export const LastUpdated: FC<{
  children?: ReactNode
  date?: Date
  locale?: string
}> = ({ children = "Last updated on", date, locale = "en" }) => {
  const { i18n } = useThemeConfig()
  const pathname = usePathname()

  if (!date) {
    return
  }

  const dateLocale = i18n.length > 0 ? pathname.split("/", 2)[1] : locale
  return (
    <>
      {children}
      {" "}
      <time
        dateTime={date.toISOString()}
        // Can provoke React 418 error https://react.dev/errors/418
        suppressHydrationWarning
      >
        {date.toLocaleDateString(dateLocale, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </>
  )
}
