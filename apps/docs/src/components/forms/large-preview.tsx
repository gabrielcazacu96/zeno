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
import { z } from "zod"

import { toastSubmitted, wrapperClass } from "./preview-utils"

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
  const form = useZenoForm({
    defaultValues: profileDefaults,
    onSubmit: ({ value }) => toastSubmitted(value),
    schema: profileSchema,
  })
  const {
    CheckboxField,
    InputField,
    NumberField,
    RadioGroupField,
    ResetButton,
    SelectField,
    SubmitButton,
    SwitchField,
    TextAreaField,
  } = form
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
              <InputField
                description="How we'll address you in the app."
                label="Display name"
                name="name"
                placeholder="Ada Lovelace"
              />
              <NumberField label="Age" min={13} name="age" />
              <TextAreaField
                description="A short blurb about yourself."
                label="Bio"
                name="bio"
                placeholder="I build things on the web."
              />
              <SelectField label="Role" name="role" placeholder="Pick a role">
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectField>
              <RadioGroupField label="Plan" name="plan">
                <RadioGroupFieldItem value="free">Free</RadioGroupFieldItem>
                <RadioGroupFieldItem value="pro">Pro</RadioGroupFieldItem>
                <RadioGroupFieldItem value="team">Team</RadioGroupFieldItem>
              </RadioGroupField>
              <SwitchField
                description="Get notified when something needs your attention."
                label="Push notifications"
                name="pushNotifications"
              />
              <CheckboxField
                description="Occasional product news. No spam."
                label="Email me product updates"
                name="marketing"
              />
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton />
            <SubmitButton form="profile-form">Save profile</SubmitButton>
          </Field>
        </CardFooter>
      </Card>
    </FormProvider>
  )
}
