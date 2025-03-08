"use client"

import type { ReactNode } from "react"

import cn from "clsx"
import { Children, useEffect, useRef, useState } from "react"

export function Collapse({
  children,
  className,
  closeDuration = 300,
  horizontal = false,
  isOpen,
  openDuration = 500,
}: {
  children: ReactNode
  className?: string
  closeDuration?: number
  horizontal?: boolean
  isOpen: boolean
  openDuration?: number
}) {
  const containerReference = useRef<HTMLDivElement>(undefined!)
  const [initialOpen] = useState(isOpen)
  const animationReference = useRef<number | ReturnType<typeof globalThis.setTimeout>>(0)
  const initialRender = useRef(true)
  useEffect(() => {
    const animation = animationReference.current
    const container = containerReference.current
    if (animation) {
      clearTimeout(animation)
      animationReference.current = 0
    }

    if (initialRender.current) {
      return
    }
    const child = container.children[0] as HTMLDivElement

    if (horizontal) {
      // save initial width to avoid word wrapping when container width will be changed
      child.style.width = `${child.clientWidth}px`
      container.style.width = `${child.clientWidth}px`
    }
    else {
      container.style.height = `${child.clientHeight}px`
    }
    if (isOpen) {
      animationReference.current = globalThis.setTimeout(() => {
        // should be style property in kebab-case, not CSS class name
        container.style.removeProperty("height")
      }, openDuration)
    }
    else {
      requestAnimationFrame(() => {
        // Hide content on next tick
        if (horizontal) {
          container.style.width = "0"
        }
        else {
          container.style.height = "0"
        }
      })
    }
  }, [horizontal, isOpen, openDuration])

  useEffect(() => {
    if (
      // for horizontal only for first open state
      isOpen
      || !horizontal
    ) {
      initialRender.current = false
    }
  }, [horizontal, isOpen])

  // Add inner <div> only if children.length != 1
  const newChildren
    = Children.count(children) === 1
      && children
      && typeof children === "object"
      && "type" in children
      ? (
          children
        )
      : (
          <div>{children}</div>
        )

  return (
    <div
      className={cn(
        "x:transform-gpu x:transition-all x:ease-in-out x:motion-reduce:transition-none",
        isOpen ? "x:opacity-100" : "x:opacity-0 x:overflow-hidden",
        className,
      )}
      ref={containerReference}
      style={{
        ...(initialOpen || horizontal ? undefined : { height: 0 }),
        transitionDuration: (isOpen ? openDuration : closeDuration) + "ms",
      }}
    >
      {newChildren}
    </div>
  )
}
