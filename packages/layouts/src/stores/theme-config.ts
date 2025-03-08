"use client"

import type { ComponentProps } from "react"

import { createContext, createElement, useContext } from "react"

import type { ThemeConfigProps } from "../documentation"

const ThemeConfigContext = createContext<
  Omit<
    ThemeConfigProps,
    | "banner"
    //
    | "footer"
    | "navbar"
    | "nextThemes"
    | "pageMap"
  >
>(null!)

export const useThemeConfig = () => useContext(ThemeConfigContext)

export const ThemeConfigProvider = (
  props: ComponentProps<typeof ThemeConfigContext.Provider>,
) => createElement(ThemeConfigContext.Provider, props)
