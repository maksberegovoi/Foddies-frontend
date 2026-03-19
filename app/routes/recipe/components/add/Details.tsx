import { memo } from "react"
import {
  useController,
  type Control,
  type ControllerRenderProps,
} from "react-hook-form"

import { Input } from "~/components/ui/input"
import ControlledTextareaField from "./TextareaField"
import Text from "~/components/Text"

const DESCRIPTION_MAX = 200

type DetailsProps = {
  control: Control<any>
}

function toInputBindings(field: ControllerRenderProps<any, any>) {
  return {
    name: field.name,
    onBlur: field.onBlur,
    onChange: field.onChange,
    ref: field.ref,
  }
}

function Details({ control }: DetailsProps) {
  const {
    field: titleField,
    fieldState: { error: titleError },
  } = useController({ name: "title", control })
  const {
    field: descriptionField,
    fieldState: { error: descriptionError },
  } = useController({ name: "description", control })
  const titleInputBindings = toInputBindings(titleField)
  const titleValue =
    typeof titleField.value === "string" ? titleField.value : ""

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Input
          type="text"
          value={titleValue}
          placeholder="THE NAME OF THE RECIPE"
          className="h-auto rounded-none border-none bg-transparent p-0 text-lg font-bold text-dark uppercase shadow-none ring-0 outline-none placeholder:text-lg placeholder:font-bold placeholder:text-gray placeholder:uppercase focus-visible:ring-0"
          {...titleInputBindings}
        />
        {titleError && (
          <Text as={"span"} className="text-destructive">
            {titleError.message}
          </Text>
        )}
      </div>

      <ControlledTextareaField
        field={descriptionField}
        error={descriptionError}
        placeholder="Enter dish description"
        maxLength={DESCRIPTION_MAX}
        showCounter
      />
    </div>
  )
}

export default memo(Details)
