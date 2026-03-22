import { Link } from "react-router"

import FIcon from "~/components/FIcon"
import type { CategoryDto } from "~/api/generated/model"

interface CategoryItemProps {
  width: string
  category: CategoryDto
  onSelectCategory: () => void
}

const CategoryItem = ({
  category,
  width,
  onSelectCategory,
}: CategoryItemProps) => {
  return (
    <Link
      preventScrollReset
      key={category.name}
      onClick={onSelectCategory}
      to={`category/${category.id}`}
      className={
        "relative flex h-63 items-end overflow-hidden rounded-[30px] bg-dark p-6 sm:h-92"
      }
      style={{
        width,
      }}
    >
      <div
        className="absolute bottom-0 left-0 size-full bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(/category_${category.name.toLowerCase()}.webp)`,
        }}
      />
      <div className="relative flex gap-1">
        <div className="rounded-[30px] border border-white bg-white/20 px-3.5 py-2.5 text-xl leading-6 font-medium text-white lg:border-white/20">
          {category.name}
        </div>

        <div className="rounded-full border border-white/20 p-[13px]">
          <FIcon
            width={20}
            height={20}
            className="text-white"
            iconName="arrow-up-right"
          />
        </div>
      </div>
    </Link>
  )
}

export default CategoryItem
