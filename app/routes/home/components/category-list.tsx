import CategoryCard from "./category-card"
import { useBreakpoints } from "~/hooks/useBreakpoints"

interface CategoyListProps {
  categories: {
    id: number
    title: string
  }[]
  onSelectCategory: (categoryId: number | null) => void
}

export default function CategoyList({
  categories,
  onSelectCategory,
}: CategoyListProps) {
  const { isMobile, isTablet } = useBreakpoints()
  const GAP_PX = 20 // matches gap-5 (sm:gap-5) between category cards

  return (
    <ul className="flex flex-wrap gap-4 sm:gap-5">
      {categories.map((c, idx) => (
        <CategoryCard
          key={c.id}
          title={c.title}
          idx={idx}
          onButtonClick={() => onSelectCategory(c.id)}
        />
      ))}

      <li
        className="flex h-63 items-center justify-center rounded-[30px] bg-black sm:h-92"
        style={{
          width: isMobile
            ? "100%"
            : isTablet
              ? `calc(50% - ${GAP_PX / 2}px)`
              : `calc(27% - ${(3 * GAP_PX) / 4}px)`,
        }}
        onClick={() => onSelectCategory(null)}
      >
        <span className="text-xl leading-6 font-bold text-white uppercase">
          All Categories
        </span>
      </li>
    </ul>
  )
}
