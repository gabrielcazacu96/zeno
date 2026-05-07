"use client"

import { Checkbox } from "@zeno/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@zeno/ui/field"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type CheckboxFieldProps = Omit<
  ComponentProps<typeof Checkbox>,
  "checked" | "id" | "name" | "onBlur" | "onCheckedChange"
> & {
  description?: ReactNode
  label?: ReactNode
}

function CheckboxField({ description, label, ...props }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        aria-describedby={describedBy(
          [description, descriptionId],
          [showError, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        checked={field.state.value ?? false}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onCheckedChange={(value) => field.handleChange(value === true)}
        {...props}
      />
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && (
          <FieldDescription id={descriptionId}>{description}</FieldDescription>
        )}
        {showError && (
          <FieldError errors={field.state.meta.errors} id={errorId} />
        )}
      </FieldContent>
    </Field>
  )
}

export { CheckboxField }
