"use client"

import type { AnyFormApi, ValidationLogicFn } from "@tanstack/react-form"

type Validators = Parameters<ValidationLogicFn>[0]["validators"]
type RawRunValidation = Parameters<ValidationLogicFn>[0]["runValidation"]

// TanStack Form types `runValidation` and `ValidationLogicFn` as returning
// `void`, but at runtime `getSyncValidatorArray` does
// `return options.validationLogic(...)` and forwards whatever
// `runValidation` returns as the validators array. So we must actually
// return the value, even though TS says we shouldn't.
type RunValidation = (
  props: Parameters<RawRunValidation>[0]
) => ReturnType<RawRunValidation> & unknown

function pickLiveValidator(validators: Validators, isAsync: boolean) {
  const fn = isAsync
    ? (validators?.onChangeAsync ?? validators?.onBlurAsync)
    : (validators?.onChange ?? validators?.onBlur)
  return fn ? { cause: "change" as const, fn } : undefined
}

function shouldRunFormChange(form: AnyFormApi): boolean {
  if (form.state.submissionAttempts > 0) {
    return true
  }
  // Form-level call: re-validate the whole schema if at least one field has
  // been blurred. Keeps cross-field checks (password confirmation, dependent
  // fields) live once the user has committed to editing somewhere.
  return Object.values(form.state.fieldMeta).some(
    (meta) => meta?.isBlurred === true
  )
}

// Standard cause-matching logic for field-level validators. Per-field
// `validators={{ onChange, onBlur, … }}` are user-authored opt-ins, so we
// honour the cause they're declared on directly — no extra gating. Mirrors
// TanStack Form's `defaultValidationLogic` for the field path.
function fieldLevelLogic(props: Parameters<ValidationLogicFn>[0]) {
  const { event, validators, form } = props
  const run = props.runValidation as RunValidation

  if (!validators) {
    return run({ form, validators: [] })
  }

  const isAsync = event.async

  if (event.type === "mount") {
    return run({
      form,
      validators: isAsync
        ? []
        : [{ cause: "mount" as const, fn: validators.onMount }],
    })
  }
  if (event.type === "change") {
    return run({
      form,
      validators: [
        {
          cause: "change" as const,
          fn: isAsync ? validators.onChangeAsync : validators.onChange,
        },
      ],
    })
  }
  if (event.type === "blur") {
    return run({
      form,
      validators: [
        {
          cause: "blur" as const,
          fn: isAsync ? validators.onBlurAsync : validators.onBlur,
        },
      ],
    })
  }
  if (event.type === "submit") {
    return run({
      form,
      validators: [
        {
          cause: "change" as const,
          fn: isAsync ? validators.onChangeAsync : validators.onChange,
        },
        {
          cause: "blur" as const,
          fn: isAsync ? validators.onBlurAsync : validators.onBlur,
        },
        {
          cause: "submit" as const,
          fn: isAsync ? validators.onSubmitAsync : validators.onSubmit,
        },
      ],
    })
  }
  return run({ form, validators: [] })
}

function buildSubmitValidators(
  validators: NonNullable<Validators>,
  isAsync: boolean,
  liveValidator: ReturnType<typeof pickLiveValidator>
) {
  return [
    ...(liveValidator ? [liveValidator] : []),
    {
      cause: "submit" as const,
      fn: isAsync ? validators.onSubmitAsync : validators.onSubmit,
    },
    ...(isAsync ? [] : [{ cause: "server" as const, fn: () => undefined }]),
  ]
}

// Custom validation logic implementing the "blur first, change after" pattern
// used by `useZenoForm` by default.
//
// **Why this exists.** TanStack Form's default logic stores errors per cause:
// the `onBlur` validator writes to `errorMap.onBlur`, the `onChange` validator
// writes to `errorMap.onChange`. When both are set to the same schema, blurring
// with an invalid value populates the blur slot, and a subsequent successful
// change only clears the change slot — the stale blur error sticks, so the UI
// keeps showing it even after the value is fixed.
//
// **What this does for the form-level schema.** A single user-provided schema
// (read from `onChange`, or `onBlur` as a fallback) is run on:
//
//   - every **blur** event (so empty required fields error on first commit),
//   - **change** events only after at least one field has been blurred (so
//     pristine typing stays quiet, but correcting an existing error is live),
//   - **submit** events.
//
// **Per-field validators bypass this gate.** When the user opts into a cause
// directly via `validators={{ onChange: … }}` on a field, that's an explicit
// opt-in — we run the matching slot whenever the cause fires, no gating. This
// preserves "I asked for onChange, I get onChange" intuition.
//
// All form-level errors are written to the `change` slot, so there is exactly
// one place errors live — no per-cause stickiness.
function blurThenChangeLogicImpl(props: Parameters<ValidationLogicFn>[0]) {
  // Field-level call (validators are the field's own opt-ins) — pass through
  // standard cause-matching with no gating.
  if (props.event.fieldName !== undefined) {
    return fieldLevelLogic(props)
  }

  const { event, validators, form } = props
  const run = props.runValidation as RunValidation

  if (!validators) {
    return run({ form, validators: [] })
  }

  const isAsync = event.async
  const liveValidator = pickLiveValidator(validators, isAsync)

  if (event.type === "mount") {
    return run({
      form,
      validators: isAsync
        ? []
        : [{ cause: "mount" as const, fn: validators.onMount }],
    })
  }
  if (event.type === "blur") {
    return run({
      form,
      validators: liveValidator ? [liveValidator] : [],
    })
  }
  if (event.type === "change") {
    const shouldRun = liveValidator && shouldRunFormChange(form)
    return run({
      form,
      validators: shouldRun ? [liveValidator] : [],
    })
  }
  if (event.type === "submit") {
    return run({
      form,
      validators: buildSubmitValidators(validators, isAsync, liveValidator),
    })
  }

  return run({ form, validators: [] })
}

const blurThenChangeLogic = blurThenChangeLogicImpl as ValidationLogicFn

export { blurThenChangeLogic }
