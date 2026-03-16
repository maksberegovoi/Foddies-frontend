import HeroSection from "./components/hero-section"
import CategoriesSection from "./components/categories-section"
import TestimonialsSection from "./components/testimonials-section"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col gap-30">
      <HeroSection />
      <CategoriesSection />
      <TestimonialsSection />
    </div>
  )
}
