import { useState } from "react"
import { Outlet } from "react-router"
import type { Route } from "./+types/route"
import HeroSection from "./components/Hero"
import { queryClient } from "~/api/query-client"
import type { HomeContextType } from "./home.types"
import Testimonials from "./components/Testimonials"
import type { CategoryDto } from "~/api/generated/model"
import {
  getTestimonials,
  getGetTestimonialsQueryKey,
} from "~/api/generated/endpoints/testimonials/testimonials"
import { withErrorHandling } from "~/lib/api-error-handler"

export async function clientLoader() {
  const queryKey = getGetTestimonialsQueryKey()

  return await withErrorHandling(
    queryClient.ensureQueryData({
      queryKey,
      queryFn: () => getTestimonials(),
    })
  )
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>()

  const handleSelectCategory = (category: CategoryDto) => {
    setSelectedCategory(category)
  }

  return (
    <div className="flex min-h-svh flex-col gap-16 md:gap-25 lg:gap-30">
      <HeroSection />

      <Outlet
        context={
          {
            selectedCategory,
            handleSelectCategory,
          } satisfies HomeContextType
        }
      />

      <Testimonials items={loaderData.data} />
    </div>
  )
}
