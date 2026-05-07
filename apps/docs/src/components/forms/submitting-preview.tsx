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
import { Field as UIField, FieldError, FieldGroup, FieldLabel } from "@zeno/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@zeno/ui/input-group"
import { Spinner } from "@zeno/ui/spinner"
import { z } from "zod"

import { toastSubmitted, wrapperClass } from "./preview-utils"

const schema = z.object({
  email: z.email("Enter a valid email"),
  name: z.string().min(2, "At least 2 characters"),
})

async function fakeSave(value: unknown) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  toastSubmitted(value)
}

async function fakeCheckEmail(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return email === "taken@example.com"
}

export function SubmittingExample() {
  const form = useZenoForm({
    defaultValues: { email: "", name: "" },
    onSubmit: ({ value }) => fakeSave(value),
    schema,
  })
  const { Field, InputField, ResetButton, Subscribe, SubmitButton } = form

  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>
            Submit is blocked while the email check runs. Try
            "taken@example.com".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="account-form">
            <FieldGroup>
              <InputField label="Name" name="name" placeholder="Ada Lovelace" />
              <Field
                asyncDebounceMs={500}
                name="email"
                validators={{
                  onChangeAsync: async ({ value }) => {
                    const taken = await fakeCheckEmail(value)
                    return taken ? "Email already in use" : undefined
                  },
                }}
              >
                {(field) => {
                  const hasErrors = field.state.meta.errors.length > 0
                  return (
                    <UIField>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={hasErrors || undefined}
                          id="email"
                          name="email"
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="you@zeno.dev"
                          type="email"
                          value={field.state.value}
                        />
                        {field.state.meta.isValidating && (
                          <InputGroupAddon align="inline-end">
                            <Spinner />
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      {hasErrors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </UIField>
                  )
                }}
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <div className="flex gap-2">
                <ResetButton disabled={isSubmitting} />
                <SubmitButton form="account-form">Save changes</SubmitButton>
              </div>
            )}
          </Subscribe>
        </CardFooter>
      </Card>
    </FormProvider>
  )
}
