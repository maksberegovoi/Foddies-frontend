import { useMediaQuery } from "@uidotdev/usehooks"
import CategoryItem from "./components/CategoryItem"
import { categories } from "./mocks"
import { useMemo } from "react"
import { getCategoriesWidthByIdx } from "./categories.utils"
import Title from "~/components/Title"
import Text from "~/components/Text"

const Categories = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
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
        {categories.map((c, idx) => (
          <CategoryItem
            key={idx}
            category={c}
            width={isMobile ? "100%" : categoryWidthByIdx[idx]}
          />
        ))}

        <div
          className="flex h-63 items-center justify-center rounded-[30px] bg-black sm:h-92"
          style={{
            width: isMobile
              ? "100%"
              : isTablet
                ? `calc(50% - ${GAP_PX / 2}px)`
                : `calc(27% - ${(3 * GAP_PX) / 4}px)`,
          }}
        >
          <span className="text-xl leading-6 font-bold text-white uppercase">
            All Categories
          </span>
        </div>
      </div>
    </section>
  )
}

export default Categories
