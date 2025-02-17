"use client"

import type { FC } from "react"

import { useEffect, useRef } from "react"

import { setActiveSlug } from "../stores"

const callback: IntersectionObserverCallback = (entries) => {
  const entry = entries.find(entry => entry.isIntersecting)

  if (entry) {
    const slug = (entry.target as HTMLAnchorElement).hash.slice(1)
    setActiveSlug(decodeURI(slug))
  }
}

const observer: IntersectionObserver
  = typeof globalThis === "undefined"
    ? null!
    : new IntersectionObserver(callback, {
      rootMargin: `-${
        getComputedStyle(document.body).getPropertyValue(
          "--nextra-navbar-height",
        )
        // can be '' on 404 page
        || "0%"
      } 0% -80%`,
    })

export const HeadingAnchor: FC<{ id: string }> = ({ id }) => {
  const anchorReference = useRef<HTMLAnchorElement>(null!)

  useEffect(() => {
    const element = anchorReference.current
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <a
      aria-label="Permalink for this section"
      className="focus-visible:nextra-focus subheading-anchor"
      href={`#${id}`}
      ref={anchorReference}
    />
  )
}
