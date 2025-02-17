"use client"

import type { PageMapItem } from "nextra"
import type { FC, ReactElement, ReactNode } from "react"

import { useFSRoute } from "nextra/hooks"
import { normalizePages } from "nextra/normalize-pages"
import { createContext, useContext } from "react"

const ConfigContext = createContext<null | ReturnType<typeof normalizePages>>(
  null,
)

export function useConfig() {
  const normalizePagesResult = useContext(ConfigContext)
  if (!normalizePagesResult) {
    throw new Error("Missing ConfigContext.Provider")
  }
  const { activeThemeContext, activeType } = normalizePagesResult
  return {
    hideSidebar: !activeThemeContext.sidebar || activeType === "page",
    normalizePagesResult,
  }
}

export const ConfigProvider: FC<{
  children: ReactNode
  footer: ReactElement
  navbar: ReactElement
  pageMap: PageMapItem[]
}> = ({ children, footer, navbar, pageMap }) => {
  const pathname = useFSRoute()

  const normalizedPages = normalizePages({
    list: pageMap,
    route: pathname,
  })
  const { activeThemeContext } = normalizedPages

  return (
    <ConfigContext.Provider value={normalizedPages}>
      {activeThemeContext.navbar && navbar}
      {children}
      {activeThemeContext.footer && footer}
    </ConfigContext.Provider>
  )
}
