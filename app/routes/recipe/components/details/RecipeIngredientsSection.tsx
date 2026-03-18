import type { RecipeDtoIngredientsItem } from "~/api/generated/model"

type RecipeIngredientsSectionProps = {
  ingredients: RecipeDtoIngredientsItem[]
}

export default function RecipeIngredientsSection({
  ingredients,
}: RecipeIngredientsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-extrabold">INGREDIENTS</h2>

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
                  <p className="text-sm font-medium text-dark md:text-base">
                    {ingredient.name}
                  </p>
                  <p
                    className="truncate text-sm font-medium text-gray md:text-base"
                    title={ingredient.measure}
                  >
                    {ingredient.measure}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
