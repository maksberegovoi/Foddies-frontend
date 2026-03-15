import { Button } from "~/components/ui/button"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"
import { cn } from "~/lib/utils"

export default function HeroSection() {
  return (
    <section
      className={cn(
        "mx-2 mt-2 rounded-4xl bg-foreground px-4 pt-48.5 pb-30",
        "min-[768px]:mx-4 min-[768px]:mt-4 min-[768px]:px-7.25 min-[768px]:pt-54.25",
        "min-[1440px]:mx-5 min-[1440px]:mt-5 min-[1440px]:pt-38.5 min-[1440px]:pb-27.5"
      )}
    >
      <div className="mx-auto max-w-81.75 min-[768px]:w-169.5 min-[768px]:max-w-none min-[1440px]:w-218.75">
        <h1
          className={cn(
            "mb-5 text-center text-[40px] leading-none font-extrabold text-white uppercase",
            "min-[768px]:mb-10 min-[768px]:text-[70px]",
            "min-[1440px]:text-[90px]"
          )}
        >
          Improve Your Culinary Talents
        </h1>

        <p
          className={cn(
            "mx-auto mb-5 text-center text-[14px] leading-[1.43] font-medium text-white",
            "min-[768px]:mb-10 min-[768px]:w-144.25 min-[768px]:text-[16px] min-[768px]:leading-normal"
          )}
        >
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>

        <Button
          className={cn(
            "mx-auto mb-12 flex h-11 w-32.75 items-center justify-center uppercase",
            "min-[768px]:mb-14.5 min-[768px]:h-14 min-[768px]:w-39.75 min-[768px]:text-base"
          )}
          variant="outlineWhite"
        >
          Add recipe
        </Button>

        <div className="mx-auto flex w-full items-center justify-center gap-5 min-[768px]:gap-8.75">
          <img
            src={HeroSmall}
            alt=""
            className={cn(
              "mt-16 h-auto w-[24%] max-w-19.25 rotate-12",
              "min-[375px]:h-17.5 min-[375px]:w-19.25",
              "min-[768px]:h-29 min-[768px]:w-32 min-[768px]:max-w-none"
            )}
          />
          <img
            src={HeroBig}
            alt=""
            className={cn(
              "h-auto w-[58%] max-w-47.5 -rotate-11",
              "min-[375px]:h-43 min-[375px]:w-47.5",
              "min-[768px]:h-68.25 min-[768px]:w-75.5 min-[768px]:max-w-none"
            )}
          />
        </div>
      </div>
    </section>
  )
}
