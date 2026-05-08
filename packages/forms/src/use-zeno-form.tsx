"use client"

import type {
  AnyFormApi,
  FormAsyncValidateOrFn,
  FormOptions,
  FormValidateOrFn,
} from "@tanstack/react-form"
import { useMemo } from "react"

import { ResetButton } from "./fields/reset-button"
import { SubmitButton } from "./fields/submit-button"
import { useAppForm } from "./form"
import { applyValidationError } from "./lib/apply-validation-error"
import { deepMergeDefaults, extractZodDefaults } from "./lib/schema-defaults"
import { getRequiredPaths } from "./lib/schema-required"
import { useUnsavedChangesWarning } from "./lib/use-unsaved-changes-warning"
import { ValidationError } from "./lib/validation-error"
import { blurThenChangeLogic } from "./lib/validation-logic"
import {
  DEFAULT_VALIDATION_MODE,
  setFormZenoState,
  type ValidationMode,
} from "./lib/validation-modes"
import { useAppFields } from "./use-app-fields"

// Structural shape of a Standard Schema (Zod, Valibot, ArkType, …). Avoids a
// direct dependency on `@standard-schema/spec`; runtime validation goes
// through TanStack Form's standard-schema integration unchanged.
type StandardSchema<T> = {
  readonly "~standard": {
    readonly validate: (value: unknown) => unknown
    readonly types?: { readonly input: T; readonly output: T }
  }
}

// Recursive partial that preserves arrays, dates, and other structural types
// as atomic — only plain object keys become optional. Used to relax
// `defaultValues` so users can omit fields covered by the schema's
// `.default(...)` values or by the string/array auto-fill (see
// `lib/schema-defaults.ts`). `value` on submit is still typed as the full
// `TFormData` because TanStack's runtime state assertion is unchanged.
type PartialFormData<T> = T extends readonly unknown[]
  ? T
  : T extends Date | RegExp | ((...args: never[]) => unknown)
    ? T
    : T extends object
      ? { [K in keyof T]?: PartialFormData<T[K]> }
      : T

type ZenoFormExtras<TFormData> = {
  /**
   * A standard schema (Zod, Valibot, ArkType, …) describing the form data.
   * `useZenoForm` uses it to generate `validators` and `validationLogic`
   * based on the chosen `validation` mode. Pass your own `validators` /
   * `validationLogic` to override.
   */
  schema?: StandardSchema<TFormData>
  /**
   * When the schema runs and when errors are displayed.
   *
   * - `'blur-then-change'` (default) — schema runs on blur, then on every
   *   change for fields that have already been blurred. Errors appear after
   *   first blur. Calm typing, live corrections.
   * - `'change'` — schema runs on every keystroke. Errors appear as soon as
   *   the user starts typing.
   * - `'blur'` — schema runs only on blur. Errors appear after blur, but
   *   do not update until the next blur.
   * - `'submit'` — schema runs only on submit. No errors before submit.
   */
  validation?: ValidationMode
  /**
   * If `true`, shipped fields skip rendering their inline `<FieldError>`
   * message. Use it when you collect errors in a single summary somewhere
   * else (e.g. above the submit button). The fields still flip
   * `data-invalid` and `aria-invalid`, so invalid styling is preserved.
   */
  hideFieldErrors?: boolean
  /**
   * Show a `*` next to the label of every field the schema treats as
   * required. Defaults to `true`. Set to `false` to opt out form-wide.
   *
   * Required-ness is detected by probing the schema with an empty object;
   * fields wrapped in `.optional()`, `.nullable()`, or `.default(…)` are
   * treated as not required. Async schemas can't be probed and produce no
   * indicators. Pass `required` directly on a field to override the
   * schema-derived value.
   */
  requiredIndicator?: boolean
  /**
   * Warn the user before they navigate away with unsaved changes. Two
   * trigger modes:
   *
   * - `"if-changed"` (recommended) — warn while current values differ
   *   from defaults (`!state.isDefaultValue`). Clears if the user
   *   restores the original values, or after `formApi.reset(value)` is
   *   called post-submit to rebase defaults.
   * - `"if-touched"` — warn after the user has edited any field, even
   *   if they reverted (`state.isDirty`, sticky once edited).
   *
   * Pass `true` as shorthand for `"if-changed"`. The warning never fires
   * while the form is mid-submit. Covers full-page navigation only — for
   * client-side route changes, read the relevant state flag from the
   * form yourself and prompt before pushing the next route.
   */
  unsavedChangesWarning?: boolean | "if-changed" | "if-touched"
  /**
   * Initial values for the form fields. Relaxed to a deep partial so you can
   * omit fields whose defaults come from the schema — `.default(...)` values
   * flow through, and `z.string()` / `z.array(...)` without a default
   * initialise to `""` / `[]` to keep inputs controlled. See `lib/schema-defaults.ts`.
   *
   * Numbers, booleans, dates, and other domain-loaded types still need an
   * explicit value here when the schema doesn't provide one.
   */
  defaultValues?: PartialFormData<TFormData>
}

type UseZenoFormOptions<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData>,
  TOnChange extends undefined | FormValidateOrFn<TFormData>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnBlur extends undefined | FormValidateOrFn<TFormData>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnDynamic extends undefined | FormValidateOrFn<TFormData>,
  TOnDynamicAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta,
> = Omit<
  FormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >,
  "defaultValues"
> &
  ZenoFormExtras<TFormData>

function buildValidatorsFromSchema<TFormData>(
  schema: StandardSchema<TFormData>,
  mode: ValidationMode
) {
  switch (mode) {
    case "change":
    case "blur-then-change":
      return { onChange: schema }
    case "blur":
      return { onBlur: schema }
    case "submit":
      return { onSubmit: schema }
    default:
      return { onChange: schema }
  }
}

function useZenoForm<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChange extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChangeAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnSubmitAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnDynamic extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnDynamicAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
  TSubmitMeta = never,
>(
  options: UseZenoFormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >
) {
  const {
    schema,
    validation = DEFAULT_VALIDATION_MODE,
    hideFieldErrors = false,
    requiredIndicator = true,
    unsavedChangesWarning = false,
    validators,
    validationLogic,
    onSubmit: userOnSubmit,
    ...rest
  } = options

  const wrappedOnSubmit = userOnSubmit
    ? ((async (props: { formApi: AnyFormApi; value: TFormData }) => {
        try {
          await (
            userOnSubmit as unknown as (
              p: typeof props
            ) => unknown | Promise<unknown>
          )(props)
        } catch (error) {
          if (error instanceof ValidationError) {
            applyValidationError(props.formApi, error)
            return
          }
          throw error
        }
      }) as typeof userOnSubmit)
    : undefined

  const requiredFields = useMemo(
    () =>
      schema && requiredIndicator
        ? getRequiredPaths(schema as Parameters<typeof getRequiredPaths>[0])
        : new Set<string>(),
    [schema, requiredIndicator]
  )

  const { defaultValues: userDefaultValues, ...restWithoutDefaults } = rest

  const schemaDefaults = useMemo(
    () =>
      schema
        ? extractZodDefaults(schema as Parameters<typeof extractZodDefaults>[0])
        : undefined,
    [schema]
  )

  const mergedDefaultValues = useMemo(
    () =>
      schemaDefaults
        ? (deepMergeDefaults(
            schemaDefaults,
            userDefaultValues as Record<string, unknown> | undefined
          ) as typeof userDefaultValues)
        : userDefaultValues,
    [schemaDefaults, userDefaultValues]
  )

  const resolvedValidators =
    validators ??
    (schema
      ? (buildValidatorsFromSchema(schema, validation) as unknown as
          | typeof validators
          | undefined)
      : undefined)

  const resolvedValidationLogic =
    validationLogic ??
    (validation === "blur-then-change" ? blurThenChangeLogic : undefined)

  const form = useAppForm<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >({
    ...restWithoutDefaults,
    ...(mergedDefaultValues === undefined
      ? {}
      : { defaultValues: mergedDefaultValues }),
    ...(wrappedOnSubmit ? { onSubmit: wrappedOnSubmit } : {}),
    ...(resolvedValidators ? { validators: resolvedValidators } : {}),
    ...(resolvedValidationLogic
      ? { validationLogic: resolvedValidationLogic }
      : {}),
  } as FormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >)

  setFormZenoState(form, {
    hideFieldErrors,
    requiredFields,
    requiredIndicator,
    validation,
  })

  useUnsavedChangesWarning(form, unsavedChangesWarning)

  const fields = useAppFields(form)
  return useMemo(
    () => Object.assign(form, fields, { ResetButton, SubmitButton }),
    [form, fields]
  )
}

export { useZenoForm }
