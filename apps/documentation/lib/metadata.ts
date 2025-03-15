import { createMetadataImage } from "@zeno/layouts/core"

import { source } from "./source"

export const metadataImage = createMetadataImage({
  imageRoute: "og",
  source,
})
