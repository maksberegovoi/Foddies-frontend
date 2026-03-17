import { Button, buttonVariants } from "~/components/ui/button"
import type { Recipe } from "~/types/home"

import FIcon from "~/components/FIcon"
import { Link } from "react-router"
import { cn } from "~/lib/utils"

type RecipeItemProps = {
  item: Recipe
}

const RecipeItem = ({ item }: RecipeItemProps) => {
  const handleAddToFav = () => {
    // TODO: Add logic
  }

  return (
    <div className="flex flex-col gap-4">
      <img
        className="rounded-[30px]"
        src={item.image.tablet}
        alt={`${item.title} Image`}
      />

      <div className="flex flex-col gap-2">
        <h4 className="text-xl leading-6 font-extrabold uppercase">
          {item.title}
        </h4>
        <p className="line-clamp-2">{item.instructions}</p>
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
          <Button size="icon-lg" variant="outlineGray" onClick={handleAddToFav}>
            <FIcon className="size-4.5" iconName="heart" />
          </Button>

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
