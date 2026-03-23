import type { GetRecipesParams } from "~/api/generated/model"
import {
  getGetRecipesQueryKey,
  useDeleteRecipesId,
  useGetRecipes,
} from "~/api/generated/endpoints/recipes/recipes"
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

type MyRecipesTabProps = {
  profileId: string
  isOwnProfile: boolean
}

const RECIPE_ITEMS_PER_PAGE = 9

export default function MyRecipesTab({
  profileId,
  isOwnProfile,
}: MyRecipesTabProps) {
  const { page, setPage } = useTabPage()

  const recipesParams = {
    authorId: profileId,
    page,
    limit: RECIPE_ITEMS_PER_PAGE,
  } satisfies GetRecipesParams

  const { data: recipesResponse } = useGetRecipes(recipesParams, {
    query: {
      placeholderData: (previousData) => previousData,
    },
  })
  const deleteRecipe = useDeleteRecipesId()
  const items = recipesResponse?.data || []
  const meta = recipesResponse?.meta
  const totalPages = getTotalPages(meta)
  const recipesQueryKey = getGetRecipesQueryKey(recipesParams)

  useResetPageOnOutOfRange(page, totalPages, meta, setPage)

  const handleDeleteRecipe = async (itemId: string) => {
    await queryClient.cancelQueries({ queryKey: recipesQueryKey })

    const previousRecipes = queryClient.getQueryData(recipesQueryKey)

    queryClient.setQueryData(recipesQueryKey, (oldData: any) => ({
      ...oldData,
      data: (oldData?.data || []).filter(
        (recipe: any) => (recipe.id || recipe._id) !== itemId
      ),
    }))

    try {
      await deleteRecipe.mutateAsync({ id: itemId })
      toast.success("Recipe deleted")
    } catch {
      queryClient.setQueryData(recipesQueryKey, previousRecipes)
      throw new Error("Delete recipe failed")
    } finally {
      queryClient.invalidateQueries({ queryKey: recipesQueryKey })
    }
  }

  return (
    <>
      {items.length === 0 ? (
        <TabEmptyState currentTab="my-recipes" />
      ) : (
        <RecipeListItems
          items={items}
          isOwnProfile={isOwnProfile}
          currentTab="my-recipes"
          onDeleteRecipe={handleDeleteRecipe}
          isDeleting={deleteRecipe.isPending}
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
