import { Footer, Layout, Navbar } from "@zeno/documentation-theme"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"

import "./globals.css"
import React from "react"

export const metadata = {
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navbar = (
  <Navbar
    logo={<b>Zeno</b>}
  />
)
const footer = (
  <Footer>
    {new Date().getFullYear()}
    {" "}
    © Zeno.
  </Footer>
)

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
      <Head />
      <body>
        <Layout
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          navbar={navbar}
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
