"use client"

import type { FC } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeno/ui/components/select"
import { GlobeIcon } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { addBasePath } from "next/dist/client/add-base-path"
import { usePathname } from "next/navigation"

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
      onValueChange={(lang) => {
        const date = new Date(Date.now() + ONE_YEAR)
        document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`
        location.href = addBasePath(pathname.replace(`/${locale}`, `/${lang}`))
      }}
      value={locale!}
    >
      <SelectTrigger className={cn("flex items-center gap-2", className)} title="Change language">
        <SelectValue>
          <>
            <GlobeIcon height="12" />
            {!lite && i18n.find(l => locale === l.locale)?.name}
          </>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {i18n.map(l => (
          <SelectItem key={l.locale} value={l.locale}>
            {l.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
