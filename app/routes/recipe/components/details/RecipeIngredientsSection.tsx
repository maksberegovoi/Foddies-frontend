import type { RecipeDtoIngredientsItem } from "~/api/generated/model"
import Title from "~/components/Title"
import Text from "~/components/Text"

type RecipeIngredientsSectionProps = {
  ingredients: RecipeDtoIngredientsItem[]
}

export default function RecipeIngredientsSection({
  ingredients,
}: RecipeIngredientsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <Title as={"h4"}>INGREDIENTS</Title>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.name}>
              <div className="flex h-full items-center gap-2.5 p-2.5">
                <div className="flex h-full shrink-0 items-center justify-center rounded-lg border border-gray p-2.25 md:p-3.5">
                  <img
                    src={ingredient.imageURL}
                    alt={ingredient.name}
                    className="w-13.75 md:w-15"
                  />
                </div>

                <div className="min-w-0">
                  <Text className="text-dark">{ingredient.name}</Text>
                  <Text className="text-gray" title={ingredient.measure}>
                    {ingredient.measure}
                  </Text>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
