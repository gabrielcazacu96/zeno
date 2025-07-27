"use client"

import Link from "next/link"
import type { FC, ReactNode } from "react"

export const NotFoundLink: FC<{
  children: ReactNode
  labels: string
}> = ({ children }) => {
  return (
    <Link className="mt-6" href="#">
      {children}
    </Link>
  )
}
