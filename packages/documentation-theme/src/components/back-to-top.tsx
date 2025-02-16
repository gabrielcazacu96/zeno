import type { ComponentProps, FC, ReactNode } from "react"

import { ArrowRightIcon } from "@zeno/ui/icons"
import { cn } from "@zeno/ui/lib/utils"
import { Button } from "nextra/components"

const SCROLL_TO_OPTIONS = { behavior: "smooth", top: 0 } as const

const scrollToTop: ComponentProps<"button">["onClick"] = (event) => {
  const buttonElement = event.currentTarget
  const tocElement = buttonElement.parentElement!.parentElement!

  window.scrollTo(SCROLL_TO_OPTIONS)
  tocElement.scrollTo(SCROLL_TO_OPTIONS)

  // Fixes https://github.com/facebook/react/issues/20770
  // Fixes https://github.com/shuding/nextra/issues/2917
  buttonElement.disabled = true
}

export const BackToTop: FC<{
  children: ReactNode
  className?: string
  hidden: boolean
}> = ({ children, className, hidden }) => {
  return (
    <Button
      // elements with `aria-hidden: true` must not be focusable or contain focusable elements
      aria-hidden={hidden ? "true" : undefined}
      className={({ disabled }) =>
        cn(
          "flex items-center gap-1.5",
          "whitespace-nowrap", // Safari
          disabled ? "opacity-0" : "opacity-100",
          className,
        )}
      disabled={hidden}
      onClick={scrollToTop}
    >
      {children}
      <ArrowRightIcon
        className="-rotate-90 border rounded-full border-current"
        height="1.1em"
      />
    </Button>
  )
}
