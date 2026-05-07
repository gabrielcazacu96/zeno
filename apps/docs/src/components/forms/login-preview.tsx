"use client"

import { Form, useZenoForm } from "@zeno/forms"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zeno/ui/card"
import { useState } from "react"
import { z } from "zod"

import { SubmittedValues, wrapperClass } from "./preview-utils"

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
})

export function LoginExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: { email: "", password: "" },
    onSubmit: ({ value }) => setSubmitted(value),
    validators: { onChange: loginSchema },
  })
  return (
    <Card className={wrapperClass}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <form.EmailField placeholder="you@zeno.dev" />
          <form.PasswordField />
          <form.SubmitButton>Sign in</form.SubmitButton>
          <SubmittedValues value={submitted} />
        </Form>
      </CardContent>
    </Card>
  )
}
