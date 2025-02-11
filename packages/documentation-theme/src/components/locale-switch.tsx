"use client"

import type { FC } from "react"

import { cn } from "@zeno/ui/lib/utils"
import { addBasePath } from "next/dist/client/add-base-path"
import { usePathname } from "next/navigation"
import { Select } from "nextra/components"
import { GlobeIcon } from "nextra/icons"

import { useThemeConfig } from "../stores"

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

interface LocaleSwitchProps {
  className?: string
  lite?: boolean
}

export const LocaleSwitch: FC<LocaleSwitchProps> = ({ className, lite }) => {
  const { i18n } = useThemeConfig()
  const pathname = usePathname()
  if (i18n.length === 0) return

  const [, locale] = pathname.split("/", 2)
  return (
    <Select
      className={cn("flex items-center gap-2", className)}
      onChange={(lang) => {
        const date = new Date(Date.now() + ONE_YEAR)
        document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`
        location.href = addBasePath(pathname.replace(`/${locale}`, `/${lang}`))
      }}
      options={i18n.map(l => ({
        id: l.locale,
        name: l.name,
      }))}
      selectedOption={(
        <>
          <GlobeIcon height="12" />
          {!lite && i18n.find(l => locale === l.locale)?.name}
        </>
      )}
      title="Change language"
      value={locale!}
    />
  )
}
