import { useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { ComboboxItem, ComboboxList } from "~/components/ui/combobox"

type VirtualizedComboboxListProps = {
  items: string[]
  initialRenderCount?: number
  estimateSize?: number
  overscan?: number
}

function VirtualizedComboboxList({
  items,
  initialRenderCount = 25,
  estimateSize = 40,
  overscan = 6,
}: VirtualizedComboboxListProps) {
  const [listElement, setListElement] = useState<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => listElement,
    estimateSize: () => estimateSize,
    overscan,
  })

  const virtualRows = virtualizer.getVirtualItems()
  const isReady = listElement !== null && virtualRows.length > 0

  const firstRow = virtualRows[0]
  const lastRow = virtualRows[virtualRows.length - 1]
  const startIndex = firstRow?.index ?? 0
  const endIndex = lastRow?.index ?? -1
  const topPadding = firstRow?.start ?? 0
  const bottomPadding = lastRow ? virtualizer.getTotalSize() - lastRow.end : 0

  return (
    <ComboboxList ref={setListElement}>
      {(item, index) => {
        if (!isReady) {
          if (index >= initialRenderCount) {
            return null
          }

          return (
            <ComboboxItem key={`${item}-${index}`} index={index} value={item}>
              {item}
            </ComboboxItem>
          )
        }

        if (index < startIndex || index > endIndex) {
          return null
        }

        const isFirstVisible = index === startIndex
        const isLastVisible = index === endIndex

        return (
          <div
            key={`${item}-${index}`}
            style={{
              marginTop: isFirstVisible ? topPadding : 0,
              marginBottom: isLastVisible ? bottomPadding : 0,
            }}
          >
            <ComboboxItem index={index} value={item}>
              {item}
            </ComboboxItem>
          </div>
        )
      }}
    </ComboboxList>
  )
}

export default VirtualizedComboboxList
