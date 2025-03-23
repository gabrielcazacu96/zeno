import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config"
import { z } from "zod"

export const contentSource = defineDocs({
  dir: "content",
})

export const documentationSource = defineDocs({
  dir: "content/docs",
})

export const blogSource = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      author: z.string(),
      banner: z.string().url(),
      date: z.optional(z.date()),
    }),
  },
})

export default defineConfig({
  lastModifiedTime: "git",
})

// http://localhost:5001/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1532601224476-15c79f2f7a51&w=640&q=75