import { cn } from "@zeno/ui/lib/utils"
import { Link } from "fumadocs-core/framework"
import { type Folder, getPageTreeRoots } from "fumadocs-core/page-tree"
import { Tabs, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs"
import type { ComponentProps } from "react"
import { source } from "@/lib/source"

export function DocsLayoutHeaderTabs({
  className,
  ...props
}: ComponentProps<"div">) {
  const items = getPageTreeRoots(source.getPageTree())
  const folderItems = items.filter(
    (item) => !!item && "type" in item && item.type === "folder"
  ) as Folder[]

  //   console.log(folderItems)

  return (
    <div
      className={cn(
        "top-[61px] z-30 hidden *:mx-auto *:max-w-(--fd-layout-width) md:block",
        className
      )}
      id="nd-docs-nav"
      {...props}
    >
      <Tabs
        className="my-0 rounded-none border-t-0 border-r-0 border-b border-l-none bg-background px-0 pt-1"
        defaultIndex={0}
      >
        <TabsList>
          {folderItems.map((item, index) => (
            <Link
              href={
                item.children.filter((child) => child.type === "page")[0]
                  ?.url ?? ""
              }
              key={item.$id ?? index.toString()}
            >
              <TabsTrigger value={item.$id ?? index.toString()}>
                {item.icon}
                {item.name}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
