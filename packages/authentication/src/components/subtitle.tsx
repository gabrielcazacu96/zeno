import type { ReactNode } from "react"

export const Subtitle = ({ children }: { children: ReactNode }) => (
  <span className="text-muted-foreground">{children}</span>
)
