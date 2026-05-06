"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import { Textarea } from "@zeno/ui/textarea"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"

type TextAreaFieldProps = Omit<
  ComponentProps<typeof Textarea>,
  "id" | "name" | "onBlur" | "onChange" | "value"
> & {
  description?: ReactNode
  label?: ReactNode
}

function TextAreaField({ description, label, ...props }: TextAreaFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Textarea
        aria-describedby={describedBy(
          [description, descriptionId],
          [isInvalid, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        value={field.state.value ?? ""}
        {...props}
      />
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {isInvalid && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

export { TextAreaField }
