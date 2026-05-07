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

const signupSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.email("Enter a valid email"),
    password: z.string().min(8, "At least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function SignupExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: { confirmPassword: "", email: "", password: "" },
    onSubmit: ({ value }) =>
      setSubmitted({ email: value.email, password: "•••" }),
    validators: { onChange: signupSchema },
  })
  const { EmailField, PasswordField, ResetButton, SubmitButton } = form
  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Pick an email and password — confirmation must match.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="signup-form">
            <FieldGroup>
              <EmailField placeholder="you@zeno.dev" />
              <PasswordField autoComplete="new-password" />
              <PasswordField
                autoComplete="new-password"
                label="Confirm password"
                name="confirmPassword"
              />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton />
            <SubmitButton form="signup-form">Create account</SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      <SubmittedValues value={submitted} />
    </FormProvider>
  )
}
