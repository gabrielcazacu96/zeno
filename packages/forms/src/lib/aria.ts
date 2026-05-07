// Builds an aria-describedby string from [condition, id] pairs; only ids with a truthy condition are included.
export function describedBy(
  ...entries: [unknown, string][]
): string | undefined {
  const ids = entries.filter(([show]) => Boolean(show)).map(([, id]) => id)
  return ids.length > 0 ? ids.join(" ") : undefined
}
