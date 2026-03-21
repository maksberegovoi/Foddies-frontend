import { useMemo, useState } from "react"
import { useOutletContext } from "react-router"
import { useMediaQuery } from "@uidotdev/usehooks"

import Text from "~/components/Text"
import Title from "~/components/Title"
import type { Route } from "./+types/categories"
import { queryClient } from "~/api/query-client"
import CategoryItem from "./components/CategoryItem"
import {
  getCategories,
  getGetCategoriesQueryKey,
} from "~/api/generated/endpoints/categories/categories"
import { getCategoriesWidthByIdx } from "./categories.utils"
import type { HomeContextType } from "./home.types"
import { withErrorHandling } from "~/lib/api-error-handler"

export async function clientLoader() {
  const queryKey = getGetCategoriesQueryKey()

  return await withErrorHandling(
    queryClient.ensureQueryData({
      queryKey,
      queryFn: () => getCategories(),
    })
  )
}

const Categories = ({ loaderData }: Route.ComponentProps) => {
  const isMobile = useMediaQuery("only screen and (max-width : 767px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 1440px)"
  )

  const { handleSelectCategory } = useOutletContext<HomeContextType>()

  const [isShowAll, setIsShowAll] = useState(false)

  const categories = loaderData.data

  /** When `isShowAll` is false, show first 11; when true, show full list. */
  const categoriesToShow = useMemo(
    () => (isShowAll ? categories : categories.slice(0, 11)),
    [categories, isShowAll]
  )

  const GAP_PX = 20 // matches gap-5 (sm:gap-5) between category cards

  const categoryWidthByIdx = useMemo<Record<number, string>>(
    () => getCategoriesWidthByIdx(GAP_PX, isTablet),
    [isTablet]
  )

  return (
    <section className="flex flex-col gap-8 md:gap-10">
      <div className="flex max-w-[532px] flex-col gap-4 md:gap-5">
        <Title as={"h2"}>Categories</Title>
        <Text className="text-gray md:text-light-dark">
          Discover a limitless world of culinary possibilities and enjoy
          exquisite recipes that combine taste, style and the warm atmosphere of
          the kitchen.
        </Text>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-5">
        {categoriesToShow.map((c, idx) => (
          <CategoryItem
            key={idx}
            category={c}
            onSelectCategory={() => handleSelectCategory(c)}
            width={isMobile ? "100%" : categoryWidthByIdx[idx]}
          />
        ))}

        {!isShowAll && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsShowAll(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setIsShowAll(true)
              }
            }}
            className="flex h-63 cursor-pointer items-center justify-center rounded-[30px] bg-black sm:h-92"
            style={{
              width: isMobile
                ? "100%"
                : isTablet
                  ? `calc(50% - ${GAP_PX / 2}px)`
                  : `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            }}
          >
            <Text
              as="span"
              className="text-xl leading-6 font-bold text-white uppercase"
            >
              All Categories
            </Text>
          </div>
        )}
      </div>
    </section>
  )
}

export default Categories
