import type { Config } from "tailwindcss"

export default {
  theme: {
    colors: {
      black: "#000",
      current: "currentColor",
      transparent: "transparent",
      white: "#fff",
    },
    fontSize: {
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "base": "1rem",
      "lg": "1.125rem",
      "sm": ".875rem",
      "xl": "1.25rem",
      "xs": ".75rem",
    },
    letterSpacing: {
      tight: "-0.015em",
    },
  },
} satisfies Config
