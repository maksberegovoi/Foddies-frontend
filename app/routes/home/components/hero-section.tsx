import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"

export default function HeroSection() {
  return (
    <section
      className={cn(
        "mx-5 mt-5 flex flex-col items-center rounded-4xl bg-foreground"
      )}
    >
      <div className="flex max-w-4xl flex-col items-center gap-10 pt-[154px]">
        <h1 className="text-center text-[90px] leading-[90px] font-extrabold text-white uppercase">
          Improve Your Culinary Talents
        </h1>

        <span className="max-w-xl text-center font-light text-white">
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
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
    </section>
  )
}
