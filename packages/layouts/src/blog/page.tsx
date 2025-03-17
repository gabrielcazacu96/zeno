import { Button } from "@zeno/ui/components/button"
import Link from "next/link"

export function BlogPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Button
        asChild
        variant="link"
      >
        <Link href="/blog">
          Back
        </Link>
      </Button>
      <div className="my-20">
        {children}
      </div>
    </>
  )
}
