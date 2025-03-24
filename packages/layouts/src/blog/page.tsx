import type { TableOfContents } from "fumadocs-core/server"
import type { ReactNode } from "react"

import { Button } from "@zeno/ui/components/button"
import { AnchorProvider } from "fumadocs-core/toc"
import Link from "next/link"

export interface BlogPageProps {
  children: ReactNode
  toc?: TableOfContents
}

export function BlogPage({
  children,
  toc = [],
}: BlogPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="my-20">
        <Button
          asChild
          variant="link"
        >
          <Link href="/blog">
            Back
          </Link>
        </Button>
        {children}
      </div>
    </AnchorProvider>
  )
}
