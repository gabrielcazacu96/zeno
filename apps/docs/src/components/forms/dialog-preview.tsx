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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@zeno/ui/dialog"
import { useState } from "react"
import { z } from "zod"

import { wrapperClass } from "./preview-utils"

const slugRegex = /^[a-z0-9-]+$/
const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(slugRegex, "Lowercase letters, numbers, and dashes only"),
})

export function DialogExample() {
  const [open, setOpen] = useState(false)
  const [created, setCreated] = useState<{ name: string; slug: string } | null>(
    null
  )
  const form = useZenoForm({
    defaultValues: { name: "", slug: "" },
    onSubmit: ({ value }) => {
      setCreated(value)
      setOpen(false)
    },
    validators: { onChange: projectSchema },
  })

  return (
    <Card className={wrapperClass}>
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>
          Open the dialog to create a new project.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger render={<Button>Create project</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
              <DialogDescription>
                Give your project a name and a slug to get started.
              </DialogDescription>
            </DialogHeader>
            <Form form={form}>
              <form.InputField
                label="Name"
                name="name"
                placeholder="Resolve admin"
              />
              <form.InputField
                description="Used in URLs."
                label="Slug"
                name="slug"
                placeholder="resolve-admin"
              />
              <DialogFooter>
                <Button
                  onClick={() => setOpen(false)}
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
                <SubmitButton>Create</SubmitButton>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
        {created && (
          <p className="text-muted-foreground text-sm">
            Created <span className="font-medium">{created.name}</span> (
            <code>{created.slug}</code>).
          </p>
        )}
      </CardContent>
    </Card>
  )
}
