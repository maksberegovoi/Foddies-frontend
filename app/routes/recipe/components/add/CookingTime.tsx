import { memo, useState } from "react"
import { useController, type Control } from "react-hook-form"

import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"

const MIN_COOKING_TIME = 1
const COOKING_TIME_STEP = 5

type CookingTimeProps = {
  control: Control<any>
}

function CookingTime({ control }: CookingTimeProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name: "cookingTime", control })

  const currentValue =
    typeof field.value === "number" ? field.value : MIN_COOKING_TIME
  const [draftValue, setDraftValue] = useState(String(currentValue))
  const [isEditing, setIsEditing] = useState(false)
  const inputValue = isEditing ? draftValue : String(currentValue)

  const decrease = () => {
    if (currentValue <= COOKING_TIME_STEP) {
      field.onChange(MIN_COOKING_TIME)
      return
    }

    field.onChange(currentValue - COOKING_TIME_STEP)
  }

  const increase = () => {
    if (currentValue < COOKING_TIME_STEP) {
      field.onChange(COOKING_TIME_STEP)
      return
    }

    field.onChange(currentValue + COOKING_TIME_STEP)
  }

  const onInputChange = (value: string) => {
    if (value === "") {
      setDraftValue("")
      return
    }

    if (!/^\d+$/.test(value)) {
      return
    }

    setDraftValue(value)
    field.onChange(Math.max(MIN_COOKING_TIME, Number(value)))
  }

  const onInputBlur = () => {
    const parsedValue = Number.parseInt(draftValue, 10)
    const nextValue = Number.isFinite(parsedValue)
      ? Math.max(MIN_COOKING_TIME, parsedValue)
      : currentValue

    field.onChange(nextValue)
    setDraftValue(String(nextValue))
    setIsEditing(false)
  }

  const onInputFocus = () => {
    setIsEditing(true)
    setDraftValue(String(currentValue))
  }

  return (
    <div className="space-y-2">
      <p className="text-base font-extrabold text-dark uppercase">
        Cooking time
      </p>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          aria-label="Decrease cooking time"
          variant="outlineGray"
          size="icon-lg"
          className="size-12.5 rounded-full"
          onClick={decrease}
        >
          <FIcon iconName="minus" className="size-4 text-dark" />
        </Button>

        <div className="flex items-baseline text-sm font-medium text-gray">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Cooking time in minutes"
            value={inputValue}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onChange={(event) => onInputChange(event.target.value)}
            style={{ width: `${Math.max(inputValue.length, 1)}ch` }}
            className="bg-transparent p-0 text-right text-sm font-medium text-gray outline-none"
          />
          <span className="ml-1">min</span>
        </div>

        <Button
          type="button"
          aria-label="Increase cooking time"
          variant="outlineGray"
          size="icon-lg"
          className="size-12.5 rounded-full"
          onClick={increase}
        >
          <FIcon iconName="plus" className="size-4 text-dark" />
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
    </div>
  )
}

export default memo(CookingTime)
