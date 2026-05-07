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
import type { ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type ComboboxFieldProps = {
  /** String items shown in the dropdown. Filtered by Base UI. */
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
}

function ComboboxField({
  className,
  description,
  emptyMessage = "No results.",
  items,
  label,
  placeholder,
  renderItem,
  showClear = true,
}: ComboboxFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors

  const value = field.state.value ?? ""

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Combobox
        items={items}
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
          showClear={showClear && Boolean(value)}
        />
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
