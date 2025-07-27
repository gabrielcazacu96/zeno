import { Button } from "@zeno/ui/components/button"
import type { TableOfContents } from "fumadocs-core/server"
import { AnchorProvider } from "fumadocs-core/toc"
import Link from "next/link"
import type { ReactNode } from "react"

export interface BlogPageProps {
  children: ReactNode
  toc?: TableOfContents
}

export function BlogPage({ children, toc = [] }: BlogPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="my-20">
        <Button asChild variant="link">
          <Link href="/blog">Back</Link>
        </Button>
        {children}
      </div>
    </AnchorProvider>
  )
}
