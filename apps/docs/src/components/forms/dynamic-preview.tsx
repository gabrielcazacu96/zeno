"use client"

import { Form, FormProvider, useZenoForm } from "@zeno/forms"
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

import { SubmittedValues, wrapperClass } from "./preview-utils"

export function DynamicExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: { country: "US", region: "", state: "" },
    onSubmit: ({ value }) => setSubmitted(value),
  })
  return (
    <FormProvider form={form}>
      <Card className={wrapperClass}>
        <CardHeader>
          <CardTitle>Shipping address</CardTitle>
          <CardDescription>
            Switch country to see the second field swap reactively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="shipping-form">
            <FieldGroup>
              <form.SelectField label="Country" name="country">
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </form.SelectField>
              <form.Subscribe selector={(state) => state.values.country}>
                {(country) =>
                  country === "US" ? (
                    <form.SelectField
                      label="State"
                      name="state"
                      placeholder="Pick a state"
                    >
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </form.SelectField>
                  ) : (
                    <form.InputField
                      description="State, province, or region."
                      label="Region"
                      name="region"
                      placeholder="Region"
                    />
                  )
                }
              </form.Subscribe>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <form.ResetButton />
            <form.SubmitButton form="shipping-form">
              Save address
            </form.SubmitButton>
          </Field>
        </CardFooter>
      </Card>
      <SubmittedValues value={submitted} />
    </FormProvider>
  )
}
