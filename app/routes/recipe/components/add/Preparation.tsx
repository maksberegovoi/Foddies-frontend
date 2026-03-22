import { useController, type Control } from "react-hook-form"
import ControlledTextareaField from "./TextareaField"
import Title from "~/components/Title"
import Text from "~/components/Text"

const PREPARATION_MAX = 1000

type PreparationProps = {
  control: Control<any>
}

export default function Preparation({ control }: PreparationProps) {
  const {
    field: preparationField,
    fieldState: { error: preparationError },
  } = useController({ name: "preparation", control })

  return (
    <section className="space-y-8 md:space-y-10">
      <Title as={"h4"}>Recipe Preparation</Title>
      <ControlledTextareaField
        field={preparationField}
        error={preparationError}
        placeholder="Enter preparation steps"
        maxLength={PREPARATION_MAX}
        showCounter
      />
      {preparationError && (
        <Text as={"span"} className="text-destructive">
          {preparationError.message}
        </Text>
      )}
    </section>
  )
}
