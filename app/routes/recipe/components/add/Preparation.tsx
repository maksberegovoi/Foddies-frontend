import { useController, type Control } from "react-hook-form"
import ControlledTextareaField from "./TextareaField"

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
    <section className="space-y-5">
      <p className="text-base font-extrabold text-dark uppercase">
        Recipe Preparation
      </p>
      <ControlledTextareaField
        field={preparationField}
        error={preparationError}
        placeholder="Enter preparation steps"
        maxLength={PREPARATION_MAX}
        showCounter
      />
      {preparationError ? (
        <p className="text-sm text-destructive">
          {preparationError.message as string}
        </p>
      ) : null}
    </section>
  )
}
