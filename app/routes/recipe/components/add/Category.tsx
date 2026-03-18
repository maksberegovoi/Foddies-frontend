import { memo } from "react"
import type { Control } from "react-hook-form"

import AddComboboxField from "./AddComboboxField"

import { useGetCategories } from "~/api/generated/endpoints/categories/categories"

type CategoryProps = {
  control: Control<any>
}

function Category({ control }: CategoryProps) {
  const { data } = useGetCategories()
  const categories =
    data?.data.map((cat) => ({ value: cat.id, label: cat.name })) || []
  return (
    <AddComboboxField
      control={control}
      name="category"
      label="Category"
      items={categories}
      placeholder="Select a category"
      emptyMessage="No categories found."
    />
  )
}

export default memo(Category)
