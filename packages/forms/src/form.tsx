/* biome-ignore-all lint/performance/noBarrelFile: so consumers depend only on `@zeno/forms`. */
"use client"

import { type AnyFormApi, createFormHook } from "@tanstack/react-form"
import type { ComponentProps, FormEvent, ReactNode } from "react"

import { CheckboxField } from "./fields/checkbox-field"
import { EmailField } from "./fields/email-field"
import { InputField } from "./fields/input-field"
import { NumberField } from "./fields/number-field"
import { PasswordField } from "./fields/password-field"
import { RadioGroupField } from "./fields/radio-group-field"
import { ResetButton } from "./fields/reset-button"
import { SelectField } from "./fields/select-field"
import { SubmitButton } from "./fields/submit-button"
import { SwitchField } from "./fields/switch-field"
import { TextAreaField } from "./fields/textarea-field"
import {
  fieldContext,
  formContext,
  FormProvider as RawFormProvider,
  useFormContext,
} from "./lib/contexts"

export * from "@tanstack/react-form"
export { RadioGroupFieldItem } from "./fields/radio-group-field"
export { useFieldContext, useFormContext } from "./lib/contexts"
export { useAppFields } from "./use-app-fields"
export { useZenoForm } from "./use-zeno-form"

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    CheckboxField,
    EmailField,
    InputField,
    NumberField,
    PasswordField,
    RadioGroupField,
    SelectField,
    SwitchField,
    TextAreaField,
  },
  fieldContext,
  formComponents: {
    ResetButton,
    SubmitButton,
  },
  formContext,
})

export { useAppForm, withFieldGroup, withForm }

type FormProviderProps = {
  children: ReactNode
  form: { handleSubmit: () => unknown }
}

function FormProvider({ children, form }: FormProviderProps) {
  return (
    <RawFormProvider value={form as unknown as AnyFormApi}>
      {children}
    </RawFormProvider>
  )
}

type FormProps = Omit<ComponentProps<"form">, "onSubmit">

function Form({ children, className, ...props }: FormProps) {
  const form = useFormContext()
  return (
    <form
      className={className}
      noValidate
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        Promise.resolve(form.handleSubmit()).catch(() => undefined)
      }}
      {...props}
    >
      {children}
    </form>
  )
}

export { Form, FormProvider }
