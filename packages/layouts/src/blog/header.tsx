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

export function BlogHeader({ author, banner, date, description, lastModified, title }: BlogHeaderProps) {
  return (
    <div
      className="container pt-12 text-center"
    >
      <div className="font-medium uppercase mb-6">Technology</div>
      <h1 className="text-5xl font-bold text-white">
        {title}
      </h1>
      {description && <p className="mb-4 text-muted-foreground text-lg">{description}</p>}
      {author && (
        <div className="mt-6 mx-auto flex gap-4 items-center justify-center">
          <Image alt={`${author} profile picture`} className="rounded-full size-12" height={50} src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={50} />
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
          className="rounded-lg mt-8 aspect-video"
          height={3456}
          priority
          src={banner}
          width={5184}
        />
      )}
    </div>
  )
}
