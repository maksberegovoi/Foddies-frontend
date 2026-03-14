import { useEffect, useState } from "react"
import CategoryList from "./category-list"

interface Category {
  id: number
  title: string
}

// TODO Replace with real API call
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
    // TODO Implement fetch recipes by category logic here
    console.log("Selected category ID:", categoryId)
  }

  return (
    <section className="flex flex-col gap-10 px-20">
      <div className="flex max-w-[532px] flex-col gap-5">
        <h2 className="text-[40px] leading-11 font-extrabold uppercase">
          Categories
        </h2>
        <p>
          Discover a limitless world of culinary possibilities and enjoy
          exquisite recipes that combine taste, style and the warm atmosphere of
          the kitchen.
        </p>
      </div>

      <CategoryList
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
    </section>
  )
}
