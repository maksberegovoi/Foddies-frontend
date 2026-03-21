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
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"
import { useEffect } from "react"
import Title from "~/components/Title"
import Text from "~/components/Text"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import type { ApiErrorHTTP } from "~/api/axios-instance"
import PathInfo from "~/components/PathInfo"

export default function AddRecipe() {
  const navigate = useNavigate()
  const { mutate: postRecipes } = usePostRecipes()

  const isSignedIn = useIsSignedIn()

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/?modal=sign-in")
    }
  }, [isSignedIn])

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
        onError: (error) => {
          const axiosError = error as AxiosError<ApiErrorHTTP>
          const status = axiosError.response?.status
          const errorData = axiosError.response?.data

          if (status === 400) {
            if (
              errorData &&
              "errors" in errorData &&
              Array.isArray(errorData.errors)
            ) {
              errorData.errors.forEach((err) => {
                methods.setError(err.path as keyof AddRecipeFormValues, {
                  type: "server",
                  message: err.message,
                })
              })
              toast.error("Please check the highlighted fields.")
            } else {
              toast.error(errorData?.message || "Invalid data submitted.")
            }
            return
          }
          if (status === 404) {
            toast.error(
              errorData?.message ||
                "Required resource not found (Category, Area, or Ingredient)."
            )
            return
          }
          if (status === 500) {
            toast.error("Server error. Please try again later.")
            return
          }
          toast.error("Something went wrong. Please try again.")
        },
      }
    )
  }

  if (!isSignedIn) return null

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <PathInfo currentPageName="add recipe" />
        <Title as={"h2"}>ADD RECIPE</Title>
      </div>
      <form
        className="space-y-8 md:space-y-10 lg:grid lg:grid-cols-[minmax(0,1fr)_650px] lg:items-start lg:space-y-0 lg:gap-x-20 lg:gap-y-10"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Text className="lg:col-start-1 lg:row-start-1">
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Text>

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
    </div>
  )
}
