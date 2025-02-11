import type { ComponentProps, FC } from "react"

import { cn } from "@zeno/ui/lib/utils"

import { LocaleSwitch } from "../locale-switch"
import { ThemeSwitch } from "../theme-switch"
import { Switchers } from "./switchers"

export const Footer: FC<ComponentProps<"footer">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className="bg-gray-100 pb-[env(safe-area-inset-bottom)] dark:bg-neutral-900 print:bg-transparent">
      <Switchers>
        <div className="mx-auto flex max-w-(--nextra-content-width) gap-2 py-2 px-4">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </Switchers>
      <hr className="nextra-border" />
      {children && (
        <footer
          className={cn(
            "mx-auto flex max-w-(--nextra-content-width) justify-center py-12 text-gray-600 dark:text-gray-400 md:justify-start",
            "pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]",
            className,
          )}
          {...props}
        >
          {children}
        </footer>
      )}
    </div>
  )
}
