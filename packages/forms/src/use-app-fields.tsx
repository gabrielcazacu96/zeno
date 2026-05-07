"use client"

import type { DeepKeys } from "@tanstack/react-form"
import { type ComponentProps, useMemo } from "react"

import { CheckboxField as CheckboxFieldImpl } from "./fields/checkbox-field"
import { ComboboxField as ComboboxFieldImpl } from "./fields/combobox-field"
import { DatePickerField as DatePickerFieldImpl } from "./fields/date-picker-field"
import { EmailField as EmailFieldImpl } from "./fields/email-field"
import { InputField as InputFieldImpl } from "./fields/input-field"
import { NumberField as NumberFieldImpl } from "./fields/number-field"
import { OtpField as OtpFieldImpl } from "./fields/otp-field"
import { PasswordField as PasswordFieldImpl } from "./fields/password-field"
import { RadioGroupField as RadioGroupFieldImpl } from "./fields/radio-group-field"
import { SelectField as SelectFieldImpl } from "./fields/select-field"
import { SliderField as SliderFieldImpl } from "./fields/slider-field"
import { SwitchField as SwitchFieldImpl } from "./fields/switch-field"
import { TextAreaField as TextAreaFieldImpl } from "./fields/textarea-field"

type FormDataOf<F> = F extends { state: { values: infer V } } ? V : never

type AnyAppForm = {
  AppField: unknown
  state: { values: unknown }
}

type WithDefaultName<T, D extends string> =
  D extends DeepKeys<T> ? { name?: DeepKeys<T> } : { name: DeepKeys<T> }

// Loose validators type for the typed wrappers — name-aware validator typing
// from TanStack Form would collide with our per-field generics. Callers pass
// standard schemas (Zod) or functions; both flow through to `<Field>` at
// runtime unchanged. The structural shape mirrors TanStack's `FieldValidators`
// slots so prop-name autocomplete still works.
type AnyFieldValidators = {
  onMount?: unknown
  onChange?: unknown
  onChangeAsync?: unknown
  onChangeAsyncDebounceMs?: number
  onBlur?: unknown
  onBlurAsync?: unknown
  onBlurAsyncDebounceMs?: number
  onSubmit?: unknown
  onSubmitAsync?: unknown
  onSubmitAsyncDebounceMs?: number
  onDynamic?: unknown
  onDynamicAsync?: unknown
}

type WithValidators = { validators?: AnyFieldValidators }

function useAppFields<TForm extends AnyAppForm>(form: TForm) {
  type T = FormDataOf<TForm>

  return useMemo(() => {
    const Field = form.AppField as React.ComponentType<{
      name: string
      validators?: AnyFieldValidators
      children: () => React.ReactNode
    }>

    return {
      CheckboxField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof CheckboxFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <CheckboxFieldImpl {...props} />}
          </Field>
        )
      },
      ComboboxField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof ComboboxFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <ComboboxFieldImpl {...props} />}
          </Field>
        )
      },
      DatePickerField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof DatePickerFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <DatePickerFieldImpl {...props} />}
          </Field>
        )
      },
      EmailField({
        name,
        validators,
        ...props
      }: ComponentProps<typeof EmailFieldImpl> &
        WithDefaultName<T, "email"> &
        WithValidators) {
        return (
          <Field name={(name ?? "email") as string} validators={validators}>
            {() => <EmailFieldImpl {...props} />}
          </Field>
        )
      },
      InputField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof InputFieldImpl> & { name: N } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <InputFieldImpl {...props} />}
          </Field>
        )
      },
      NumberField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof NumberFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <NumberFieldImpl {...props} />}
          </Field>
        )
      },
      OtpField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof OtpFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <OtpFieldImpl {...props} />}
          </Field>
        )
      },
      PasswordField({
        name,
        validators,
        ...props
      }: ComponentProps<typeof PasswordFieldImpl> &
        WithDefaultName<T, "password"> &
        WithValidators) {
        return (
          <Field name={(name ?? "password") as string} validators={validators}>
            {() => <PasswordFieldImpl {...props} />}
          </Field>
        )
      },
      RadioGroupField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof RadioGroupFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <RadioGroupFieldImpl {...props} />}
          </Field>
        )
      },
      SelectField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof SelectFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <SelectFieldImpl {...props} />}
          </Field>
        )
      },
      SliderField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof SliderFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <SliderFieldImpl {...props} />}
          </Field>
        )
      },
      SwitchField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof SwitchFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <SwitchFieldImpl {...props} />}
          </Field>
        )
      },
      TextAreaField<N extends DeepKeys<T>>({
        name,
        validators,
        ...props
      }: ComponentProps<typeof TextAreaFieldImpl> & {
        name: N
      } & WithValidators) {
        return (
          <Field name={name} validators={validators}>
            {() => <TextAreaFieldImpl {...props} />}
          </Field>
        )
      },
    }
  }, [form])
}

export { useAppFields }
