import { InputField, type InputFieldProps } from "./input-field"

type EmailFieldProps = Omit<InputFieldProps, "inputMode" | "type">

function EmailField({
  autoComplete = "email",
  label = "Email",
  ...props
}: EmailFieldProps) {
  return (
    <InputField
      autoComplete={autoComplete}
      inputMode="email"
      label={label}
      type="email"
      {...props}
    />
  )
}

export { EmailField }
