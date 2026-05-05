import { cn } from "@zeno/ui/lib/utils"
import type { ComponentProps } from "react"

export function Preview({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "not-prose flex min-h-40 w-full items-center justify-center rounded-xl border bg-card p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
