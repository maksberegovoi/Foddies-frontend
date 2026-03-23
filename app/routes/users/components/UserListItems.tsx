import { useMemo } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import Text from "~/components/Text"
import { toast } from "sonner"
import { useGetRecipes } from "~/api/generated/endpoints/recipes/recipes"

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
    recipesData?.data?.map(
      (recipe: any) => recipe.image?.phone || recipe.image?.original
    ) || []

  return (
    <div className="hidden flex-1 grid-cols-4 gap-2 md:grid lg:gap-4">
      {previews.map((src: string, index: number) => (
        <div
          key={index}
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

type UserListItemsProps = {
  items: any[]
  myId: string | null
  onFollowToggle?: (id: string, currentlyFollowing: boolean) => Promise<void>
  isUpdatingFollow?: boolean
}

export default function UserListItems({
  items,
  myId,
  onFollowToggle,
  isUpdatingFollow = false,
}: UserListItemsProps) {
  const navigate = useNavigate()

  const localItems = useMemo(
    () =>
      items.map((item: any) => ({
        ...item,
        isFollowed: !!item.isFollowing || !!item.isFollowed,
      })),
    [items]
  )

  const handleFollowClick = async (id: string, currentlyFollowing: boolean) => {
    try {
      await onFollowToggle?.(id, currentlyFollowing)
    } catch {
      toast.error("Action failed")
    }
  }

  return (
    <div className="flex w-full flex-col divide-y divide-border">
      {localItems.map((item: any) => {
        const itemId = item.id || item._id

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
                          handleFollowClick(itemId, !!item.isFollowed)
                        }
                        disabled={isUpdatingFollow}
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
