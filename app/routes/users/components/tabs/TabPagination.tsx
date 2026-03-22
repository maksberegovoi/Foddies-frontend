import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination"

type TabPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function TabPagination({
  page,
  totalPages,
  onPageChange,
}: TabPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(n)
                }}
                isActive={page === n}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
