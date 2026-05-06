"use client"

import type { DeepKeys } from "@tanstack/react-form"
import { type ComponentProps, useMemo } from "react"

import { CheckboxField as CheckboxFieldImpl } from "./fields/checkbox-field"
import { EmailField as EmailFieldImpl } from "./fields/email-field"
import { InputField as InputFieldImpl } from "./fields/input-field"
import { NumberField as NumberFieldImpl } from "./fields/number-field"
import { PasswordField as PasswordFieldImpl } from "./fields/password-field"
import { RadioGroupField as RadioGroupFieldImpl } from "./fields/radio-group-field"
import { SelectField as SelectFieldImpl } from "./fields/select-field"
import { SwitchField as SwitchFieldImpl } from "./fields/switch-field"
import { TextAreaField as TextAreaFieldImpl } from "./fields/textarea-field"

type FormDataOf<F> = F extends { state: { values: infer V } } ? V : never

type AnyAppForm = {
  AppField: unknown
  state: { values: unknown }
}

type WithDefaultName<T, D extends string> =
  D extends DeepKeys<T> ? { name?: DeepKeys<T> } : { name: DeepKeys<T> }

function useAppFields<TForm extends AnyAppForm>(form: TForm) {
  type T = FormDataOf<TForm>

  return useMemo(() => {
    const Field = form.AppField as unknown as React.ComponentType<{
      name: string
      children: () => React.ReactNode
    }>

    return {
      CheckboxField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof CheckboxFieldImpl> & { name: N }) {
        return (
          <Field name={name}>{() => <CheckboxFieldImpl {...props} />}</Field>
        )
      },
      EmailField({
        name,
        ...props
      }: ComponentProps<typeof EmailFieldImpl> & WithDefaultName<T, "email">) {
        return (
          <Field name={(name ?? "email") as string}>
            {() => <EmailFieldImpl {...props} />}
          </Field>
        )
      },
      InputField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof InputFieldImpl> & { name: N }) {
        return <Field name={name}>{() => <InputFieldImpl {...props} />}</Field>
      },
      NumberField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof NumberFieldImpl> & { name: N }) {
        return <Field name={name}>{() => <NumberFieldImpl {...props} />}</Field>
      },
      PasswordField({
        name,
        ...props
      }: ComponentProps<typeof PasswordFieldImpl> &
        WithDefaultName<T, "password">) {
        return (
          <Field name={(name ?? "password") as string}>
            {() => <PasswordFieldImpl {...props} />}
          </Field>
        )
      },
      RadioGroupField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof RadioGroupFieldImpl> & { name: N }) {
        return (
          <Field name={name}>{() => <RadioGroupFieldImpl {...props} />}</Field>
        )
      },
      SelectField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof SelectFieldImpl> & { name: N }) {
        return <Field name={name}>{() => <SelectFieldImpl {...props} />}</Field>
      },
      SwitchField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof SwitchFieldImpl> & { name: N }) {
        return <Field name={name}>{() => <SwitchFieldImpl {...props} />}</Field>
      },
      TextAreaField<N extends DeepKeys<T>>({
        name,
        ...props
      }: ComponentProps<typeof TextAreaFieldImpl> & { name: N }) {
        return (
          <Field name={name}>{() => <TextAreaFieldImpl {...props} />}</Field>
        )
      },
    }
  }, [form])
}

export { useAppFields }
