import { useMemo, useRef, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { cn } from "~/lib/utils"
import type { IngredientDto } from "~/api/generated/model/ingredientDto"
import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "~/components/ui/combobox"

const ROW_HEIGHT = 44

type IngredientsComboboxProps = {
  ingredients: IngredientDto[]
  value: string[]
  onValueChange: (ids: string[]) => void
  className?: string
}

function VirtualizedIngredientRows({
  filteredIds,
  nameById,
}: {
  filteredIds: readonly string[]
  nameById: Map<string, string>
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: filteredIds.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 12,
  })

  if (filteredIds.length === 0) {
    return null
  }

  const rows = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  return (
    <ComboboxList
      ref={listRef}
      className="max-h-72 overflow-x-hidden overflow-y-auto p-1"
    >
      <div className="relative w-full" style={{ height: totalSize }}>
        {rows.map((row) => {
          const id = filteredIds[row.index]!
          return (
            <div
              key={id}
              className="absolute top-0 left-0 w-full"
              style={{
                height: row.size,
                transform: `translateY(${row.start}px)`,
              }}
            >
              <ComboboxItem
                index={row.index}
                value={id}
                className="box-border min-h-11 rounded-2xl py-2.5 pr-8 pl-4 text-base"
              >
                {nameById.get(id) ?? id}
              </ComboboxItem>
            </div>
          )
        })}
      </div>
    </ComboboxList>
  )
}

export function IngredientsCombobox({
  ingredients,
  value,
  onValueChange,
  className,
}: IngredientsComboboxProps) {
  const anchor = useComboboxAnchor()
  const ids = useMemo(() => ingredients.map((i) => i.id), [ingredients])
  const nameById = useMemo(
    () => new Map(ingredients.map((i) => [i.id, i.name] as const)),
    [ingredients]
  )

  const [inputValue, setInputValue] = useState("")
  const filteredIds = useMemo(() => {
    const q = inputValue.trim().toLowerCase()
    if (!q) return ids
    return ids.filter((id) =>
      (nameById.get(id) ?? "").toLowerCase().includes(q)
    )
  }, [ids, inputValue, nameById])

  return (
    <div className={cn("w-full max-w-full min-w-0", className)}>
      <Combobox
        multiple
        virtualized
        items={ids}
        filteredItems={filteredIds}
        itemToStringLabel={(id) => nameById.get(id as string) ?? String(id)}
        value={value}
        inputValue={inputValue}
        onInputValueChange={(v) => setInputValue(v)}
        onValueChange={(next) => {
          onValueChange(Array.isArray(next) ? next : [])
        }}
      >
        <ComboboxChips
          ref={anchor}
          className={cn(
            "min-h-14 w-full max-w-full min-w-0 flex-wrap items-start gap-2 rounded-4xl border border-gray bg-white px-5 py-4 text-base transition-colors",
            /* Base ComboboxChips uses has-data-[slot=combobox-chip]:px-1.5 — override when chips exist */
            "has-data-[slot=combobox-chip]:p-4",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
            "data-placeholder:text-gray lg:data-placeholder:text-light-dark"
          )}
        >
          {value.map((id) => (
            <ComboboxChip
              key={id}
              className="max-w-full min-w-0 shrink truncate"
            >
              <span className="truncate">{nameById.get(id) ?? id}</span>
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            placeholder={
              value.length === 0 ? "Ingredients" : "Search ingredients…"
            }
            className="placeholder:text-gray lg:placeholder:text-light-dark"
          />
        </ComboboxChips>

        <ComboboxContent
          anchor={anchor}
          className={cn(
            "w-[min(100vw-2rem,var(--anchor-width))] min-w-(--anchor-width)",
            "rounded-4xl border border-gray shadow-lg"
          )}
        >
          <VirtualizedIngredientRows
            filteredIds={filteredIds}
            nameById={nameById}
          />
          <ComboboxEmpty className="py-6 text-sm text-gray">
            No ingredient found.
          </ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
