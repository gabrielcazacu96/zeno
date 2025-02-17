"use client"

import type { FC } from "react"

import { MoonIcon, SunIcon } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { useTheme } from "next-themes"
import { Select } from "nextra/components"
import { useMounted } from "nextra/hooks"

import { useThemeConfig } from "../stores"

type ThemeSwitchProps = {
  className?: string
  lite?: boolean
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, lite }) => {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const mounted = useMounted()
  const { darkMode, themeSwitch } = useThemeConfig()
  if (!darkMode) {
    return
  }
  const ThemeIcon = mounted && resolvedTheme === "dark" ? MoonIcon : SunIcon
  const id = mounted ? (theme as keyof typeof themeSwitch) : "light"
  return (
    <Select
      className={cn("flex items-center gap-2", className)}
      onChange={setTheme}
      options={[
        { id: "light", name: themeSwitch.light },
        { id: "dark", name: themeSwitch.dark },
        { id: "system", name: themeSwitch.system },
      ]}
      selectedOption={(
        <>
          <ThemeIcon height="12" />
          {!lite && themeSwitch[id]}
        </>
      )}
      title="Change theme"
      value={id}
    />
  )
}
