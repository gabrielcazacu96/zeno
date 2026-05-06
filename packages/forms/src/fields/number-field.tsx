"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@zeno/ui/field"
import { Input } from "@zeno/ui/input"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"

type NumberFieldProps = Omit<
  ComponentProps<typeof Input>,
  "id" | "name" | "onBlur" | "onChange" | "type" | "value"
> & {
  description?: ReactNode
  label?: ReactNode
}

function NumberField({ description, label, ...props }: NumberFieldProps) {
  const field = useFieldContext<number | undefined>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = field.state.value
  const inputValue =
    typeof value === "number" && !Number.isNaN(value) ? value : ""

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        aria-describedby={describedBy(
          [description, descriptionId],
          [isInvalid, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        id={field.name}
        inputMode="numeric"
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => {
          const next = event.target.valueAsNumber
          field.handleChange(Number.isNaN(next) ? undefined : next)
        }}
        type="number"
        value={inputValue}
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

export { NumberField }
