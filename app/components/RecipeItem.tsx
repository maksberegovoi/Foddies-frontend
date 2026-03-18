import { Button, buttonVariants } from "~/components/ui/button"
import type { Recipe } from "~/types/home"

import FIcon from "~/components/FIcon"
import FavoriteRecipeToggle from "~/components/FavoriteRecipeToggle"
import { Link } from "react-router"
import { cn } from "~/lib/utils"
import Title from "~/components/Title"

type RecipeItemProps = {
  item: Recipe
}

const RecipeItem = ({ item }: RecipeItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <img
        className="h-68.75 rounded-[30px]"
        src={item.image.tablet}
        alt={`${item.title} Image`}
      />

      <div className="flex flex-col gap-2">
        <Title as={"h4"} className={"line-clamp-1"}>
          {item.title}
        </Title>
        <p className="line-clamp-2 h-13.5">{item.instructions}</p>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={item.ownerAvatarURL || "/fallback_ava.png"}
            alt="Owner Avatar"
            className="size-10 rounded-full"
          />
          <span className="font-semibold">{item.ownerName}</span>
        </div>

        <div className="flex gap-1">
          <FavoriteRecipeToggle recipe={item}>
            {({ isFavorite, isMutating, toggleFavorite }) => (
              <Button
                size="icon-lg"
                variant={isFavorite ? "default" : "outlineGray"}
                onClick={toggleFavorite}
                disabled={isMutating}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <FIcon className="size-4.5" iconName="heart" />
              </Button>
            )}
          </FavoriteRecipeToggle>

          <Link
            to={`/recipe/${item.id}`}
            className={cn(
              buttonVariants({
                variant: "outlineGray",
                size: "icon-lg",
              })
            )}
          >
            <FIcon className="size-4.5" iconName="arrow-up-right" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeItem
