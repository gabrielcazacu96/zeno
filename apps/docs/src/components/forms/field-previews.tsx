"use client"

import { Form, useZenoForm } from "@zeno/forms"
import { RadioGroupFieldItem } from "@zeno/forms/fields"
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
    <Form className={wrapperClass} form={form}>
      <form.InputField
        description="Shown next to your avatar."
        label="Display name"
        name="name"
        placeholder="Ada Lovelace"
      />
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.EmailField placeholder="you@zeno.dev" />
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.PasswordField autoComplete="new-password" />
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.TextAreaField
        description="160 characters max."
        label="Bio"
        name="bio"
        placeholder="I build things on the web."
      />
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.NumberField label="Age" min={13} name="age" />
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.SelectField label="Role" name="role" placeholder="Pick a role">
        <SelectItem value="engineer">Engineer</SelectItem>
        <SelectItem value="designer">Designer</SelectItem>
        <SelectItem value="manager">Manager</SelectItem>
      </form.SelectField>
    </Form>
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
    <Form className={wrapperClass} form={form}>
      <form.CheckboxField
        description="You can revoke this at any time."
        label="I accept the terms of service"
        name="terms"
      />
    </Form>
  )
}

export function SwitchFieldPreview() {
  const form = useZenoForm({
    defaultValues: { pushNotifications: true },
  })
  return (
    <Form className={wrapperClass} form={form}>
      <form.SwitchField
        description="Get notified when something needs your attention."
        label="Push notifications"
        name="pushNotifications"
      />
    </Form>
  )
}

export function RadioGroupFieldPreview() {
  const form = useZenoForm({
    defaultValues: { plan: "free" },
  })
  return (
    <Form className={wrapperClass} form={form}>
      <form.RadioGroupField label="Plan" name="plan">
        <RadioGroupFieldItem value="free">Free</RadioGroupFieldItem>
        <RadioGroupFieldItem value="pro">Pro</RadioGroupFieldItem>
        <RadioGroupFieldItem value="team">Team</RadioGroupFieldItem>
      </form.RadioGroupField>
    </Form>
  )
}
