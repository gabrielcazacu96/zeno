"use client"

import { useEffect } from "react"

const SCROLL_THRESHOLD = 96 // 6rem = 96px

export function NavbarScrollHide() {
  useEffect(() => {
    let lastScrollY = window.scrollY

    function onScroll() {
      const nav = document.getElementById("nd-nav")
      const docsNav = document.getElementById("nd-docs-nav")
      const currentScrollY = window.scrollY

      const hidden =
        currentScrollY > SCROLL_THRESHOLD && currentScrollY > lastScrollY

      if (nav) {
        nav.dataset.scrollHidden = String(hidden)
      }
      if (docsNav) {
        docsNav.dataset.scrollHidden = String(hidden)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
