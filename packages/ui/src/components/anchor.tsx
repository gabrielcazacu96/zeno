import type { ComponentPropsWithoutRef } from "react"

import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { cn } from "../lib/utils"

export const EXTERNAL_URL_RE = /^https?:\/\//

export function Anchor({
  href = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  props = {
    ...props,
    className: cn("focus-visible:nextra-focus", props.className),
  }
  if (EXTERNAL_URL_RE.test(href)) {
    const { children } = props
    return (
      <a href={href} rel="noreferrer" target="_blank" {...props}>
        {children}
        {typeof children === "string" && (
          <>
            &thinsp;
            <ArrowUpRightIcon
              className="inline align-baseline shrink-0"
              // based on font-size
              height="1em"
            />
          </>
        )}
      </a>
    )
  }
  const LinkComponent = href.startsWith("#") ? "a" : Link
  return <LinkComponent href={href} {...props as any} />
}
