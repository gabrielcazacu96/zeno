"use client"

import { TanStackDevtools } from "@tanstack/react-devtools"
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools"

export function Devtools() {
  if (process.env.NODE_ENV !== "development") {
    return null
  }
  return <TanStackDevtools plugins={[formDevtoolsPlugin()]} />
}
