import { useMemo } from "react"
import { useMediaQuery } from "@uidotdev/usehooks"

import {
  Carousel,
  CarouselDots,
  CarouselItem,
  CarouselContent,
} from "~/components/ui/carousel"
import HeroSection from "./Hero"
import FIcon from "~/components/FIcon"
import { categories, testimonials } from "./mocks"
import CategoryItem from "./components/CategoryItem"
import TestimonialItem from "./components/TestimonialItem"
import { getCategoriesWidthByIdx } from "./categories.utils"

export default function Home() {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  )

  const GAP_PX = 20 // matches gap-5 (sm:gap-5) between category cards

  const categoryWidthByIdx = useMemo<Record<number, string>>(
    () => getCategoriesWidthByIdx(GAP_PX, isTablet),
    [isTablet]
  )

  return (
    <div className="flex min-h-svh flex-col gap-16 md:gap-25 lg:gap-30">
      <HeroSection />

      <section className="flex flex-col gap-8 px-4 md:gap-10 md:px-8 lg:px-20">
        <div className="flex max-w-[532px] flex-col gap-4 md:gap-5">
          <h2 className="text-[28px] leading-8 font-extrabold uppercase md:text-[40px] md:leading-11">
            Categories
          </h2>
          <p className="text-sm text-gray md:text-base md:text-light-dark">
            Discover a limitless world of culinary possibilities and enjoy
            exquisite recipes that combine taste, style and the warm atmosphere
            of the kitchen.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-5">
          {categories.map((c, idx) => (
            <CategoryItem
              key={idx}
              category={c}
              width={isMobile ? "100%" : categoryWidthByIdx[idx]}
            />
          ))}

          <div
            className="flex h-63 items-center justify-center rounded-[30px] bg-black sm:h-92"
            style={{
              width: isMobile
                ? "100%"
                : isTablet
                  ? `calc(50% - ${GAP_PX / 2}px)`
                  : `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            }}
          >
            <span className="text-xl leading-6 font-bold text-white uppercase">
              All Categories
            </span>
          </div>
        </div>
      </section>

      <section className="mb-30 flex flex-col items-center">
        <div className="relative mx-4 flex h-[394px] max-w-206 flex-col md:mx-8 md:h-108 lg:mx-0">
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm">What our customer say</span>
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
