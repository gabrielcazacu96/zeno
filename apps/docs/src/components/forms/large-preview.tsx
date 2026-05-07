"use client"

import { Form, FormProvider, useZenoForm } from "@zeno/forms"
import { RadioGroupFieldItem } from "@zeno/forms/fields"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zeno/ui/card"
import { Field, FieldGroup } from "@zeno/ui/field"
import { SelectItem } from "@zeno/ui/select"
import { useState } from "react"
import { z } from "zod"

import { SubmittedValues, wrapperClass } from "./preview-utils"

const profileSchema = z.object({
  age: z
    .number({ error: "Enter your age" })
    .int()
    .min(13, "Must be at least 13"),
  bio: z.string().max(160, "Keep it under 160 characters"),
  marketing: z.boolean(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  plan: z.enum(["free", "pro", "team"]),
  pushNotifications: z.boolean(),
  role: z.enum(["engineer", "designer", "manager"]),
})

type ProfileValues = z.infer<typeof profileSchema>

const profileDefaults: ProfileValues = {
  age: 18,
  bio: "",
  marketing: false,
  name: "",
  plan: "free",
  pushNotifications: true,
  role: "engineer",
}

export function LargeExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: profileDefaults,
    onSubmit: ({ value }) => setSubmitted(value),
    validators: { onChange: profileSchema },
  })
  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Profile settings</CardTitle>
          <CardDescription>
            Most field types together, driven by a single Zod schema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="profile-form">
            <FieldGroup>
              <form.InputField
                description="How we'll address you in the app."
                label="Display name"
                name="name"
                placeholder="Ada Lovelace"
              />
              <form.NumberField label="Age" min={13} name="age" />
              <form.TextAreaField
                description="A short blurb about yourself."
                label="Bio"
                name="bio"
                placeholder="I build things on the web."
              />
              <form.SelectField
                label="Role"
                name="role"
                placeholder="Pick a role"
              >
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </form.SelectField>
              <form.RadioGroupField label="Plan" name="plan">
                <RadioGroupFieldItem value="free">Free</RadioGroupFieldItem>
                <RadioGroupFieldItem value="pro">Pro</RadioGroupFieldItem>
                <RadioGroupFieldItem value="team">Team</RadioGroupFieldItem>
              </form.RadioGroupField>
              <form.SwitchField
                description="Get notified when something needs your attention."
                label="Push notifications"
                name="pushNotifications"
              />
              <form.CheckboxField
                description="Occasional product news. No spam."
                label="Email me product updates"
                name="marketing"
              />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <form.ResetButton />
            <form.SubmitButton form="profile-form">
              Save profile
            </form.SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      <SubmittedValues value={submitted} />
    </FormProvider>
  )
}
