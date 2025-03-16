import { RootProvider } from "@zeno/layouts/ui"
import { DocsLayout } from "@zeno/layouts/ui"

import "./globals.css"

import React from "react"

import { source } from "../lib/source"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // Required to be set
      dir="ltr"
      // Not required, but good for SEO
      lang="en"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <body>
        <RootProvider>
          <DocsLayout githubUrl="https://github.com/MathieuUrstein/zeno" nav={{ title: "Zeno Documentation" }} tree={source.pageTree}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  )
}
