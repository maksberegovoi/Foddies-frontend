import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"
import { Link } from "react-router"
import { useMemo } from "react"
import { useMediaQuery } from "@uidotdev/usehooks"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "~/components/ui/carousel"

export default function Home() {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  )

  const categories = [
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

  const GAP_PX = 20 // matches gap-5 (sm:gap-5) between category cards

  // Gap share per item: 2-col → gap/2 each; 4-col → (3*gap)/4 per 26%, gap/2 per 48%
  const categoryWidthByIdx = useMemo<Record<number, string>>(
    () =>
      isTablet
        ? {
            // 2 columns: 50% minus half the gap
            0: `calc(50% - ${GAP_PX / 2}px)`,
            1: `calc(50% - ${GAP_PX / 2}px)`,
            2: "100%",
            3: `calc(50% - ${GAP_PX / 2}px)`,
            4: `calc(50% - ${GAP_PX / 2}px)`,
            5: `calc(50% - ${GAP_PX / 2}px)`,
            6: `calc(50% - ${GAP_PX / 2}px)`,
            7: "100%",
            8: `calc(50% - ${GAP_PX / 2}px)`,
            9: `calc(50% - ${GAP_PX / 2}px)`,
            10: `calc(50% - ${GAP_PX / 2}px)`,
          }
        : {
            // 4 columns: 26% minus (3*gap)/4; 48% minus gap/2
            0: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            1: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            2: `calc(46% - ${GAP_PX / 2}px)`,
            3: `calc(46% - ${GAP_PX / 2}px)`,
            4: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            5: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            6: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            7: `calc(46% - ${GAP_PX / 2}px)`,
            8: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            9: `calc(46% - ${GAP_PX / 2}px)`,
            10: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
          },
    [isTablet]
  )

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
    <div className="flex min-h-svh flex-col gap-30">
      <div
        className={cn(
          "mx-5 mt-5 flex flex-col items-center rounded-4xl bg-foreground"
        )}
      >
        <div className="flex max-w-4xl flex-col items-center gap-10 pt-[154px]">
          <h1 className="text-center text-[90px] leading-[90px] font-extrabold text-white uppercase">
            Improve Your Culinary Talents
          </h1>

          <span className="max-w-xl text-center font-light text-white">
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </span>

          <Button
            className="px-8 text-base font-medium uppercase"
            variant="outlineWhite"
          >
            Add recipe
          </Button>

          <div className="flex gap-9 pt-17 pb-28">
            <img
              src={HeroSmall}
              alt=""
              className="mt-32 h-[116px] w-32 rotate-12"
            />
            <img src={HeroBig} alt="" className="w-[302px] -rotate-11" />
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-10 px-20">
        <div className="flex max-w-[532px] flex-col gap-5">
          <h2 className="text-[40px] leading-11 font-extrabold uppercase">
            Categories
          </h2>
          <p>
            Discover a limitless world of culinary possibilities and enjoy
            exquisite recipes that combine taste, style and the warm atmosphere
            of the kitchen.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-5">
          {categories.map((c, idx) => (
            <Link
              key={c.title}
              to={`category/${c.id}`}
              className={
                "relative flex h-63 items-end overflow-hidden rounded-[30px] bg-dark p-6 sm:h-92"
              }
              style={{
                // backgroundImage: `url(/category_${c.id}.jpg)`,
                width: isMobile ? "100%" : categoryWidthByIdx[idx],
              }}
            >
              <div
                className="absolute bottom-0 left-0 size-full bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(/category_${c.id}.jpg)` }}
              />
              <div className="relative flex gap-1">
                <div className="rounded-[30px] border border-white/20 bg-white/20 px-3.5 py-2.5 text-xl leading-6 font-medium text-white">
                  {c.title}
                </div>
                // link in link error
                {/*<Link*/}
                {/*  to={c.title.toLowerCase()}*/}
                {/*  className="rounded-full border border-white/20 p-[13px]"*/}
                {/*></Link>*/}
              </div>
            </Link>
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
    </div>
  )
}
