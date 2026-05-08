// Throwable error that carries per-field validation messages. `useForm`
// catches this inside `onSubmit` and writes each entry onto the matching
// field's meta, so callers can `throw new ValidationError({ email: '…' })`
// from anywhere (server response handler, custom async check, etc.) and have
// the messages land in the right place.
//
// Errors are written to `errorMap.onChange`, which means the form-level
// schema overwrites them as soon as the user edits the field — the message
// clears automatically once the value changes. Pass an array of messages to
// surface multiple issues for the same field.

type FieldMessage = string | readonly string[]

class ValidationError extends Error {
  readonly fields: Readonly<Record<string, FieldMessage>>
  readonly formError?: string

  constructor(
    fields: Readonly<Record<string, FieldMessage>>,
    options: { formError?: string; message?: string } = {}
  ) {
    super(options.message ?? "Validation failed")
    this.name = "ValidationError"
    this.fields = fields
    this.formError = options.formError
  }
}

export type { FieldMessage }
export { ValidationError }
