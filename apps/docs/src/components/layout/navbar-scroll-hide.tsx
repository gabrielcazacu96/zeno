"use client"

import { useEffect } from "react"

const SCROLL_THRESHOLD = 0 // 6rem = 96px

function clampOffset(offset: number, delta: number, max: number): number {
  return Math.min(Math.max(offset + delta, 0), max)
}

export function NavbarScrollHide() {
  useEffect(() => {
    let lastScrollY = window.scrollY
    let navOffset = 0
    let docsNavOffset = 0
    let rafId = 0

    function applyTransforms(
      nav: HTMLElement | null,
      docsNav: HTMLElement | null,
      delta: number,
      belowThreshold: boolean
    ) {
      if (belowThreshold) {
        navOffset = 0
        docsNavOffset = 0
      } else {
        if (nav) {
          navOffset = clampOffset(navOffset, delta, nav.offsetHeight + 1)
        }
        if (docsNav && nav) {
          docsNavOffset = clampOffset(
            docsNavOffset,
            delta,
            docsNav.offsetHeight + nav.offsetHeight + 1
          )
        }
      }

      if (nav) {
        const navMax = nav.offsetHeight + 1
        const progress = navMax > 0 ? navOffset / navMax : 0

        nav.style.transform = `translate3d(0, ${-navOffset}px, 0)`
        document.documentElement.style.setProperty(
          "--nd-nav-hide-progress",
          String(progress)
        )
      }
      if (docsNav) {
        docsNav.style.transform = `translate3d(0, ${-docsNavOffset}px, 0)`
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const nav = document.getElementById("nd-nav")
        const docsNav = document.getElementById("nd-docs-nav")
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY

        applyTransforms(nav, docsNav, delta, currentScrollY <= SCROLL_THRESHOLD)

        lastScrollY = currentScrollY
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
