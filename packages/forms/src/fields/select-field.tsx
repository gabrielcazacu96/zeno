"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@zeno/ui/select"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type SelectFieldProps = Omit<
  ComponentProps<typeof Select>,
  "name" | "onValueChange" | "value"
> & {
  children: ReactNode
  description?: ReactNode
  label?: ReactNode
  placeholder?: string
  triggerClassName?: string
  triggerSize?: ComponentProps<typeof SelectTrigger>["size"]
}

function SelectField({
  children,
  description,
  label,
  placeholder,
  triggerClassName,
  triggerSize,
  ...props
}: SelectFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Select
        name={field.name}
        onValueChange={(value) => field.handleChange(String(value))}
        value={field.state.value ?? ""}
        {...props}
      >
        <SelectTrigger
          aria-describedby={describedBy(
            [description, descriptionId],
            [showError, errorId]
          )}
          aria-invalid={isInvalid || undefined}
          className={triggerClassName}
          id={field.name}
          onBlur={field.handleBlur}
          size={triggerSize}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {showError && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

export { SelectField }
