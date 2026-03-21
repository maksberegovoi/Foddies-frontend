import type { Route } from "./+types/details"
import {
  PopularRecipesSection,
  RecipeImage,
  RecipeIngredientsSection,
  RecipePreparationSection,
  RecipeSummarySection,
} from "./components"
import { queryClient } from "~/api/query-client"
import {
  getGetRecipesIdQueryKey,
  getRecipesId,
  useGetRecipesId,
} from "~/api/generated/endpoints/recipes/recipes"
import FavoriteRecipeToggle from "~/components/FavoriteRecipeToggle"
import { Button } from "~/components/ui/button"
import Text from "~/components/Text"
import { withErrorHandling } from "~/lib/api-error-handler"
import PathInfo from "~/components/PathInfo"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const recipeId = params.id
  const queryKey = getGetRecipesIdQueryKey(recipeId)

  await withErrorHandling(
    queryClient.ensureQueryData({
      queryKey,
      queryFn: () => getRecipesId(recipeId),
    })
  )
}

export default function Details({ params }: Route.ComponentProps) {
  const { data } = useGetRecipesId(params.id)
  const recipe = data?.data

  //TODO: delete
  if (!recipe) {
    return (
      <div className="px-4 md:px-8 lg:px-20">
        <Text>Recipe details are unavailable right now.</Text>
      </div>
    )
  }

  return (
    <>
      <PathInfo currentPageName="recipe" />
      <div className="flex flex-col gap-10">
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <RecipeImage image={recipe.image} title={recipe.title} />

          <div className="flex flex-col gap-8 md:gap-10">
            <RecipeSummarySection recipe={recipe} />
            <RecipeIngredientsSection ingredients={recipe.ingredients} />
            <RecipePreparationSection instructions={recipe.instructions} />

            <FavoriteRecipeToggle recipe={recipe}>
              {({ isFavorite, isMutating, toggleFavorite }) => (
                <Button
                  className="self-start"
                  variant={isFavorite ? "default" : "outlineGray"}
                  onClick={toggleFavorite}
                  disabled={isMutating}
                >
                  {isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
                </Button>
              )}
            </FavoriteRecipeToggle>
          </div>

          <PopularRecipesSection />
        </div>
      </div>
    </>
  )
}
