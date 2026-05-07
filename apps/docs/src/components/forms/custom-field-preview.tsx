"use client"

import { Form, FormProvider, useFieldContext, useZenoForm } from "@zeno/forms"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zeno/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@zeno/ui/field"
import { Slider } from "@zeno/ui/slider"
import { useState } from "react"
import { z } from "zod"

function VolumeField({ label }: { label: string }) {
  const field = useFieldContext<number>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = field.state.value ?? 0
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label}: {value}
      </FieldLabel>
      <Slider
        id={field.name}
        max={100}
        min={0}
        onValueChange={(next) =>
          field.handleChange(Array.isArray(next) ? (next[0] ?? 0) : next)
        }
        step={1}
        value={[value]}
      />
      <FieldDescription>Drag to set the master volume.</FieldDescription>
      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
    </Field>
  )
}

const audioSchema = z.object({
  volume: z.number().min(0).max(100),
})

export function CustomFieldPreview() {
  const [applied, setApplied] = useState<number | null>(null)
  const form = useZenoForm({
    defaultValues: { volume: 35 },
    onSubmit: ({ value }) => {
      setApplied(value.volume)
    },
    validators: { onChange: audioSchema },
  })
  const { AppField, ResetButton, SubmitButton } = form

  return (
    <FormProvider form={form}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Audio settings</CardTitle>
          <CardDescription>
            Custom slider field built on top of `useFieldContext`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="audio-form">
            <FieldGroup>
              <AppField name="volume">
                {() => <VolumeField label="Volume" />}
              </AppField>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton />
            <SubmitButton form="audio-form">Apply</SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      {applied !== null && (
        <p className="text-muted-foreground text-sm">
          Applied volume: <span className="font-medium">{applied}</span>
        </p>
      )}
    </FormProvider>
  )
}
