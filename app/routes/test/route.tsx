// import {
//   getGetIngredientsQueryKey,
//   getIngredients,
//   useGetIngredients,
// } from "~/api/generated/endpoints/ingredients/ingredients"
import { queryClient } from "~/api/query-client"
import type { Route } from "./+types/route"
import {
  getGetRecipesQueryKey,
  getRecipes,
  useGetRecipes,
} from "~/api/generated/endpoints/recipes/recipes"
import type { RecipesQueryDto } from "~/api/generated/model"
import { useState } from "react"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryKey = getGetRecipesQueryKey()

  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: () => getRecipes(),
  })
}

export default function TestRoute() {
  const [page, setPage] = useState(1)
  const params: RecipesQueryDto = {
    page: page,
  }
  const { data: res } = useGetRecipes(params)
  const recipes = res?.data || []

  return (
    <div>
      <h1>Recipes</h1>
      <button onClick={() => setPage(page + 1)}>next</button>
      <button onClick={() => setPage(page - 1)}>prev</button>
      {recipes.map((i) => (
        <p key={i.id}>{i.title}</p>
      ))}
    </div>
  )
}

// export default function TestRoute() {
//   const { data: res } = useGetIngredients()
//   const ingredients = res?.data || []
//
//   return (
//     <div>
//       <h1>Ingredients</h1>
//       {ingredients.map((i) => (
//         <p key={i.id}>{i.name}</p>
//       ))}
//     </div>
//   )
// }
