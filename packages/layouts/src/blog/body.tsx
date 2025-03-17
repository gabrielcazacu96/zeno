import { cn } from "@zeno/ui/lib/utils"

export function BlogBody({ children, className, ...props }: React.ComponentProps<"article">) {
  return (
    <article {...props} className={cn("container prose mx-auto max-w-3xl py-6", className)}>
      {children}
    </article>
  )
}
