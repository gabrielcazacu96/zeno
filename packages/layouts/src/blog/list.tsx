export function BlogList({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto grid max-w-4xl grid-cols-12 justify-center px-6 py-6">
      {children}
    </main>
  )
}
