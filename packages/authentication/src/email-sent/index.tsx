"use client"

import Link from "next/link"
import { Container } from "../components/container"
import { useAuthForm } from "../components/context"

export function EmailSent({
  header,
  content,
  footer,
}: {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}) {
  const { email } = useAuthForm()
  return (
    <Container title="An email is on its way !">
      {header}
      {content || (
        <p>
          We’ve sent an email to {email || "your email"} to verify your
          identity. It contains <span className="font-semibold">a link</span>{" "}
          for you to access your secure account.
        </p>
      )}
      {footer || (
        <p className="text-muted-foreground">
          You did not receive the email? Check your spam folder or{" "}
          <Link className="link" href="/sign-in">
            try again
          </Link>
          .
        </p>
      )}
    </Container>
  )
}
