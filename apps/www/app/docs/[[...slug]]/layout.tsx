import { DocsLayout } from "@zeno/layouts/ui"
import type React from "react"

import { documentation } from "../../../lib/source"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      githubUrl="https://github.com/MathieuUrstein/zeno"
      nav={{ title: "Zeno Documentation" }}
      tree={documentation.pageTree}
    >
      {children}
    </DocsLayout>
  )
}
