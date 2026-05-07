"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import { cn } from "@zeno/ui/lib/utils"
import { RadioGroup, RadioGroupItem } from "@zeno/ui/radio-group"
import { type ComponentProps, type ReactNode, useId } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type RadioGroupFieldProps = Omit<
  ComponentProps<typeof RadioGroup>,
  "name" | "onValueChange" | "value"
> & {
  description?: ReactNode
  label?: ReactNode
}

function RadioGroupField({
  children,
  description,
  label,
  ...props
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <RadioGroup
        aria-describedby={describedBy(
          [description, descriptionId],
          [showError, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        name={field.name}
        onValueChange={(value) => field.handleChange(String(value))}
        value={field.state.value ?? ""}
        {...props}
      >
        {children}
      </RadioGroup>
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {showError && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

type RadioGroupFieldItemProps = Omit<
  ComponentProps<typeof RadioGroupItem>,
  "id"
> & {
  children?: ReactNode
  labelClassName?: string
}

function RadioGroupFieldItem({
  children,
  className,
  labelClassName,
  ...props
}: RadioGroupFieldItemProps) {
  const id = useId()
  return (
    <label
      className={cn("flex items-center gap-2 text-sm", labelClassName)}
      htmlFor={id}
    >
      <RadioGroupItem className={className} id={id} {...props} />
      {children}
    </label>
  )
}

export { RadioGroupField, RadioGroupFieldItem }
