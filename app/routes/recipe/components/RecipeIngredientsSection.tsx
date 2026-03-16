import type { RecipeIngredient } from "../types"

type RecipeIngredientsSectionProps = {
  ingredients: RecipeIngredient[]
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
              <div className="flex items-center gap-2.5 p-2.5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-gray p-2">
                  <img
                    src={ingredient.imageURL}
                    alt={ingredient.name}
                    className="max-h-79.5 max-w-full object-contain md:max-h-100"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-dark md:text-base">
                    {ingredient.name}
                  </p>
                  <p
                    className="truncate text-sm text-gray md:text-base"
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
