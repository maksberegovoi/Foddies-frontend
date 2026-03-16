import { Badge } from "~/components/ui/badge"

import type { RecipeDetails } from "../types"

type RecipeSummarySectionProps = {
  recipe: RecipeDetails
}

export default function RecipeSummarySection({
  recipe,
}: RecipeSummarySectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-extrabold">{recipe.title.toUpperCase()}</h1>

      <ul className="flex flex-wrap gap-2">
        <li>
          <Badge variant="outline">{recipe.category}</Badge>
        </li>
        <li>
          <Badge variant="outline">{recipe.time}</Badge>
        </li>
      </ul>

      <p className="text-sm text-light-dark md:text-base">
        {recipe.description}
      </p>

      <div className="flex items-center gap-3">
        <img
          className="size-8 rounded-full md:size-12.5"
          src={recipe.ownerAvatarURL || "/fallback_ava.png"}
          alt=""
        />
        <div className="flex flex-col text-gray">
          <p className="text-xs font-medium md:text-sm">Created by:</p>
          <p className="text-sm font-bold text-dark md:text-base">
            {recipe.ownerName}
          </p>
        </div>
      </div>
    </section>
  )
}
