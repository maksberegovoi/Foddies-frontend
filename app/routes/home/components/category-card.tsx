import { cn } from "~/lib/utils"
import spriteUrl from "~/assets/icons/sprite.svg"

interface CategoryCardProps {
  title: string
  backgroundImageUrl?: string
  size: { tablet: "full" | "normal"; desktop: "small" | "medium" }
  onButtonClick: () => void
}

export default function CategoryCard({
  title,
  size,
  backgroundImageUrl,
  onButtonClick,
}: CategoryCardProps) {
  return (
    <li
      className={cn(
        "relative flex h-63 items-end overflow-hidden rounded-[30px] bg-dark p-6",
        "min-[768px]:h-92",
        // Tablet spans
        size.tablet === "full" && "min-[768px]:col-span-2",
        // Desktop spans
        "min-[1440px]:col-span-1", // default small
        size.desktop === "medium" && "min-[1440px]:col-span-2"
      )}
    >
      <div
        className="absolute bottom-0 left-0 size-full bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="relative flex gap-1">
        <h3
          className={cn(
            "rounded-[30px] border border-white bg-white/20 px-3 py-2 text-base font-bold text-white",
            "min-[768px]:px-3.5 min-[768px]:py-2.5 min-[768px]:text-xl min-[768px]:leading-[1.2]",
            "min-[1440px]:border-white/20"
          )}
        >
          {title}
        </h3>
        <button
          className="cursor-pointer rounded-full border border-white/20 p-3.25"
          onClick={onButtonClick}
          aria-label={`View ${title} recipes`}
        >
          <svg className="size-4.5 stroke-white" aria-hidden="true">
            <use href={`${spriteUrl}#arrow-up-right`} />
          </svg>
        </button>
      </div>
    </li>
  )
}
