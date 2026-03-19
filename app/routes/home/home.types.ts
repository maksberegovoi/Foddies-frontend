import type { CategoryDto } from "~/api/generated/model"

export type HomeContextType = {
  selectedCategory: CategoryDto | undefined
  handleSelectCategory: (category: CategoryDto) => void
}
