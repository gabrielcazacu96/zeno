"use client"

import { Form, FormProvider, useZenoForm } from "@zeno/forms"
import { RadioGroupFieldItem } from "@zeno/forms/fields"
import { FieldGroup } from "@zeno/ui/field"
import { SelectItem } from "@zeno/ui/select"
import { z } from "zod"

const wrapperClass = "w-full max-w-sm"

export function InputFieldPreview() {
  const form = useZenoForm({
    defaultValues: { name: "" },
    schema: z.object({ name: z.string().min(2, "At least 2 characters") }),
  })
  const { InputField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <InputField
            description="Shown next to your avatar."
            label="Display name"
            name="name"
            placeholder="Ada Lovelace"
          />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function EmailFieldPreview() {
  const form = useZenoForm({
    defaultValues: { email: "" },
    schema: z.object({ email: z.email("Enter a valid email") }),
  })
  const { EmailField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <EmailField placeholder="you@zeno.dev" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function PasswordFieldPreview() {
  const form = useZenoForm({
    defaultValues: { password: "" },
    schema: z.object({
      password: z.string().min(8, "At least 8 characters"),
    }),
  })
  const { PasswordField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <PasswordField autoComplete="new-password" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function TextAreaFieldPreview() {
  const form = useZenoForm({
    defaultValues: { bio: "" },
    schema: z.object({
      bio: z.string().max(160, "Keep it under 160 characters"),
    }),
  })
  const { TextAreaField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <TextAreaField
            description="160 characters max."
            label="Bio"
            name="bio"
            placeholder="I build things on the web."
          />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function NumberFieldPreview() {
  const form = useZenoForm({
    defaultValues: { age: 18 as number | undefined },
    schema: z.object({
      age: z
        .number({ error: "Enter your age" })
        .int()
        .min(13, "Must be at least 13"),
    }),
  })
  const { NumberField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <NumberField label="Age" min={13} name="age" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function SelectFieldPreview() {
  const form = useZenoForm({
    defaultValues: { role: "" },
    schema: z.object({
      role: z.enum(["engineer", "designer", "manager"], {
        error: "Pick a role",
      }),
    }),
  })
  const { SelectField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <SelectField label="Role" name="role" placeholder="Pick a role">
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectField>
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function CheckboxFieldPreview() {
  const form = useZenoForm({
    defaultValues: { terms: false },
    schema: z.object({
      terms: z.literal(true, { error: "You must accept the terms" }),
    }),
  })
  const { CheckboxField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <CheckboxField
            description="You can revoke this at any time."
            label="I accept the terms of service"
            name="terms"
          />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function SwitchFieldPreview() {
  const form = useZenoForm({
    defaultValues: { pushNotifications: true },
  })
  const { SwitchField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <SwitchField
            description="Get notified when something needs your attention."
            label="Push notifications"
            name="pushNotifications"
          />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function RadioGroupFieldPreview() {
  const form = useZenoForm({
    defaultValues: { plan: "free" },
  })
  const { RadioGroupField } = form
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <RadioGroupField label="Plan" name="plan">
            <RadioGroupFieldItem value="free">Free</RadioGroupFieldItem>
            <RadioGroupFieldItem value="pro">Pro</RadioGroupFieldItem>
            <RadioGroupFieldItem value="team">Team</RadioGroupFieldItem>
          </RadioGroupField>
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}
