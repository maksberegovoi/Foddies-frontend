import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"

import { Button } from "~/components/ui/button"
import {
  Area,
  Category,
  CookingTime,
  Details,
  ImageInput,
  Ingredients,
  Preparation,
} from "./components"
import FIcon from "~/components/FIcon"

import { usePostRecipes } from "~/api/generated/endpoints/recipes/recipes"

import type { PostRecipesBody } from "~/api/generated/model"
import { recipeSchema } from "./validation"
import type { AddRecipeFormValues } from "./validation"

export default function AddRecipe() {
  const navigate = useNavigate()
  const { mutate: postRecipes } = usePostRecipes()

  const methods = useForm<AddRecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      area: "",
      ingredients: [],
      cookingTime: 10,
      preparation: "",
    },
  })

  const onSubmit = (data: AddRecipeFormValues) => {
    const payload: PostRecipesBody = {
      title: data.title,
      description: data.description,
      instructions: data.preparation,
      time: data.cookingTime,
      categoryId: data.category,
      areaId: data.area,
      ingredients: JSON.stringify(
        data.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          measure: ingredient.measure,
        }))
      ),
      image: data.file[0],
    }

    postRecipes(
      {
        data: payload,
      },
      {
        onSuccess: (response) => {
          const recipeId = response?.data?.id

          if (recipeId) {
            navigate(`/recipe/${recipeId}`)
          }
        },
      }
    )
  }

  return (
    <form
      className="mx-auto w-full max-w-mobile space-y-8 px-4 md:max-w-tablet md:space-y-10 md:px-8 lg:grid lg:max-w-desktop lg:grid-cols-[minmax(0,1fr)_650px] lg:items-start lg:space-y-0 lg:gap-x-20 lg:gap-y-10 lg:px-20"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <p className="text-sm font-medium text-light-dark lg:col-start-1 lg:row-start-1">
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </p>

      <div className="lg:col-start-1 lg:row-start-2">
        <ImageInput control={methods.control} />
      </div>

      <div className="space-y-8 lg:col-start-2 lg:row-start-2">
        <Details control={methods.control} />
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-[274px_auto] md:items-start md:justify-start md:gap-x-4 md:gap-y-8">
            <Category control={methods.control} />

            <div className="md:justify-self-start">
              <CookingTime control={methods.control} />
            </div>

            <Area control={methods.control} />
          </div>

          <Ingredients control={methods.control} />
          <Preparation control={methods.control} />
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outlineGray"
            className="size-12 rounded-full"
            onClick={() => methods.reset()}
          >
            <FIcon iconName="trash" className="size-15 text-gray" />
          </Button>
          <Button type="submit" className="uppercase">
            Publish
          </Button>
        </div>
      </div>
    </form>
  )
}
