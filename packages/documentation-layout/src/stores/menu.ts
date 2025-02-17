"use no memo"

import type { Dispatch, SetStateAction } from "react"

import { create } from "zustand"

const useMenuStore = create<{
  hasMenu: boolean
}>(() => ({
  hasMenu: false,
}))

export const useMenu = () => useMenuStore(state => state.hasMenu)

export const setMenu: Dispatch<SetStateAction<boolean>> = (function_) => {
  useMenuStore.setState((state) => {
    const hasMenu = typeof function_ === "function" ? function_(state.hasMenu) : function_
    // Lock background scroll when menu is opened
    document.body.classList.toggle("max-md:overflow-hidden", hasMenu)
    return { hasMenu }
  })
}
