"use client"

import type { FC, ReactNode } from "react"

import { useConfig, useThemeConfig } from "../../stores"

export const Switchers: FC<{ children: ReactNode }> = ({ children }) => {
  const { hideSidebar } = useConfig()
  const { darkMode, i18n } = useThemeConfig()

  if (hideSidebar && (darkMode || i18n.length > 0)) {
    return children
  }

  return
}
