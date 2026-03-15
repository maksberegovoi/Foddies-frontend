import CategoryCard from "./category-card"

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
  return (
    <ul className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[768px]:gap-5 min-[1440px]:grid-cols-4">
      {categories.map((c, idx) => (
        <CategoryCard
          key={c.id}
          title={c.title}
          backgroundImageUrl={`/category_${c.id}.jpg`}
          size={getCardSize(idx)}
          onButtonClick={() => onSelectCategory(c.id)}
        />
      ))}
      <li
        className="flex h-63 cursor-pointer items-center justify-center rounded-[30px] bg-black min-[768px]:h-92"
        onClick={() => onSelectCategory(null)}
      >
        <span className="text-base font-extrabold text-white uppercase min-[768px]:text-xl min-[768px]:leading-[1.2]">
          All Categories
        </span>
      </li>
    </ul>
  )
}

function getCardSize(idx: number): {
  tablet: "full" | "normal"
  desktop: "small" | "medium"
} {
  // Tablet: indices 2, 7 are full-width
  // Desktop: indices 2,3,7,9 are medium (span 2), rest are small
  const tabletFullWidth = [2, 7]
  const desktopMedium = [2, 3, 7, 9]

  return {
    tablet: tabletFullWidth.includes(idx) ? "full" : "normal",
    desktop: desktopMedium.includes(idx) ? "medium" : "small",
  }
}
