"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@zeno/ui/field"
import { Slider } from "@zeno/ui/slider"
import type { ComponentProps, ReactNode } from "react"

import { describedBy } from "../lib/aria"
import { useFieldContext } from "../lib/contexts"
import { useHideFieldErrors, useIsInvalid } from "../lib/use-is-invalid"

type SliderValue = number | number[]

type SliderFieldProps = Omit<
  ComponentProps<typeof Slider>,
  "name" | "onBlur" | "onValueChange" | "value"
> & {
  description?: ReactNode
  label?: ReactNode
  /**
   * Render a live numeric readout next to the label. Accepts the current
   * value(s) so callers can format units (e.g. `${v}%`, `$${a}-$${b}`).
   */
  formatValue?: (value: SliderValue) => ReactNode
}

function SliderField({
  description,
  formatValue,
  label,
  ...props
}: SliderFieldProps) {
  const field = useFieldContext<SliderValue>()
  const errorId = `${field.name}-error`
  const descriptionId = `${field.name}-description`
  const isInvalid = useIsInvalid(field)
  const hideErrors = useHideFieldErrors(field)
  const showError = isInvalid && !hideErrors

  const value = field.state.value
  const readout = formatValue && value !== undefined ? formatValue(value) : null

  return (
    <Field data-invalid={isInvalid}>
      {(label || readout) && (
        <FieldContent className="flex-row items-center justify-between">
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          {readout && (
            <span className="text-muted-foreground text-sm tabular-nums">
              {readout}
            </span>
          )}
        </FieldContent>
      )}
      <Slider
        aria-describedby={describedBy(
          [description, descriptionId],
          [showError, errorId]
        )}
        aria-invalid={isInvalid || undefined}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onValueChange={(next) => {
          const value: SliderValue =
            typeof next === "number" ? next : Array.from(next)
          field.handleChange(value)
        }}
        value={value}
        {...props}
      />
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {showError && (
        <FieldError errors={field.state.meta.errors} id={errorId} />
      )}
    </Field>
  )
}

export type { SliderFieldProps }
export { SliderField }
