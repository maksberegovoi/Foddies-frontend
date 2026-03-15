import { useEffect, useState } from "react"
import CategoryList from "./category-list"

interface Category {
  id: number
  title: string
}

// TODO: Replace with real API call
const mockFetchCategories = async (): Promise<Category[]> => [
  {
    id: 1,
    title: "Beef",
  },
  {
    id: 2,
    title: "Breakfast",
  },
  {
    id: 3,
    title: "Desserts",
  },
  {
    id: 4,
    title: "Lamb",
  },
  {
    id: 5,
    title: "Goat",
  },
  {
    id: 6,
    title: "Miscellaneous",
  },
  {
    id: 7,
    title: "Pasta",
  },
  {
    id: 8,
    title: "Pork",
  },
  {
    id: 9,
    title: "Seafood",
  },
  {
    id: 10,
    title: "Side",
  },
  {
    id: 11,
    title: "Starter",
  },
]

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // TODO: Replace with real API call
        const data = await mockFetchCategories()
        setCategories(data)
      } catch (error) {
        // TODO: Replace with notification
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSelectCategory = (categoryId: number | null) => {
    // TODO: Implement fetch recipes by category logic here
    console.log("Selected category ID:", categoryId)
  }

  return (
    <section className="px-4 min-[768px]:px-8 min-[1440px]:px-20">
      <div className="mx-auto max-w-85.75 min-[768px]:w-176 min-[768px]:max-w-none min-[1440px]:w-7xl">
        {/* TODO: Replace with universal MainTitle component */}
        <h2 className="mb-4 text-[28px] leading-[1.1] font-extrabold uppercase min-[768px]:mb-5 min-[768px]:text-[40px]">
          Categories
        </h2>
        {/* TODO: Replace with universal Subtitle component */}
        <p className="mb-8 text-sm text-gray min-[768px]:mb-10 min-[768px]:w-132.75 min-[768px]:text-base min-[768px]:text-light-dark">
          Discover a limitless world of culinary possibilities and enjoy
          exquisite recipes that combine taste, style and the warm atmosphere of
          the kitchen.
        </p>

        <CategoryList
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
      </div>
    </section>
  )
}
