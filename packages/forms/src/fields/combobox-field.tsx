"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@zeno/ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import { InputGroupAddon } from "@zeno/ui/input-group"
import { Spinner } from "@zeno/ui/spinner"
import type { ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { RequiredIndicator } from "../lib/required-indicator"
import {
  useHideFieldErrors,
  useIsFieldRequired,
  useIsInvalid,
} from "../lib/use-is-invalid"

type ComboboxFieldProps = {
  /** String items shown in the dropdown. Filtered by Base UI by default. */
  items: string[]
  description?: ReactNode
  label?: ReactNode
  placeholder?: string
  /** Message shown when filtering produces zero matches. */
  emptyMessage?: ReactNode
  /** Override per-row rendering. Default: plain `<ComboboxItem>{item}</ComboboxItem>`. */
  renderItem?: (item: string) => ReactNode
  /**
   * If `true`, show the clear button when a value is selected. Defaults to
   * `true` — pass `false` for required-style comboboxes where clearing is
   * disallowed.
   */
  showClear?: boolean
  className?: string
  /** Force the required `*` indicator on or off. Defaults to schema-derived. */
  required?: boolean
  /**
   * Controlled input text — pair with `onInputValueChange` for server-side
   * search. When omitted, Base UI manages the input value internally.
   */
  inputValue?: string
  /** Fires on every keystroke in the search input. */
  onInputValueChange?: (value: string) => void
  /**
   * Replace Base UI's built-in client-side filter. Pass `null` for
   * server-driven search where `items` is already filtered by the consumer.
   */
  filter?: ((item: string, query: string) => boolean) | null
  /**
   * Show a spinner addon inside the input while options are being fetched.
   * Pair with `onInputValueChange` to drive a debounced server query.
   */
  loading?: boolean
}

function ComboboxField({
  className,
  description,
  emptyMessage = "No results.",
  filter,
  inputValue,
  items,
  label,
  loading,
  onInputValueChange,
  placeholder,
  renderItem,
  required,
  showClear = true,
}: ComboboxFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors
  const schemaRequired = useIsFieldRequired(field)
  const isRequired = required ?? schemaRequired

  const value = field.state.value ?? ""

  return (
    <Field data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {isRequired && <RequiredIndicator />}
        </FieldLabel>
      )}
      <Combobox
        filter={filter}
        inputValue={inputValue}
        items={items}
        onInputValueChange={onInputValueChange}
        onValueChange={(next) => field.handleChange(next ?? "")}
        value={value}
      >
        <ComboboxInput
          aria-describedby={describedBy(
            [description, descriptionId],
            [showError, errorId]
          )}
          aria-invalid={isInvalid || undefined}
          className={className}
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          showClear={showClear && Boolean(value) && !loading}
        >
          {loading && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxList>
            {(item: string) =>
              renderItem ? (
                renderItem(item)
              ) : (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )
            }
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {showError && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

export type { ComboboxFieldProps }
export { ComboboxField }
