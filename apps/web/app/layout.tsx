import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  description: "Web framework",
  title: "ZENO",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
