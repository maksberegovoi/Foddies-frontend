import { memo } from "react"
import { useController, type Control } from "react-hook-form"

import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"

const MIN_COOKING_TIME = 1

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

  const decrease = () => {
    field.onChange(Math.max(MIN_COOKING_TIME, currentValue - 1))
  }

  const increase = () => {
    field.onChange(currentValue + 1)
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

        <p className="text-sm font-medium text-gray">{currentValue} min</p>

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
        <p className="text-sm text-destructive">{error.message as string}</p>
      ) : null}
    </div>
  )
}

export default memo(CookingTime)
