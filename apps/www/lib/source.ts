import { loader } from "@zeno/layouts/core"

import { content } from "../.source"

export const source = loader({
  baseUrl: "/",
  source: content.toFumadocsSource(),
})

export const documentation = loader({
  baseUrl: "/docs",
  source: content.toFumadocsSource(),
})

export const blog = loader({
  baseUrl: "/blog",
  source: content.toFumadocsSource(),
})
