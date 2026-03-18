import RecipeItem from "~/components/RecipeItem"

import { useGetRecipesPopular } from "~/api/generated/endpoints/recipes/recipes"

export default function PopularRecipesSection() {
  const { data } = useGetRecipesPopular()
  const popularRecipes = data?.data || []

  return (
    <section className="flex flex-col gap-5 lg:col-span-2">
      <h2 className="font-extrabold">POPULAR RECIPES</h2>
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
