import { type ControllerRenderProps, type FieldError } from "react-hook-form"

import { Textarea } from "~/components/ui/textarea"

type TextareaFieldProps = {
  field: ControllerRenderProps<any, any>
  error?: FieldError
  placeholder: string
  maxLength?: number
  showCounter?: boolean
}

function toTextareaBindings(field: ControllerRenderProps<any, any>) {
  return {
    name: field.name,
    onBlur: field.onBlur,
    onChange: field.onChange,
    ref: field.ref,
  }
}

export default function TextareaField({
  field,
  error,
  placeholder,
  maxLength,
  showCounter = false,
}: TextareaFieldProps) {
  const value = typeof field.value === "string" ? field.value : ""
  const hasCounter = showCounter && typeof maxLength === "number"
  const textareaBindings = toTextareaBindings(field)

  return (
    <div>
      <div
        className={`flex items-end border-b pb-2 ${error ? "border-destructive" : "border-gray"}`}
      >
        <Textarea
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          className={`min-h-0 flex-1 resize-none rounded-none border-none bg-transparent px-0 py-0 text-sm shadow-none ring-0 outline-none focus-visible:ring-0 ${error ? "placeholder:text-destructive" : "placeholder:text-gray"}`}
          {...textareaBindings}
        />
        {hasCounter && (
          <span
            className={`ml-2 shrink-0 text-xs ${error ? "text-destructive" : "text-gray"}`}
          >
            <span className="text-dark">{value.length}</span>/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
