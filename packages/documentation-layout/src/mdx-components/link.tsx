import { cn } from "@zeno/ui/lib/utils"
import { Anchor } from "nextra/components"

// eslint-disable-next-line react/prop-types
export const Link: typeof Anchor = ({ className, ...props }) => {
  return (
    <Anchor
      className={cn(
        "text-primary-600 underline hover:no-underline decoration-from-font [text-underline-position:from-font]",
        className,
      )}
      {...props}
    />
  )
}
