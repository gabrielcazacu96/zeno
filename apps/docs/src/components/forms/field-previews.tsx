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
    validators: {
      onChange: z.object({ name: z.string().min(2, "At least 2 characters") }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.InputField
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
    validators: {
      onChange: z.object({ email: z.email("Enter a valid email") }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.EmailField placeholder="you@zeno.dev" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function PasswordFieldPreview() {
  const form = useZenoForm({
    defaultValues: { password: "" },
    validators: {
      onChange: z.object({
        password: z.string().min(8, "At least 8 characters"),
      }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.PasswordField autoComplete="new-password" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function TextAreaFieldPreview() {
  const form = useZenoForm({
    defaultValues: { bio: "" },
    validators: {
      onChange: z.object({
        bio: z.string().max(160, "Keep it under 160 characters"),
      }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.TextAreaField
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
    validators: {
      onChange: z.object({
        age: z
          .number({ error: "Enter your age" })
          .int()
          .min(13, "Must be at least 13"),
      }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.NumberField label="Age" min={13} name="age" />
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function SelectFieldPreview() {
  const form = useZenoForm({
    defaultValues: { role: "" },
    validators: {
      onChange: z.object({
        role: z.enum(["engineer", "designer", "manager"], {
          error: "Pick a role",
        }),
      }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.SelectField label="Role" name="role" placeholder="Pick a role">
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </form.SelectField>
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}

export function CheckboxFieldPreview() {
  const form = useZenoForm({
    defaultValues: { terms: false },
    validators: {
      onChange: z.object({
        terms: z.literal(true, { error: "You must accept the terms" }),
      }),
    },
  })
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.CheckboxField
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
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.SwitchField
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
  return (
    <FormProvider form={form}>
      <Form className={wrapperClass}>
        <FieldGroup>
          <form.RadioGroupField label="Plan" name="plan">
            <RadioGroupFieldItem value="free">Free</RadioGroupFieldItem>
            <RadioGroupFieldItem value="pro">Pro</RadioGroupFieldItem>
            <RadioGroupFieldItem value="team">Team</RadioGroupFieldItem>
          </form.RadioGroupField>
        </FieldGroup>
      </Form>
    </FormProvider>
  )
}
