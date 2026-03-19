import { memo, useMemo, useState } from "react"
import { useController, useFieldArray, type Control } from "react-hook-form"

import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
} from "~/components/ui/combobox"
import { Input } from "~/components/ui/input"
import VirtualizedComboboxList from "~/components/ui/VirtualizedComboboxList"

import { useGetIngredients } from "~/api/generated/endpoints/ingredients/ingredients"
import Title from "~/components/Title"
import Text from "~/components/Text"

type IngredientFormValue = {
  ingredientId: string
  name: string
  imageURL: string
  measure: string
}

type IngredientsFormValues = {
  ingredients: IngredientFormValue[]
}

type IngredientsProps = {
  control: Control<any>
}

function Ingredients({ control }: IngredientsProps) {
  const { data } = useGetIngredients()
  const availableIngredients = useMemo(() => data?.data || [], [data])
  const {
    fieldState: { error },
  } = useController<IngredientsFormValues>({
    name: "ingredients",
    control,
  })

  const { fields, append, remove } = useFieldArray<IngredientsFormValues>({
    control,
    name: "ingredients",
  })

  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [ingredientQuery, setIngredientQuery] = useState("")
  const [quantity, setQuantity] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)

  const ingredientNames = useMemo(
    () => availableIngredients.map((ingredient) => ingredient.name),
    [availableIngredients]
  )

  const filteredIngredientNames = useMemo(() => {
    const normalizedQuery = ingredientQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return ingredientNames
    }

    return ingredientNames.filter((name) =>
      name.toLowerCase().includes(normalizedQuery)
    )
  }, [ingredientNames, ingredientQuery])

  const addIngredient = () => {
    const selectedOption = availableIngredients.find(
      (ingredient) => ingredient.name === selectedIngredient
    )

    const trimmedQuantity = quantity.trim()

    if (!trimmedQuantity && selectedOption) {
      setLocalError("Please enter quantity")
      return
    }

    const hasDuplicate = fields.some(
      (ingredient) => ingredient.ingredientId === selectedOption?.id
    )

    if (hasDuplicate) {
      setLocalError("This ingredient is already added")
      return
    }
    if (selectedOption) {
      append({
        ingredientId: selectedOption.id,
        name: selectedOption.name,
        imageURL: selectedOption.imageURL,
        measure: trimmedQuantity,
      })
    }

    setSelectedIngredient("")
    setIngredientQuery("")
    setQuantity("")
    setLocalError(null)
  }

  const ingredientsError =
    typeof error?.message === "string" ? error.message : undefined

  return (
    <section className="space-y-5">
      <Title as={"h4"}>Ingredients</Title>

      <div className="grid gap-4 md:grid-cols-[274px_250px] md:items-end md:justify-start">
        <Combobox
          items={filteredIngredientNames}
          value={selectedIngredient}
          onInputValueChange={setIngredientQuery}
          onValueChange={(value) => {
            setSelectedIngredient(value ?? "")
            if (localError) {
              setLocalError(null)
            }
          }}
        >
          <ComboboxInput
            placeholder="Add the ingredient"
            aria-invalid={!!localError || !!ingredientsError}
            className="bg-white"
          />
          <ComboboxContent>
            <ComboboxEmpty>No ingredients found.</ComboboxEmpty>
            <VirtualizedComboboxList items={filteredIngredientNames} />
          </ComboboxContent>
        </Combobox>

        <Input
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value)
            if (localError) {
              setLocalError(null)
            }
          }}
          placeholder="Enter quantity"
          aria-invalid={!!localError || !!ingredientsError}
          className="h-auto rounded-none border-x-0 border-t-0 border-b border-gray bg-transparent px-0 py-2 text-dark placeholder:text-gray focus-visible:border-gray focus-visible:ring-0"
        />
      </div>

      <Button type="button" variant="outlineGray" onClick={addIngredient}>
        ADD INGREDIENT
        <FIcon iconName="plus" className="size-5" />
      </Button>

      {localError && <Text className="text-destructive">{localError}</Text>}
      {ingredientsError && (
        <Text className="text-destructive">{ingredientsError}</Text>
      )}

      {fields.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {fields.map((item, index) => (
            <li key={item.id}>
              <div className="flex gap-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex shrink-0 items-center justify-center rounded-lg border border-gray p-2.25 md:p-3.5">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-13.75 md:w-15"
                    />
                  </div>

                  <div className="min-w-0">
                    <Text as={"span"} title={item.name} className="text-dark">
                      {item.name}
                    </Text>
                    <Text
                      as={"span"}
                      className="text-gray"
                      title={item.measure}
                    >
                      {item.measure}
                    </Text>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-6 w-6 shrink-0 rounded-full border-0 p-0 hover:bg-transparent"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => remove(index)}
                >
                  <FIcon iconName="close-x" className="size-4 text-dark" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default memo(Ingredients)
