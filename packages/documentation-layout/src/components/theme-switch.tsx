"use client"

import type { FC } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger } from "@zeno/ui/components/select"
import { MoonIcon, SunIcon } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { useTheme } from "next-themes"
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
      onValueChange={setTheme}
      value={id}
    >
      <SelectTrigger className={cn("flex items-center gap-2", className)} title="Change theme">
        <>
          <ThemeIcon height="12" />
          {!lite && themeSwitch[id]}
        </>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">{themeSwitch.light}</SelectItem>
        <SelectItem value="dark">{themeSwitch.dark}</SelectItem>
        <SelectItem value="system">{themeSwitch.system}</SelectItem>
      </SelectContent>
    </Select>
  )
}
