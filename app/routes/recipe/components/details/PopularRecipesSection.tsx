import RecipeItem from "~/components/RecipeItem"

import { useGetRecipesPopular } from "~/api/generated/endpoints/recipes/recipes"
import Title from "~/components/Title"

export default function PopularRecipesSection() {
  const { data } = useGetRecipesPopular()
  const popularRecipes = data?.data || []

  return (
    <section className="flex flex-col gap-5 lg:col-span-2">
      <Title as={"h3"}>POPULAR RECIPES</Title>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {popularRecipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeItem item={recipe} />
          </li>
        ))}
      </ul>
    </section>
  )
}
