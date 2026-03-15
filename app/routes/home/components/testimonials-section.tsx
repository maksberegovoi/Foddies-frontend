import { useEffect, useState } from "react"
import {
  CarouselDots,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"
import spriteUrl from "~/assets/icons/sprite.svg"

interface Testimonial {
  text: string
  author: string
}

// TODO: replace with real API call
const fetchTestimonialsMock = async (): Promise<Testimonial[]> => {
  return [
    {
      text: "Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!",
      author: "Larry Pageim",
    },
    {
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nam reiciendis explicabo iusto atque veritatis, vel similique facere non? Consectetur ab veniam repudiandae quae quos dolore possimus quam odio provident.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nam reiciendis explicabo iusto atque veritatis, vel similique facere non? Consectetur ab veniam repudiandae quae quos dolore possimus quam odio provident.",
      author: "Tony Stark",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam alias vitae nam fuga officia a repellendus, at veritatis assumenda aspernatur placeat natus, sunt eius quo!",
      author: "Elon Musk",
    },
  ]
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      // TODO: Replace with real API call
      const data = await fetchTestimonialsMock()
      setTestimonials(data)
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="mb-33.5 px-4 min-[768px]:mb-39 min-[1440px]:mb-44">
      <div className="mx-auto max-w-85.75 min-[768px]:w-176 min-[768px]:max-w-none min-[1440px]:w-205.5">
        <span className="mb-4 block text-center text-sm font-medium text-light-dark min-[768px]:text-base">
          What our customer say
        </span>
        <h2 className="mb-3 text-center text-[28px] leading-[1.1] font-extrabold text-dark uppercase min-[768px]:mb-0 min-[768px]:text-[40px]">
          Testimonials
        </h2>

        <svg
          className="mb-5 ml-2 h-8 w-10 fill-gray min-[768px]:mb-10 min-[768px]:ml-10 min-[768px]:h-12 min-[768px]:w-14.75"
          aria-hidden="true"
        >
          <use href={`${spriteUrl}#quotes`} />
        </svg>

        <Carousel>
          <CarouselContent>
            {testimonials.map((i, idx) => (
              <CarouselItem key={idx}>
                <p className="mb-16 text-center text-lg leading-[1.3] font-medium text-dark min-[768px]:mb-20 min-[768px]:text-2xl">
                  {i.text}
                </p>
                <span className="block text-center text-base font-extrabold text-dark uppercase min-[768px]:text-xl">
                  {i.author}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots
            className="mt-10 w-full gap-2"
            dotClassName="size-[14px] p-0 min-[768px]:size-4"
          />
        </Carousel>
      </div>
    </section>
  )
}
