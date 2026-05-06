import { InputField, type InputFieldProps } from "./input-field"

type PasswordFieldProps = Omit<InputFieldProps, "type">

function PasswordField({
  autoComplete = "current-password",
  label = "Password",
  ...props
}: PasswordFieldProps) {
  return (
    <InputField
      autoComplete={autoComplete}
      label={label}
      type="password"
      {...props}
    />
  )
}

export { PasswordField }
