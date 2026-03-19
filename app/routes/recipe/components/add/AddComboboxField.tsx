import { memo } from "react"
import { useController, type Control } from "react-hook-form"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/ui/combobox"
import Title from "~/components/Title"
import Text from "~/components/Text"

type Options = {
  value: string
  label: string
}

type AddComboboxFieldProps = {
  control: Control<any>
  name: "category" | "area"
  label: string
  items: Options[]
  placeholder: string
  emptyMessage: string
}

function AddComboboxField({
  control,
  name,
  label,
  items,
  placeholder,
  emptyMessage,
}: AddComboboxFieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  const selectedItem =
    typeof field.value === "string"
      ? (items.find((item) => item.value === field.value) ?? null)
      : null

  return (
    <div className="space-y-2 md:space-y-4">
      <Title as={"h4"}>{label}</Title>

      <Combobox
        items={items}
        value={selectedItem}
        onValueChange={(item) => field.onChange(item?.value ?? "")}
      >
        <ComboboxInput
          aria-invalid={!!error}
          placeholder={placeholder}
          className="bg-white"
        />
        <ComboboxContent>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && (
        <Text as={"span"} className="text-destructive">
          {error.message}
        </Text>
      )}
    </div>
  )
}

export default memo(AddComboboxField)
