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
    }),
  },
})

export default defineConfig({
  lastModifiedTime: "git",
})
