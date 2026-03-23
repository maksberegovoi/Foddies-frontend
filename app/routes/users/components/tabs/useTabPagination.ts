import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { PaginationDto } from "~/api/generated/model"

export function useTabPage() {
  const [page, setPage] = useState(1)

  return {
    page,
    setPage,
  }
}

export function getTotalPages(meta?: PaginationDto) {
  return meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1
}

export function useResetPageOnOutOfRange(
  page: number,
  totalPages: number,
  meta: PaginationDto | undefined,
  setPage: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    if (!meta) return
    if (page > totalPages) {
      setPage(1)
    }
  }, [page, totalPages, meta])
}
