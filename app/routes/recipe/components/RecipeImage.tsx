import type { RecipeDetails } from "../types"

type RecipeImageProps = Pick<RecipeDetails, "image" | "title">

export default function RecipeImage({ image, title }: RecipeImageProps) {
  return (
    <div className="h-79.5 max-h-79.5 w-full overflow-hidden rounded-[30px] md:h-108.75 lg:h-114.5">
      <img
        className="h-full w-full object-cover"
        src={image.phone}
        srcSet={`${image.phone} 375w, ${image.tablet} 768w, ${image.desktop} 1440w`}
        sizes="(min-width: 1440px) 551px, (min-width: 768px) 704px, calc(100vw - 32px)"
        alt={title}
      />
    </div>
  )
}
