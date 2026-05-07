"use client"

import type {
  FormAsyncValidateOrFn,
  FormOptions,
  FormValidateOrFn,
} from "@tanstack/react-form"
import { useMemo } from "react"

import { SubmitButton } from "./fields/submit-button"
import { useAppForm } from "./form"
import { useAppFields } from "./use-app-fields"

function useZenoForm<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChange extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChangeAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnSubmitAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnDynamic extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnDynamicAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
  TSubmitMeta = never,
>(
  options: FormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >
) {
  const form = useAppForm<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta
  >(options)
  const fields = useAppFields(form)
  return useMemo(
    () => Object.assign(form, fields, { SubmitButton }),
    [form, fields]
  )
}

export { useZenoForm }
