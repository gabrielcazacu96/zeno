import type { AnyFormApi } from "@tanstack/react-form"

import type { ValidationError } from "./validation-error"

// Write per-field messages from a `ValidationError` onto the form. We target
// `errorMap.onChange` so the form-level schema overwrites the message as
// soon as the user edits the field; the error clears automatically the
// moment the value passes validation. Form-level error message is written
// to the form's overall error map under the `onSubmit` cause.
function applyValidationError(
  formApi: AnyFormApi,
  error: ValidationError
): void {
  for (const [name, message] of Object.entries(error.fields)) {
    const messages = Array.isArray(message) ? message : [message]
    const errors = messages.map((m) => ({ message: m }))
    formApi.setFieldMeta(name, (prev) => ({
      ...prev,
      errorMap: { ...prev.errorMap, onChange: errors[0] },
      errors,
      isValid: false,
    }))
  }
  if (error.formError) {
    formApi.setErrorMap({
      onSubmit: { fields: {}, form: error.formError },
    })
  }
}

export { applyValidationError }
