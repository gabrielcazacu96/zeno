import type { ReactNode } from "react"

import { Subtitle } from "./subtitle"
import { Title } from "./title"

export const Container = ({
  children,
  subtitle,
  title,
}: {
  children: ReactNode
  subtitle?: ReactNode
  title: ReactNode
}) => (
  <>
    <div className="flex flex-col gap-1 text-center">
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </div>
    {children}
  </>
)
