import { NavLink } from "react-router"
import { useState, useRef, useEffect, useMemo } from "react"

import { useMediaQuery } from "@uidotdev/usehooks"

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
import { categories } from "./mocks"
import FIcon from "~/components/FIcon"
import type { Route } from "./+types/category"
import RecipeItem from "~/components/RecipeItem"
import Title from "~/components/Title"
import Text from "~/components/Text"

const ITEMS_PER_PAGE = 6

const Category = ({ params }: Route.LoaderArgs) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  )
  const isDesktop = !isMobile && !isTablet

  const item = categories.find((c) => c.id === +params.cid)
  const [page, setPage] = useState(1)

  const scrollOffset = useMemo(
    () => (isDesktop ? 60 : isTablet ? 50 : 32),
    [isDesktop, isTablet]
  )

  useEffect(() => {
    if (!sectionRef.current) return
    const top = sectionRef.current.offsetTop - scrollOffset
    window.scrollTo({ top, behavior: "auto" })
  }, [isDesktop, scrollOffset])

  const recipes = item?.recipes ?? []
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE) || 1
  const paginatedRecipes = recipes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-8 px-4 md:gap-10 md:px-8 lg:px-20"
    >
      <div className="flex max-w-[532px] flex-col items-start gap-4 md:gap-5">
        <NavLink preventScrollReset to="/" className="flex gap-1.5">
          <FIcon width={18} height={18} iconName="arrow-to-left" />
          <span className="text-sm leading-4.5 font-bold uppercase">Back</span>
        </NavLink>

        <Title as={"h2"}>{item?.name}</Title>
        <Text className="text-gray md:text-light-dark">
          {item?.description}
        </Text>
      </div>

      <div className="flex flex-col gap-8 md:gap-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-3.5 md:flex-row lg:min-w-[330px] lg:flex-col">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ingredients" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ingredients</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Area" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Area</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-8 md:gap-15">
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
            {paginatedRecipes.map((recipe) => (
              <RecipeItem key={recipe.id} item={recipe} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  )
}

export default Category
