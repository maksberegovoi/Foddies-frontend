import { useState, useRef, useMemo } from "react"
import { Navigate, NavLink, useOutletContext } from "react-router"

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "~/components/ui/select"
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
} from "~/components/ui/pagination"
import Text from "~/components/Text"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import {
  getAreas,
  useGetAreas,
  getGetAreasQueryKey,
} from "~/api/generated/endpoints/areas/areas"
import type { Route } from "./+types/category"
import RecipeItem from "~/components/RecipeItem"
import { queryClient } from "~/api/query-client"
import {
  getRecipes,
  useGetRecipes,
  getGetRecipesQueryKey,
} from "~/api/generated/endpoints/recipes/recipes"
import type { HomeContextType } from "./home.types"
import {
  getIngredients,
  useGetIngredients,
  getGetIngredientsQueryKey,
} from "~/api/generated/endpoints/ingredients/ingredients"
import type { GetRecipesParams } from "~/api/generated/model"
import { IngredientsCombobox } from "./components/IngredientsCombobox"

const ITEMS_PER_PAGE = 12

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = String(params.cid)
  const queryParams = {
    categoryId: id,
    page: 1,
    limit: ITEMS_PER_PAGE,
  } satisfies GetRecipesParams
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: getGetIngredientsQueryKey(),
      queryFn: () => getIngredients(),
    }),
    queryClient.prefetchQuery({
      queryKey: getGetAreasQueryKey(),
      queryFn: () => getAreas(),
    }),
    queryClient.prefetchQuery({
      queryKey: getGetRecipesQueryKey(queryParams),
      queryFn: () => getRecipes(queryParams),
    }),
  ])
}

export default function Category({ params }: Route.ComponentProps) {
  const cid = params.cid
  const sectionRef = useRef<HTMLElement>(null)

  const { selectedCategory } = useOutletContext<HomeContextType>()

  const [page, setPage] = useState(1)
  const [areaId, setAreaId] = useState<string>()
  const [ingredientIds, setIngredientIds] = useState<string[]>([])

  const recipeParams = useMemo(
    () =>
      ({
        categoryId: cid,
        page,
        limit: ITEMS_PER_PAGE,
        ...(ingredientIds.length > 0 ? { ingredientIds } : {}),
        ...(areaId ? { areaId } : {}),
      }) satisfies GetRecipesParams,
    [cid, page, ingredientIds, areaId]
  )

  const { data: areasRes } = useGetAreas()
  const { data: ingredientsRes } = useGetIngredients()

  const { data, isPending, isError } = useGetRecipes(recipeParams, {
    query: { enabled: Boolean(cid) },
  })

  const ingredients = ingredientsRes?.data ?? []
  const areas = areasRes?.data ?? []
  const selectedArea = areas.find((area) => area.id === areaId)

  const recipes = data?.data ?? []
  const meta = data?.meta
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1

  if (!selectedCategory) return <Navigate to="/" />

  return (
    <section ref={sectionRef} className="flex flex-col gap-8 md:gap-10">
      <div className="flex max-w-[532px] flex-col items-start gap-4 md:gap-5">
        <NavLink preventScrollReset to="/" className="flex gap-1.5">
          <FIcon width={18} height={18} iconName="arrow-to-left" />
          <Text as="span" className="text-sm leading-4.5 font-bold uppercase">
            Back
          </Text>
        </NavLink>

        <Title as={"h2"}>{selectedCategory?.name ?? "Category"}</Title>
        <Text className="text-gray md:text-light-dark">
          {selectedCategory?.description ?? ""}
        </Text>
      </div>

      <div className="flex flex-col gap-8 md:gap-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-3.5 md:flex-row lg:max-w-[330px] lg:min-w-[330px] lg:flex-col">
          <IngredientsCombobox
            value={ingredientIds}
            ingredients={ingredients}
            onValueChange={(ids) => {
              setIngredientIds(ids)
              setPage(1)
            }}
          />

          <Select
            value={areaId}
            onValueChange={(v) => {
              if (v) {
                setAreaId(v)
                setPage(1)
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Area">{selectedArea?.name}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Area</SelectLabel>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-8 md:gap-15">
          {isError && (
            <p className="text-destructive">Could not load recipes.</p>
          )}
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
            {isPending && recipes.length === 0
              ? Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-[30px] bg-muted"
                  />
                ))
              : recipes.map((recipe) => (
                  <RecipeItem key={recipe.id} item={recipe} />
                ))}
          </div>

          {!isPending && !isError && recipes.length === 0 && (
            <p className="text-muted-foreground">
              No recipes in this category.
            </p>
          )}

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(n)
                        }}
                        isActive={page === n}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  )
}
