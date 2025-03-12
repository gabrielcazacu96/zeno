"use client"

import type { FC, ReactNode } from "react"

import Link from "next/link"

export const NotFoundLink: FC<{
  children: ReactNode
  labels: string
}> = ({ children }) => {
  return (
    <Link
      className="mt-6"
      href="#"
    >
      {children}
    </Link>
  )
}
