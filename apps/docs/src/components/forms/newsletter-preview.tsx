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

import { wrapperClass } from "./preview-utils"

const newsletterSchema = z.object({
  email: z.email("Enter a valid email"),
})

export function NewsletterPreview() {
  const [submitted, setSubmitted] = useState<string | null>(null)
  const form = useZenoForm({
    defaultValues: { email: "" },
    onSubmit: ({ value }) => {
      setSubmitted(value.email)
    },
    validators: { onChange: newsletterSchema },
  })

  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Subscribe to our newsletter</CardTitle>
          <CardDescription>
            Monthly digest of new fields, examples, and releases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="newsletter-form">
            <FieldGroup>
              <form.EmailField placeholder="you@zeno.dev" />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <form.ResetButton />
            <form.SubmitButton form="newsletter-form">
              Subscribe
            </form.SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      {submitted && (
        <p className="text-muted-foreground text-sm">
          Subscribed: <span className="font-medium">{submitted}</span>
        </p>
      )}
    </FormProvider>
  )
}
