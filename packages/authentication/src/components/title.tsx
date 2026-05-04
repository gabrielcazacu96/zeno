import type { ReactNode } from "react"

export const Title = ({ children }: { children: ReactNode }) => (
  <h1 className="font-semibold text-2xl tracking-tight lg:text-3xl">
    {children}
  </h1>
)
