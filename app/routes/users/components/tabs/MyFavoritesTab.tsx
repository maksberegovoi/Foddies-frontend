import type { GetRecipesFavoriteParams } from "~/api/generated/model"
import {
  getGetRecipesFavoriteQueryKey,
  useDeleteRecipesIdFavorite,
  useGetRecipesFavorite,
} from "~/api/generated/endpoints/recipes/recipes"
import { getGetUsersCurrentQueryKey } from "~/api/generated/endpoints/user/user"
import RecipeListItems from "../RecipeListItems"
import TabEmptyState from "../TabEmptyState"
import { queryClient } from "~/api/query-client"
import { toast } from "sonner"
import TabPagination from "./TabPagination"
import {
  getTotalPages,
  useResetPageOnOutOfRange,
  useTabPage,
} from "./useTabPagination"

type MyFavoritesTabProps = {
  isOwnProfile: boolean
}

const RECIPE_ITEMS_PER_PAGE = 9

export default function MyFavoritesTab({ isOwnProfile }: MyFavoritesTabProps) {
  const { page, setPage } = useTabPage()

  const favoritesParams = {
    page,
    limit: RECIPE_ITEMS_PER_PAGE,
  } satisfies GetRecipesFavoriteParams

  const { data: favoritesResponse } = useGetRecipesFavorite(favoritesParams, {
    query: {
      enabled: isOwnProfile,
      placeholderData: (previousData) => previousData,
    },
  })
  const removeFavorite = useDeleteRecipesIdFavorite()

  const items = isOwnProfile ? favoritesResponse?.data || [] : []
  const meta = favoritesResponse?.meta
  const totalPages = getTotalPages(meta)
  const favoritesQueryKey = getGetRecipesFavoriteQueryKey(favoritesParams)

  useResetPageOnOutOfRange(page, totalPages, meta, setPage)

  const handleRemoveFavorite = async (itemId: string) => {
    await queryClient.cancelQueries({ queryKey: favoritesQueryKey })

    const previousFavorites = queryClient.getQueryData(favoritesQueryKey)

    queryClient.setQueryData(favoritesQueryKey, (oldData: any) => ({
      ...oldData,
      data: (oldData?.data || []).filter(
        (recipe: any) => (recipe.id || recipe._id) !== itemId
      ),
    }))

    try {
      await removeFavorite.mutateAsync({ id: itemId })
      toast.success("Removed from favorites")
    } catch {
      queryClient.setQueryData(favoritesQueryKey, previousFavorites)
      throw new Error("Remove favorite failed")
    } finally {
      queryClient.invalidateQueries({
        queryKey: getGetRecipesFavoriteQueryKey(),
      })
      queryClient.invalidateQueries({ queryKey: getGetUsersCurrentQueryKey() })
    }
  }

  if (!isOwnProfile) {
    return null
  }

  return (
    <>
      {items.length === 0 ? (
        <TabEmptyState currentTab="my-favorites" />
      ) : (
        <RecipeListItems
          items={items}
          isOwnProfile={true}
          currentTab="my-favorites"
          onRemoveFavorite={handleRemoveFavorite}
          isDeleting={removeFavorite.isPending}
        />
      )}

      <TabPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
