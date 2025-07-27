import Image from "next/image"

interface BlogHeaderProps {
  author?: string
  banner?: string
  className?: string
  date?: Date | string
  description?: string
  lastModified?: Date | string
  title: string
}

export function BlogHeader({
  author,
  banner,
  date,
  description,
  lastModified,
  title,
}: BlogHeaderProps) {
  return (
    <div className="container pt-12 text-center">
      <div className="mb-6 font-medium uppercase">Technology</div>
      <h1 className="font-bold text-5xl text-white">{title}</h1>
      {description && (
        <p className="mb-4 text-lg text-muted-foreground">{description}</p>
      )}
      {author && (
        <div className="mx-auto mt-6 flex items-center justify-center gap-4">
          <Image
            alt={`${author} profile picture`}
            className="size-12 rounded-full"
            height={50}
            src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={50}
          />
          <div className="flex flex-col text-left">
            <div>{author}</div>
            {(date ?? lastModified) && (
              <div className="text-muted-foreground text-sm">
                {new Date(date ?? lastModified ?? Date.now()).toDateString()}
                &nbsp;·&nbsp;x min read
              </div>
            )}
          </div>
        </div>
      )}
      {banner && (
        <Image
          alt={title}
          className="mt-8 aspect-video rounded-lg"
          height={3456}
          priority
          src={banner}
          width={5184}
        />
      )}
    </div>
  )
}
