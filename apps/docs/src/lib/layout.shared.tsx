import {
  Blocks,
  Download,
  GitBranch,
  Languages,
  LayoutGrid,
  ListChecks,
  Lock,
  type LucideIcon,
  Table,
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
    href: "/docs/getting-started/installation",
    icon: Download,
    title: "Getting Started",
  },
  {
    description: "Data schemas and validation.",
    href: "/docs/data-management/schemas",
    icon: Blocks,
    title: "Data Management",
  },
  {
    description: "Reusable UI components built with Shadcn UI.",
    href: "/docs/building-ui/components",
    icon: LayoutGrid,
    title: "Building UI / UX",
  },
  {
    description: "Setting up authentication and providers.",
    href: "/docs/user-management/authentication",
    icon: Lock,
    title: "User Management",
  },
  {
    description: "Data tables and grids.",
    href: "/docs/components/tables",
    icon: Table,
    title: "Components",
  },
  {
    description: "I18N and localization support.",
    href: "/docs/contents/i18n",
    icon: Languages,
    title: "Contents",
  },
  {
    description: "Unit testing with Vitest.",
    href: "/docs/testing/unit-testing",
    icon: ListChecks,
    title: "Testing",
  },
  {
    description: "Continuous integration and deployment pipelines.",
    href: "/docs/deployment/ci-cd",
    icon: GitBranch,
    title: "Deployment",
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
