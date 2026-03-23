import { Link, NavLink } from "react-router"

import { cn } from "~/lib/utils"
import Title from "~/components/Title"
import Text from "~/components/Text"
import FIcon from "~/components/FIcon"
import { Button, buttonVariants } from "~/components/ui/button"
import FavoriteRecipeToggle from "~/components/FavoriteRecipeToggle"
import type { RecipeCardDto } from "~/api/generated/model/recipeCardDto"

type RecipeItemProps = {
  item: RecipeCardDto
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
        <Text className="line-clamp-2 h-10 md:h-13.5">{item.instructions}</Text>
      </div>

      <div className="flex justify-between">
        <NavLink
          to={`/user/${item.ownerId}`}
          className="flex items-center gap-2"
        >
          <img
            src={item.ownerAvatarURL || "/fallback_ava.webp"}
            alt="Owner Avatar"
            className="size-10 rounded-full"
          />
          <Text as="span" className="font-semibold">
            {item.ownerName}
          </Text>
        </NavLink>

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
