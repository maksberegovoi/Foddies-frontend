import {
  CarouselDots,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!",
      author: "Larry Pageim",
    },
    {
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nam reiciendis explicabo iusto atque veritatis, vel similique facere non? Consectetur ab veniam repudiandae quae quos dolore possimus quam odio provident.",
      author: "Tony Stark",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam alias vitae nam fuga officia a repellendus, at veritatis assumenda aspernatur placeat natus, sunt eius quo!",
      author: "Elon Musk",
    },
  ]

  return (
    <section className="mb-30 flex flex-col items-center">
      <div className="flex h-108 max-w-206 flex-col">
        <div className="flex flex-col items-center gap-4">
          <span className="">What our customer say</span>
          <h2 className="text-[40px] leading-11 font-extrabold uppercase">
            Testimonials
          </h2>
        </div>

        <div></div>

        <Carousel className="flex flex-1 flex-col">
          <CarouselContent className="h-full">
            {testimonials.map((i, idx) => (
              <CarouselItem className="flex" key={idx}>
                <div className="mt-20 flex flex-col justify-between select-none">
                  <span className="text-center text-2xl leading-9">
                    {i.text}
                  </span>

                  <span className="text-center text-xl leading-6 font-extrabold uppercase">
                    {i.author}
                  </span>
                </div>
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
