// Inspect a Standard Schema to discover which field paths it treats as required.
//
// Standard Schema (Zod, Valibot, ArkType, …) doesn't expose introspection — only
// a `validate(value)` function. We probe by validating an empty object: every
// field that is *required* (i.e. not optional, nullable, or defaulted) emits an
// issue with a `path` we can record. Fields with defaults or `.optional()` stay
// silent because the schema considers them satisfied.
//
// Limitations:
//   - Async schemas are skipped (returns an empty set). Required-ness is a
//     visual hint; the validator itself still runs at submit time.
//   - Cross-field refinements that fail on `{}` may flag fields that aren't
//     intrinsically required. In practice this is the same heuristic users
//     would apply by eye.

type StandardIssue = {
  readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>
}

type StandardSchemaLike = {
  readonly "~standard": {
    readonly validate: (
      value: unknown
    ) =>
      | { readonly value: unknown }
      | { readonly issues: readonly StandardIssue[] }
      | Promise<unknown>
  }
}

function pathSegment(
  part: PropertyKey | { readonly key: PropertyKey }
): string {
  if (typeof part === "object" && part !== null && "key" in part) {
    return String(part.key)
  }
  return String(part)
}

function getRequiredPaths(schema: StandardSchemaLike): Set<string> {
  const required = new Set<string>()
  let result: ReturnType<StandardSchemaLike["~standard"]["validate"]>
  try {
    result = schema["~standard"].validate({})
  } catch {
    return required
  }
  if (result instanceof Promise) {
    return required
  }
  if (!("issues" in result && result.issues)) {
    return required
  }
  for (const issue of result.issues) {
    const segments = issue.path?.map(pathSegment) ?? []
    if (segments.length > 0) {
      required.add(segments.join("."))
    }
  }
  return required
}

export type { StandardSchemaLike }
export { getRequiredPaths }
