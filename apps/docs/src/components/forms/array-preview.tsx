"use client"

import { Form, useZenoForm } from "@zeno/forms"
import { SubmitButton } from "@zeno/forms/fields"
import { Button } from "@zeno/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zeno/ui/card"
import { FieldLegend, FieldSet } from "@zeno/ui/field"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

import { SubmittedValues } from "./preview-utils"

const memberSchema = z.object({
  email: z.email("Enter a valid email"),
  name: z.string().min(1, "Name is required"),
})
const teamSchema = z.object({
  members: z.array(memberSchema).min(1, "Add at least one member"),
})

type Member = z.infer<typeof memberSchema>

export function ArrayExample() {
  const [submitted, setSubmitted] = useState<unknown>(null)
  const form = useZenoForm({
    defaultValues: { members: [{ email: "", name: "" }] as Member[] },
    onSubmit: ({ value }) => setSubmitted(value),
    validators: { onChange: teamSchema },
  })
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Invite team members</CardTitle>
        <CardDescription>
          Add as many teammates as you need — each row is its own array entry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <form.Field mode="array" name="members">
            {(arrayField) => (
              <FieldSet>
                <FieldLegend>Members</FieldLegend>
                {arrayField.state.value.map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: tanstack form rows are keyed by index
                  <div className="flex items-end gap-2" key={index}>
                    <div className="flex-1">
                      <form.InputField
                        label={index === 0 ? "Name" : undefined}
                        name={`members[${index}].name`}
                        placeholder="Ada Lovelace"
                      />
                    </div>
                    <div className="flex-1">
                      <form.EmailField
                        label={index === 0 ? "Email" : undefined}
                        name={`members[${index}].email`}
                      />
                    </div>
                    <Button
                      aria-label={`Remove member ${index + 1}`}
                      onClick={() => arrayField.removeValue(index)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => arrayField.pushValue({ email: "", name: "" })}
                  type="button"
                  variant="outline"
                >
                  Add member
                </Button>
              </FieldSet>
            )}
          </form.Field>
          <SubmitButton>Send invites</SubmitButton>
          <SubmittedValues value={submitted} />
        </Form>
      </CardContent>
    </Card>
  )
}
