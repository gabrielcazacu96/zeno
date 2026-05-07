"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import { InputGroup, InputGroupTextarea } from "@zeno/ui/input-group"
import { Textarea } from "@zeno/ui/textarea"
import { Children, type ComponentProps, type ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type TextAreaFieldProps = Omit<
  ComponentProps<typeof Textarea>,
  "children" | "id" | "name" | "onBlur" | "onChange" | "value"
> & {
  children?: ReactNode
  description?: ReactNode
  label?: ReactNode
}

function TextAreaField({
  children,
  description,
  label,
  ...props
}: TextAreaFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors
  const hasAddons = Children.count(children) > 0

  const textareaProps = {
    "aria-describedby": describedBy(
      [description, descriptionId],
      [showError, errorId]
    ),
    "aria-invalid": isInvalid || undefined,
    id: field.name,
    name: field.name,
    onBlur: field.handleBlur,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      field.handleChange(event.target.value),
    value: field.state.value ?? "",
    ...props,
  }

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {hasAddons ? (
        <InputGroup>
          <InputGroupTextarea {...textareaProps} />
          {children}
        </InputGroup>
      ) : (
        <Textarea {...textareaProps} />
      )}
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {showError && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

export { TextAreaField }
