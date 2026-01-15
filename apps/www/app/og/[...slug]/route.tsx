import { generateOGImage } from "@zeno/layouts/ui"

import { metadataImage } from "../../../lib/metadata"

export const GET = metadataImage.createAPI((page) =>
  generateOGImage({
    description: page.data.description,
    site: "Zeno",
    title: page.data.title,
  })
)

export function generateStaticParams() {
  return metadataImage.generateParams()
}
