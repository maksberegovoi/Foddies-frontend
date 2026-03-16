import type { Route } from "./+types/details"
import { Button } from "~/components/ui/button"
import PopularRecipesSection from "./components/PopularRecipesSection"
import RecipeImage from "./components/RecipeImage"
import RecipeIngredientsSection from "./components/RecipeIngredientsSection"
import RecipePreparationSection from "./components/RecipePreparationSection"
import RecipeSummarySection from "./components/RecipeSummarySection"
import type { RecipeDetails } from "./types"
import type { Recipe } from "~/types/home/category.interfaces"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    // TODO: replace with real API call
    const [data, popular] = await Promise.all([
      fetch("http://localhost:3000/api/v1/recipes/" + params.id),
      fetch("http://localhost:3000/api/v1/recipes/popular"),
    ])

    if (!data.ok || !popular.ok) {
      return {
        recipe: null,
        popularRecipes: null,
      }
    }

    const recipe: { data?: RecipeDetails } = await data.json()
    const popularRecipes: { data?: Recipe[] } = await popular.json()

    return {
      recipe: recipe.data ?? null,
      popularRecipes: popularRecipes.data ?? null,
    }
  } catch {
    return {
      recipe: null,
      popularRecipes: null,
    }
  }
}

export default function Details({ loaderData }: Route.ComponentProps) {
  const recipe = loaderData.recipe
  const popularRecipes = loaderData.popularRecipes

  if (!recipe) {
    return (
      <div className="px-4 md:px-8 lg:px-20">
        <p className="text-sm text-light-dark md:text-base">
          Recipe details are unavailable right now.
        </p>
      </div>
    )
  }

  const onAddToFavorites = () => {
    console.log("Add to favorites:", recipe.id)
  }

  return (
    <div className="mx-auto flex w-full max-w-mobile flex-col gap-8 px-4 md:max-w-tablet md:gap-10 md:px-8 lg:grid lg:max-w-desktop lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:px-20">
      <div>
        <RecipeImage image={recipe.image} title={recipe.title} />
      </div>

      <div className="flex flex-col gap-8 md:gap-10">
        <RecipeSummarySection recipe={recipe} />
        <RecipeIngredientsSection ingredients={recipe.ingredients} />
        <RecipePreparationSection instructions={recipe.instructions} />

        <Button
          className="self-start"
          variant="outlineGray"
          onClick={onAddToFavorites}
        >
          ADD TO FAVORITES
        </Button>
      </div>
      {popularRecipes ? (
        <PopularRecipesSection popularRecipes={popularRecipes} />
      ) : null}
    </div>
  )
}
