import { Outlet } from "react-router"

import {
  Carousel,
  CarouselDots,
  CarouselItem,
  CarouselContent,
} from "~/components/ui/carousel"
import HeroSection from "./components/Hero"
import { testimonials } from "./mocks"
import FIcon from "~/components/FIcon"
import TestimonialItem from "./components/TestimonialItem"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col gap-16 md:gap-25 lg:gap-30">
      <HeroSection />

      <Outlet />

      <section className="mb-30 flex flex-col items-center">
        <div className="relative mx-4 flex h-[394px] max-w-206 flex-col md:mx-8 md:h-108 lg:mx-0">
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium md:text-base">
              What our customer say
            </span>
            <h2 className="text-[28px] leading-8 font-extrabold uppercase md:text-[40px] md:leading-11">
              Testimonials
            </h2>
          </div>

          <FIcon
            iconName="quotes"
            className="absolute top-20 left-2 h-8 w-10 text-gray md:top-19 md:left-10 md:h-12 md:w-[59px]"
          />

          <Carousel className="flex flex-1 flex-col">
            <CarouselContent className="h-full">
              {testimonials.map((i, idx) => (
                <CarouselItem className="flex" key={idx}>
                  <TestimonialItem item={i} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselDots
              className="relative mt-10 w-full gap-3"
              dotClassName="size-4 p-0"
            />
          </Carousel>
        </div>
      </section>
    </div>
  )
}
