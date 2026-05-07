"use client"

export const wrapperClass = "w-full max-w-sm"

export function SubmittedValues({ value }: { value: unknown }) {
  if (!value) {
    return null
  }
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
      {JSON.stringify(value, null, 2)}
    </pre>
  )
}
