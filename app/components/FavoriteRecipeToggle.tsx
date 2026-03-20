import {
  getGetRecipesFavoriteQueryKey,
  useDeleteRecipesIdFavorite,
  useGetRecipesFavorite,
  usePostRecipesIdFavorite,
} from "~/api/generated/endpoints/recipes/recipes"
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"
import { useModal } from "~/components/modals/modal-context"
import type {
  GetRecipesFavorite200,
  RecipeCardDto,
} from "~/api/generated/model"
import { queryClient } from "~/api/query-client"
import { toast } from "sonner"

const favoriteQueryKey = getGetRecipesFavoriteQueryKey()

function createFavoritesSnapshot(data: RecipeCardDto[]): GetRecipesFavorite200 {
  const total = data.length

  return {
    data,
    meta: {
      total,
      page: 1,
      limit: Math.max(1, total),
    },
  }
}

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
      const nextCurrent = current ?? createFavoritesSnapshot([])

      const alreadyExists = nextCurrent.data.some(
        (item) => item.id === recipe.id
      )

      if (alreadyExists) {
        return nextCurrent
      }

      const nextData = [recipe, ...nextCurrent.data]

      return {
        ...nextCurrent,
        data: nextData,
        meta: {
          ...nextCurrent.meta,
          total: nextData.length,
        },
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

      const nextData = current.data.filter((item) => item.id !== recipeId)
      const wasRemoved = nextData.length !== current.data.length

      return {
        ...current,
        data: nextData,
        meta: {
          ...current.meta,
          total: wasRemoved ? nextData.length : current.meta.total,
        },
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
  const isSignedIn = useIsSignedIn()
  const { openSignIn } = useModal()
  const { mutate: addFavorite, isPending: isAdding } =
    usePostRecipesIdFavorite()
  const { mutate: removeFavorite, isPending: isRemoving } =
    useDeleteRecipesIdFavorite()
  const { data: favoriteRecipesData } = useGetRecipesFavorite(undefined, {
    query: {
      enabled: isSignedIn,
    },
  })

  const isFavorite =
    favoriteRecipesData?.data.some((favorite) => favorite.id === recipe.id) ||
    false
  const isMutating = isAdding || isRemoving

  const toggleFavorite = () => {
    if (!isSignedIn) {
      openSignIn()

      return
    }

    const previousFavorites = getFavoritesSnapshot()

    if (isFavorite) {
      removeRecipeFromFavoritesCache(recipe.id)
      removeFavorite(
        { id: recipe.id },
        {
          onError: () => {
            restoreFavoritesSnapshot(previousFavorites)
            toast.error("Failed to remove from favorites.")
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
          toast.error(
            "Could not add to favorites. The recipe might have been removed."
          )
        },
      }
    )
  }

  return children({ isFavorite, isMutating, toggleFavorite })
}
