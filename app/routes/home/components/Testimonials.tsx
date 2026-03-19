import {
  Carousel,
  CarouselDots,
  CarouselItem,
  CarouselContent,
} from "~/components/ui/carousel"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import TestimonialItem from "./TestimonialItem"
import type { TestimonialDto } from "~/api/generated/model"
import Text from "~/components/Text"

interface TestimonialsProps {
  items: TestimonialDto[]
}

const Testimonials = ({ items }: TestimonialsProps) => {
  return (
    <section className="mb-30 flex flex-col items-center">
      <div className="relative mx-4 flex h-98.5 max-w-206 flex-col md:mx-8 md:h-108 lg:mx-0">
        <div className="flex flex-col items-center gap-4">
          <Text as="span" className="text-sm font-medium md:text-base">
            What our customer say
          </Text>
          <Title as={"h2"}>Testimonials</Title>
        </div>

        <FIcon
          iconName="quotes"
          className="absolute top-20 left-2 h-8 w-10 text-gray md:top-19 md:left-10 md:h-12 md:w-14.75"
        />

        <Carousel className="flex flex-1 flex-col">
          <CarouselContent className="h-full">
            {items.map((item, idx) => (
              <CarouselItem className="flex" key={idx}>
                <TestimonialItem item={item} />
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
  )
}

export default Testimonials
