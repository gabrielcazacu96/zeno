"use client"

import { Form, FormProvider, useZenoForm } from "@zeno/forms"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zeno/ui/card"
import { Field, FieldGroup } from "@zeno/ui/field"
import { useState } from "react"
import { z } from "zod"

import { SubmittedValues, wrapperClass } from "./preview-utils"

const profileSchema = z.object({
  name: z.string().min(2, "At least 2 characters"),
})

export function FormInCardExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: { name: "" },
    onSubmit: ({ value }) => setSubmitted(value),
    validators: { onChange: profileSchema },
  })
  const { InputField, ResetButton, SubmitButton } = form
  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Display name</CardTitle>
          <CardDescription>How we'll address you in the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="card-form">
            <FieldGroup>
              <InputField label="Name" name="name" placeholder="Ada Lovelace" />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton />
            <SubmitButton form="card-form">Save</SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      <SubmittedValues value={submitted} />
    </FormProvider>
  )
}
