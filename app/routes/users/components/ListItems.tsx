import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import Text from "~/components/Text"
import { toast } from "sonner"

import {
  usePostUsersIdFollow,
  useDeleteUsersIdFollow,
} from "~/api/generated/endpoints/user/user"
import {
  useGetRecipes,
  useDeleteRecipesId,
  useDeleteRecipesIdFavorite,
} from "~/api/generated/endpoints/recipes/recipes"

function UserRecipePreviews({
  userId,
  totalRecipes,
}: {
  userId: string
  totalRecipes: number
}) {
  const { data: recipesData } = useGetRecipes(
    { authorId: userId, limit: 4 },
    { query: { enabled: totalRecipes > 0 } }
  )

  const previews =
    recipesData?.data?.map((r: any) => r.image?.phone || r.image?.original) ||
    []

  return (
    <div className="hidden flex-1 grid-cols-4 gap-2 md:grid lg:gap-4">
      {previews.map((src: string, i: number) => (
        <div
          key={i}
          className="aspect-square overflow-hidden rounded-xl bg-muted lg:rounded-2xl"
        >
          <img
            src={src}
            className="h-full w-full object-cover"
            alt="Recipe preview"
          />
        </div>
      ))}
    </div>
  )
}

export default function ListItems({
  items,
  type,
  isOwnProfile,
  currentTab,
  myFollowingIds = [],
  myId,
}: any) {
  const navigate = useNavigate()
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  const localItems = useMemo(() => {
    if (!items) return []
    return items
      .filter((item: any) => !deletedIds.includes(item.id || item._id))
      .map((item: any) => ({
        ...item,
        isFollowed: myFollowingIds.includes(item.id || item._id),
      }))
  }, [items, myFollowingIds, deletedIds])

  const deleteRecipe = useDeleteRecipesId()
  const removeFavorite = useDeleteRecipesIdFavorite()
  const followMutation = usePostUsersIdFollow()
  const unfollowMutation = useDeleteUsersIdFollow()

  const handleDeleteItem = async (itemId: string) => {
    const isFavoriteTab = currentTab === "my-favorites"
    const confirmMsg = isFavoriteTab
      ? "Remove this recipe from favorites?"
      : "Are you sure you want to delete this recipe?"

    if (!confirm(confirmMsg)) return

    if (isFavoriteTab) {
      removeFavorite.mutate(
        { id: itemId },
        {
          onSuccess: () => {
            setDeletedIds((prev) => [...prev, itemId])
            toast.success("Removed from favorites")
          },
          onError: () => toast.error("Failed to remove"),
        }
      )
    } else {
      deleteRecipe.mutate(
        { id: itemId },
        {
          onSuccess: () => {
            setDeletedIds((prev) => [...prev, itemId])
            toast.success("Recipe deleted")
          },
          onError: () => toast.error("Failed to delete"),
        }
      )
    }
  }

  const handleFollowToggle = async (
    id: string,
    currentlyFollowing: boolean
  ) => {
    if (currentlyFollowing) {
      unfollowMutation.mutate({ id })
    } else {
      followMutation.mutate({ id })
    }
  }

  if (!localItems || localItems.length === 0) {
    let emptyMessage = "Nothing found here yet."
    switch (currentTab) {
      case "my-recipes":
      case "my-favorites":
        emptyMessage = "Nothing has been added to your list yet."
        break
      case "followers":
        emptyMessage = "There are currently no followers on your account."
        break
      case "following":
        emptyMessage =
          "Your account currently has no subscriptions to other users."
        break
    }

    return (
      <div className="mx-auto max-w-[600px] py-20 text-center">
        <Text className="text-muted-foreground">{emptyMessage}</Text>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col divide-y divide-border">
      {localItems.map((item: any) => {
        const itemId = item.id || item._id
        if (type === "recipe" || currentTab === "my-favorites") {
          return (
            <div key={itemId} className="py-[20px] first:pt-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 lg:gap-[16px]">
                  <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[20px] bg-muted">
                    <img
                      src={item.image?.phone || item.image?.original}
                      className="h-full w-full object-cover"
                      alt={item.title}
                    />
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-2">
                    <Title as="h4" className="text-foreground">
                      {item.title}
                    </Title>
                    <Text className="line-clamp-2 text-muted-foreground">
                      {item.instructions}
                    </Text>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 pt-1 lg:gap-3">
                  <Link
                    to={`/recipe/${itemId}`}
                    className="group flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border transition-all hover:bg-dark lg:h-[42px] lg:w-[42px]"
                  >
                    <FIcon
                      iconName="arrow-up-right"
                      className="size-[16px] text-foreground transition-colors group-hover:text-white lg:size-[18px]"
                    />
                  </Link>
                  {isOwnProfile &&
                    (currentTab === "my-recipes" ||
                      currentTab === "my-favorites") && (
                      <Button
                        onClick={() => handleDeleteItem(itemId)}
                        disabled={
                          deleteRecipe.isPending || removeFavorite.isPending
                        }
                        className="group flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border bg-transparent p-0 transition-all hover:bg-dark lg:h-[42px] lg:w-[42px]"
                      >
                        <FIcon
                          iconName="trash"
                          className="size-[18px] text-foreground transition-colors group-hover:text-white"
                        />
                      </Button>
                    )}
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={itemId} className="py-[20px] first:pt-0">
            <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-[60px] lg:gap-[75px]">
              <div className="flex w-full items-start justify-start md:flex-1 md:items-center">
                <div className="flex items-center gap-[16px]">
                  <div
                    className="h-[60px] w-[60px] shrink-0 cursor-pointer overflow-hidden rounded-full bg-muted md:h-[85px] md:w-[85px]"
                    onClick={() => navigate(`/user/${itemId}`)}
                  >
                    <img
                      src={item.avatarURL || "/fallback_ava.png"}
                      className="h-full w-full object-cover"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Title
                      as="h4"
                      className="cursor-pointer text-foreground"
                      onClick={() => navigate(`/user/${itemId}`)}
                    >
                      {item.name}
                    </Title>
                    <Text className="text-muted-foreground">
                      Own recipes:{" "}
                      <Text as="span" className="font-bold text-foreground">
                        {item.totalRecipes || 0}
                      </Text>
                    </Text>
                    {itemId !== myId && (
                      <Button
                        onClick={() =>
                          handleFollowToggle(itemId, !!item.isFollowed)
                        }
                        disabled={
                          followMutation.isPending || unfollowMutation.isPending
                        }
                        className="mt-2 h-auto w-fit min-w-[130px] rounded-full border border-border bg-transparent px-[24px] py-[10px] text-[14px] text-foreground transition-colors hover:bg-dark hover:text-white"
                      >
                        {item.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden items-start md:flex md:flex-[3] md:gap-[60px] lg:gap-[75px]">
                <UserRecipePreviews
                  userId={itemId}
                  totalRecipes={item.totalRecipes || 0}
                />
                <Link
                  to={`/user/${itemId}`}
                  className="group flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border transition-all hover:bg-dark lg:h-[42px] lg:w-[42px]"
                >
                  <FIcon
                    iconName="arrow-up-right"
                    className="size-[16px] text-foreground transition-colors group-hover:text-white lg:size-[18px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
