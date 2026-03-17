import {
  getGetRecipesFavoriteQueryKey,
  useDeleteRecipesIdFavorite,
  useGetRecipesFavorite,
  usePostRecipesIdFavorite,
} from "~/api/generated/endpoints/recipes/recipes"
import type {
  GetRecipesFavorite200,
  RecipeCardDto,
} from "~/api/generated/model"
import { queryClient } from "~/api/query-client"

const favoriteQueryKey = getGetRecipesFavoriteQueryKey()

function getFavoritesSnapshot() {
  return queryClient.getQueryData<GetRecipesFavorite200>(favoriteQueryKey)
}

function restoreFavoritesSnapshot(snapshot?: GetRecipesFavorite200) {
  queryClient.setQueryData(favoriteQueryKey, snapshot)
}

function addRecipeToFavoritesCache(recipe: RecipeCardDto) {
  queryClient.setQueryData<GetRecipesFavorite200>(
    favoriteQueryKey,
    (current) => {
      if (!current) {
        return current
      }

      const alreadyExists = current.data.some((item) => item.id === recipe.id)

      if (alreadyExists) {
        return current
      }

      return {
        ...current,
        data: [recipe, ...current.data],
      }
    }
  )
}

function removeRecipeFromFavoritesCache(recipeId: string) {
  queryClient.setQueryData<GetRecipesFavorite200>(
    favoriteQueryKey,
    (current) => {
      if (!current) {
        return current
      }

      return {
        ...current,
        data: current.data.filter((item) => item.id !== recipeId),
      }
    }
  )
}

type FavoriteRecipeToggleRenderProps = {
  isFavorite: boolean
  isMutating: boolean
  toggleFavorite: () => void
}

type FavoriteRecipeToggleProps = {
  recipe: RecipeCardDto
  children: (props: FavoriteRecipeToggleRenderProps) => React.ReactNode
}

export default function FavoriteRecipeToggle({
  recipe,
  children,
}: FavoriteRecipeToggleProps) {
  const { mutate: addFavorite, isPending: isAdding } =
    usePostRecipesIdFavorite()
  const { mutate: removeFavorite, isPending: isRemoving } =
    useDeleteRecipesIdFavorite()
  const { data: favoriteRecipesData } = useGetRecipesFavorite()

  const isFavorite =
    favoriteRecipesData?.data.some((favorite) => favorite.id === recipe.id) ||
    false
  const isMutating = isAdding || isRemoving

  const toggleFavorite = () => {
    const previousFavorites = getFavoritesSnapshot()

    if (isFavorite) {
      removeRecipeFromFavoritesCache(recipe.id)
      removeFavorite(
        { id: recipe.id },
        {
          onError: () => {
            restoreFavoritesSnapshot(previousFavorites)
          },
        }
      )

      return
    }

    addRecipeToFavoritesCache(recipe)
    addFavorite(
      { id: recipe.id },
      {
        onError: () => {
          restoreFavoritesSnapshot(previousFavorites)
        },
      }
    )
  }

  return children({ isFavorite, isMutating, toggleFavorite })
}
