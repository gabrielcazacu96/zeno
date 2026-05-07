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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Monthly digest of new fields, examples, and releases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <form.EmailField placeholder="you@zeno.dev" />
          <form.SubmitButton>Subscribe</form.SubmitButton>
          {submitted && (
            <p className="text-muted-foreground text-sm">
              Subscribed: <span className="font-medium">{submitted}</span>
            </p>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}
