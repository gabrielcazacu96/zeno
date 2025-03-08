import type { ComponentProps } from "react"

import { ArrowRightIcon, LinkIcon } from "../icons"
import { cn } from "../lib/utils"

export function Summary({
  children,
  className,
  id,
  ...props
}: ComponentProps<"summary">) {
  return (
    <summary
      className={cn(
        "focus-visible:nextra-focus",
        "cursor-pointer transition-colors",
        "hover:bg-gray-100 dark:hover:bg-neutral-800",
        "select-none rounded",
        "[&::-webkit-details-marker]:hidden", // Safari
        "flex items-center",
        className,
      )}
      {...props}
    >
      <ArrowRightIcon
        className={cn(
          "motion-reduce:transition-none ms-2 me-1 shrink-0",
          "rtl:rotate-180 [[data-expanded]>summary:first-child>&]:rotate-90 transition",
        )}
        height="1em"
        strokeWidth="3"
      />
      <h3
        className="grow hyphens-auto p-1"
        // ID attached to `<summary>` jumps to incorrect position in viewport.
        // Also, it's better to put `<summary>` content inside heading, so Pagefind will have
        // sub result title of this `<summary>` content
        id={id}
      >
        {children}
      </h3>
      {id && (
        <a
          aria-label="Permalink for this section"
          className={cn(
            "self-stretch",
            "flex items-center",
            "focus-visible:nextra-focus rounded px-2",
            "hover:bg-gray-100 dark:hover:bg-neutral-800",
            "hover:[summary:has(&)]:bg-transparent",
          )}
          href={`#${id}`}
        >
          <LinkIcon
            // avoid triggering by event.target in onClick handler from `<details>`
            className="pointer-events-none"
            height="1em"
          />
        </a>
      )}
    </summary>
  )
}
