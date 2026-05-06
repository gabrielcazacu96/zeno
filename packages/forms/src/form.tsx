/* biome-ignore-all lint/performance/noBarrelFile: so consumers depend only on `@zeno/forms`. */
"use client"

import { type AnyFormApi, createFormHook } from "@tanstack/react-form"
import { FieldGroup } from "@zeno/ui/field"
import { cn } from "@zeno/ui/lib/utils"
import type { ComponentProps, FormEvent } from "react"

import { CheckboxField } from "./fields/checkbox-field"
import { EmailField } from "./fields/email-field"
import { InputField } from "./fields/input-field"
import { NumberField } from "./fields/number-field"
import { PasswordField } from "./fields/password-field"
import { RadioGroupField } from "./fields/radio-group-field"
import { SelectField } from "./fields/select-field"
import { SubmitButton } from "./fields/submit-button"
import { SwitchField } from "./fields/switch-field"
import { TextAreaField } from "./fields/textarea-field"
import { FormProvider, fieldContext, formContext } from "./lib/contexts"

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
    SubmitButton,
  },
  formContext,
})

export { useAppForm, withFieldGroup, withForm }

type FormProps = Omit<ComponentProps<"form">, "onSubmit"> & {
  form: { handleSubmit: () => unknown }
}

function Form({ children, className, form, ...props }: FormProps) {
  return (
    <FormProvider value={form as AnyFormApi}>
      <form
        className={cn("flex flex-col gap-6", className)}
        noValidate
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          event.stopPropagation()
          Promise.resolve(form.handleSubmit()).catch(() => undefined)
        }}
        {...props}
      >
        <FieldGroup>{children}</FieldGroup>
      </form>
    </FormProvider>
  )
}

export { Form }
