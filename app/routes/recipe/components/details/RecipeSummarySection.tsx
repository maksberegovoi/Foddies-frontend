import type { RecipeDto } from "~/api/generated/model"
import { Badge } from "~/components/ui/badge"
import Title from "~/components/Title"
import Text from "~/components/Text"

type RecipeSummarySectionProps = {
  recipe: RecipeDto
}

export default function RecipeSummarySection({
  recipe,
}: RecipeSummarySectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <Title as={"h3"}>{recipe.title.toUpperCase()}</Title>

      <ul className="flex flex-wrap gap-2">
        <li>
          <Badge variant="outline">{recipe.category}</Badge>
        </li>
        <li>
          <Badge variant="outline">{recipe.time} min</Badge>
        </li>
      </ul>

      <Text>{recipe.description}</Text>

      <div className="flex items-center gap-3">
        <img
          className="size-8 rounded-full md:size-12.5"
          src={recipe.ownerAvatarURL || "/fallback_ava.webp"}
          alt=""
        />
        <div className="flex flex-col">
          <Text
            as={"span"}
            className="text-xs font-medium text-gray md:text-sm"
          >
            Created by:
          </Text>
          <Text as={"span"} className="font-bold text-dark">
            {recipe.ownerName}
          </Text>
        </div>
      </div>
    </section>
  )
}
