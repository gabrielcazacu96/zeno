import type { FC } from "react"

import { cn } from "@zeno/ui/lib/utils"
import NextLink from "next/link"
import { Anchor } from "nextra/components"
import { DiscordIcon, GitHubIcon } from "nextra/icons"
import { element } from "nextra/schemas"
import { z } from "zod"
import { fromZodError } from "zod-validation-error"

import { ClientNavbar } from "./index.client"

const propsSchema = z.strictObject({
  chatIcon: element.default(<DiscordIcon width="24" />),
  chatLink: z.string().optional(),
  children: element.optional(),
  logo: element,
  logoLink: z.union([z.string(), z.boolean()]).default(true),
  projectIcon: element.default(<GitHubIcon height="24" />),
  projectLink: z.string().optional(),
})

type NavbarProps = z.input<typeof propsSchema>

export const Navbar: FC<NavbarProps> = (props) => {
  const { data, error } = propsSchema.safeParse(props)
  if (error) {
    throw fromZodError(error)
  }
  const {
    chatIcon,
    chatLink,
    children,
    logo,
    logoLink,
    projectIcon,
    projectLink,
  } = data
  return (
    <header
      className={cn(
        "nextra-navbar sticky top-0 z-20 w-full bg-transparent print:hidden",
        "max-md:[.nextra-banner:not([class$=hidden])~&]:top-(--nextra-banner-height)",
      )}
    >
      <div
        className={cn(
          "nextra-navbar-blur",
          "absolute -z-1 size-full",
          "nextra-border border-b",
          "backdrop-blur-md bg-nextra-bg/70",
        )}
      />
      <nav
        className="mx-auto flex max-w-(--nextra-content-width) items-center justify-end gap-4 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
        style={{ height: "var(--nextra-navbar-height)" }}
      >
        {logoLink
          ? (
              <NextLink
                className="transition-opacity focus-visible:nextra-focus flex items-center hover:opacity-75 me-auto"
                href={typeof logoLink === "string" ? logoLink : "/"}
              >
                {logo}
              </NextLink>
            )
          : (
              <div className="flex items-center me-auto">{logo}</div>
            )}
        <ClientNavbar>
          {projectLink && <Anchor href={projectLink}>{projectIcon}</Anchor>}
          {chatLink && <Anchor href={chatLink}>{chatIcon}</Anchor>}
          {children}
        </ClientNavbar>
      </nav>
    </header>
  )
}
