import {
  BookOpen,
  Layers,
  Layers2Icon,
  type LucideIcon,
  Puzzle,
  RocketIcon,
} from "@zeno/ui/icons"
import Link from "fumadocs-core/link"
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

interface SubMenuLinkProps {
  description: string
  href: string
  icon: LucideIcon
  title: string
}

function SubMenuLink({
  description,
  href,
  icon: Icon,
  title,
}: SubMenuLinkProps) {
  return (
    <NavbarMenuLink href={href}>
      <Icon className="mb-2 rounded-md bg-fd-primary p-1 text-fd-primary-foreground" />
      <p className="font-medium">{title}</p>
      <p className="text-fd-muted-foreground text-sm">{description}</p>
    </NavbarMenuLink>
  )
}

const docsMenuItems: SubMenuLinkProps[] = [
  {
    description: "Get started with Zeno in minutes.",
    href: "/docs/foundation",
    icon: Layers2Icon,
    title: "1. Foundation",
  },
  {
    description: "Data, users, UI, and testing.",
    href: "/docs/core-framework",
    icon: Layers,
    title: "2. Core Framework",
  },
  {
    description: "Tables, forms, uploaders, and content.",
    href: "/docs/feature-modules",
    icon: Puzzle,
    title: "3. Feature Modules",
  },
  {
    description: "Deploy and monitor your application.",
    href: "/docs/production",
    icon: RocketIcon,
    title: "4. Going to Production",
  },
  {
    description: "CLI tools and command reference.",
    href: "/docs/reference",
    icon: BookOpen,
    title: "5. Reference",
  },
]

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Zeno",
    },
  }
}

export function homeOptions(): BaseLayoutProps {
  return {
    ...baseOptions(),
    links: [
      {
        on: "nav",
        text: "Discover",
        url: "/",
      },
      {
        items: docsMenuItems.map(({ description: _, icon: Icon, ...item }) => ({
          icon: <Icon />,
          text: item.title,
          url: item.href,
        })),
        on: "menu",
        text: "Documentation",
        type: "menu",
      },
      {
        children: (
          <NavbarMenu>
            <NavbarMenuTrigger>
              <Link href="/docs">Documentation</Link>
            </NavbarMenuTrigger>
            <NavbarMenuContent>
              {docsMenuItems.map((item) => (
                <SubMenuLink key={item.href} {...item} />
              ))}
            </NavbarMenuContent>
          </NavbarMenu>
        ),
        on: "nav",
        type: "custom",
      },
      {
        text: "Showcase",
        url: "/showcase",
      },
      {
        text: "About",
        url: "/about",
      },
      {
        text: "Blog",
        url: "/blog",
      },
      {
        text: "Changelog",
        url: "/changelog",
      },
    ],
  }
}
