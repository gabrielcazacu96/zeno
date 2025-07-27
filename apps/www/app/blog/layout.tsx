import { BlogLayout } from "@zeno/layouts/blog/layout"
import type React from "react"

import { blog } from "../../lib/source"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogLayout
      githubUrl="https://github.com/MathieuUrstein/zeno"
      nav={{ title: "Zeno Documentation" }}
      tree={blog.pageTree}
    >
      {children}
    </BlogLayout>
  )
}
