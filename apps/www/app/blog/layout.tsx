import { BlogLayout } from "@zeno/layouts/blog/layout"
import React from "react"

import { blog } from "../../lib/source"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogLayout githubUrl="https://github.com/MathieuUrstein/zeno" nav={{ title: "Zeno Documentation" }} tree={blog.pageTree}>
      {children}
    </BlogLayout>
  )
}
