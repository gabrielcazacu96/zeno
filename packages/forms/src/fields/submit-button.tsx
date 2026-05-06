"use client"

import { Button } from "@zeno/ui/button"
import { Spinner } from "@zeno/ui/spinner"
import type { ComponentProps } from "react"

import { useFormContext } from "../lib/contexts"

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type">

function SubmitButton({ children, disabled, ...props }: SubmitButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          disabled={disabled || !canSubmit || isSubmitting}
          type="submit"
          {...props}
        >
          {isSubmitting ? <Spinner /> : null}
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}

export { SubmitButton }
