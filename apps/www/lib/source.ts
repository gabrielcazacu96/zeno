import { loader } from "@zeno/layouts/core"

import { content } from "../.source"

export const source = loader({
  baseUrl: "/",
  source: content.toFumadocsSource(),
})
