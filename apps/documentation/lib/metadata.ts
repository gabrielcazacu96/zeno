import type { Metadata } from "next/types"

import { createMetadataImage } from "@zeno/layouts/core"

import { source } from "./source"

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      description: override.description ?? undefined,
      // images: "/banner.png",
      siteName: "Zeno",
      title: override.title ?? undefined,
      // url: "https://fumadocs.vercel.app",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      // creator: "@money_is_shark",
      description: override.description ?? undefined,
      // images: "/banner.png",
      title: override.title ?? undefined,
      ...override.twitter,
    },
  }
}

export const metadataImage = createMetadataImage({
  imageRoute: "og",
  source,
})
