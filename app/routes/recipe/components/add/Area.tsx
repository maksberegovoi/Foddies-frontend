import { memo } from "react"
import type { Control } from "react-hook-form"

import AddComboboxField from "./AddComboboxField"
import { useGetAreas } from "~/api/generated/endpoints/areas/areas"

type AreaProps = {
  control: Control<any>
}

function Area({ control }: AreaProps) {
  const { data } = useGetAreas()
  const areas =
    data?.data.map((area) => ({ value: area.id, label: area.name })) || []

  return (
    <AddComboboxField
      control={control}
      name="area"
      label="Area"
      items={areas}
      placeholder="Select an area"
      emptyMessage="No areas found."
    />
  )
}

export default memo(Area)
