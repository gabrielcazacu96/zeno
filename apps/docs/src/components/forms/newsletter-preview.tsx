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
import { toast } from "@zeno/ui/sonner"
import { z } from "zod"

import { wrapperClass } from "./preview-utils"

const newsletterSchema = z.object({
  email: z.email("Enter a valid email"),
})

export function NewsletterPreview() {
  const form = useZenoForm({
    onSubmit: ({ value }) => {
      toast.success("Subscribed", { description: value.email })
    },
    schema: newsletterSchema,
  })
  const { EmailField, ResetButton, SubmitButton } = form

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
              <EmailField placeholder="you@zeno.dev" />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton />
            <SubmitButton form="newsletter-form">Subscribe</SubmitButton>
          </Field>
        </CardFooter>
      </Card>
    </FormProvider>
  )
}
