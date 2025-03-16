import { RootProvider } from "@zeno/layouts/ui"

import "./globals.css"

import React from "react"

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
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
