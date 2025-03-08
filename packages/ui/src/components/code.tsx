import type { ComponentProps } from "react"

import { cn } from "../lib/utils"

export function Code({ children, className, "data-language": _language, ...props }: ComponentProps<"code"> & {
  "data-language"?: string
}) {
  return (
    <code
      className={cn(
        "nextra-code",
        "data-line-numbers" in props && "[counter-reset:line]",
        className,
      )}
      // always show code blocks in ltr
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  )
}
