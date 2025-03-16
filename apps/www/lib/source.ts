import { loader } from "@zeno/layouts/core"

import { blogSource, contentSource, documentationSource } from "../.source"

export const source = loader({
  baseUrl: "/",
  source: contentSource.toFumadocsSource(),
})

export const documentation = loader({
  baseUrl: "/docs",
  source: documentationSource.toFumadocsSource(),
})

export const blog = loader({
  baseUrl: "/blog",
  source: blogSource.toFumadocsSource(),
})
