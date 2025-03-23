import { BlogList } from "@zeno/layouts/blog/list"
import { BlogListItem } from "@zeno/layouts/blog/list-item"
import React from "react"

import { blog } from "../../lib/source"

export default function Page(): React.ReactElement {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.lastModified ?? b.file.name).getTime()
        - new Date(a.data.lastModified ?? a.file.name).getTime(),
  )
  return (
    <BlogList>
      {posts.map((post, index) => (
        <BlogListItem key={post.url} url={post.url} {...post.data} index={index} />
      ))}
    </BlogList>
  )
}
