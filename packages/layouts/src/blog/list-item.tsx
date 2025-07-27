import { cn } from "@zeno/ui/lib/utilities"
import Image from "next/image"
import Link from "next/link"

interface BlogListItemProps {
  author: string
  banner?: string
  date?: Date | string
  description?: string
  index?: number
  lastModified?: Date | string
  title: string
  url: string
}

export function BlogListItem({
  author,
  banner,
  date,
  description,
  index,
  lastModified,
  title,
  url,
}: BlogListItemProps) {
  return (
    <Link
      className={cn(
        "flex flex-col rounded bg-fd-card p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
        index === 0 && "col-span-12",
        (index === 1 || index === 2) && "col-span-6",
        (index === undefined || index > 2) && "col-span-4"
      )}
      href={url}
      key={url}
    >
      <p className="font-medium">{title}</p>
      {description && (
        <p className="text-fd-muted-foreground text-sm">{description}</p>
      )}
      {banner && (
        <Image
          alt={title}
          className="mt-2 aspect-video rounded-lg"
          height={3456}
          priority={index !== undefined && index < 3}
          src={banner}
          width={5184}
        />
      )}
      {author && (
        <div className="mt-2 flex items-center gap-2">
          <Image
            alt={`${author} profile picture`}
            className="size-8 rounded-full"
            height={50}
            src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={50}
          />
          <div className="flex flex-col text-left text-muted-foreground text-sm">
            <div className="leading-tight">
              by&nbsp;
              {author}
            </div>
            {(date ?? lastModified) && (
              <div className="leading-tight">
                {new Date(date ?? lastModified ?? Date.now()).toDateString()}
                &nbsp;·&nbsp;x min read
              </div>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}
