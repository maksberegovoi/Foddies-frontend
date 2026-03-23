import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import Text from "~/components/Text"
import { toast } from "sonner"

type RecipeListItemsProps = {
  items: any[]
  isOwnProfile: boolean
  currentTab: "my-recipes" | "my-favorites"
  onDeleteRecipe?: (id: string) => Promise<void>
  onRemoveFavorite?: (id: string) => Promise<void>
  isDeleting?: boolean
}

export default function RecipeListItems({
  items,
  isOwnProfile,
  currentTab,
  onDeleteRecipe,
  onRemoveFavorite,
  isDeleting = false,
}: RecipeListItemsProps) {
  const handleDeleteItem = async (itemId: string) => {
    const isFavoriteTab = currentTab === "my-favorites"
    const confirmMsg = isFavoriteTab
      ? "Remove this recipe from favorites?"
      : "Are you sure you want to delete this recipe?"

    if (!confirm(confirmMsg)) return

    if (isFavoriteTab) {
      try {
        await onRemoveFavorite?.(itemId)
      } catch {
        toast.error("Failed to remove")
      }
      return
    }

    try {
      await onDeleteRecipe?.(itemId)
    } catch {
      toast.error("Failed to delete")
    }
  }

  return (
    <div className="flex w-full flex-col divide-y divide-border">
      {items.map((item: any) => {
        const itemId = item.id || item._id
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
                {isOwnProfile && (
                  <Button
                    onClick={() => handleDeleteItem(itemId)}
                    disabled={isDeleting}
                    className="group flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border bg-transparent p-0 transition-all hover:bg-dark lg:h-[42px] lg:w-[42px]"
                  >
                    <FIcon
                      iconName="trash"
                      className="size-[30px] text-foreground transition-colors group-hover:text-white"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
