"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@zeno/ui/field"
import { Switch } from "@zeno/ui/switch"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"

type SwitchFieldProps = Omit<
  ComponentProps<typeof Switch>,
  "checked" | "id" | "name" | "onBlur" | "onCheckedChange"
> & {
  description?: ReactNode
  label?: ReactNode
}

function SwitchField({ description, label, ...props }: SwitchFieldProps) {
  const field = useFieldContext<boolean>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && (
          <FieldDescription id={descriptionId}>{description}</FieldDescription>
        )}
        {isInvalid && (
          <FieldError errors={field.state.meta.errors} id={errorId} />
        )}
      </FieldContent>
      <Switch
        aria-describedby={describedBy(
          [description, descriptionId],
          [isInvalid, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        checked={field.state.value ?? false}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onCheckedChange={(value) => field.handleChange(value)}
        {...props}
      />
    </Field>
  )
}

export { SwitchField }
