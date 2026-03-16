import { useMediaQuery } from "@uidotdev/usehooks"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"

const HeroSection = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")

  const handleAddRecepie = () => {
    // TO DO: add logic
  }

  return (
    <div
      className={cn(
        "relative mx-2 mt-2 flex flex-col items-center rounded-4xl bg-foreground md:mx-4 md:mt-4 lg:mx-5 lg:mt-5"
      )}
    >
      <HeroLine className="left-4 md:left-8 lg:left-15" />
      {!isMobile && (
        <>
          <HeroLine className="md:left-[229px] lg:left-[257px]" />
          <HeroLine className="md:right-[229px] lg:right-[257px]" />
          <HeroLine className="md:right-8 lg:right-15" />
        </>
      )}

      <div className="flex max-w-4xl flex-col items-center gap-10 px-4 pt-[194px] md:pt-[217px] lg:px-0 lg:pt-[154px]">
        <h1 className="text-center text-[40px] leading-[40px] font-extrabold text-white uppercase md:text-[70px] md:leading-[70px] lg:text-[90px] lg:leading-[90px]">
          Improve Your Culinary Talents
        </h1>

        <span className="max-w-xl px-4 text-center text-sm leading-[20px] font-light text-white sm:text-base sm:leading-6 md:px-0">
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </span>

        <Button
          variant="outlineWhite"
          onClick={handleAddRecepie}
          className="px-8 text-base font-bold uppercase"
        >
          <span>Add recipe</span>
        </Button>

        <div className="flex gap-9 pt-17 pb-28">
          <img
            src={HeroSmall}
            alt=""
            className="mt-32 h-[70px] w-[77px] rotate-12 md:h-[116px] md:w-32"
          />
          <img
            src={HeroBig}
            alt=""
            className="h-[172px] w-[190px] -rotate-11 md:h-[273px] md:w-[302px]"
          />
        </div>
      </div>
    </div>
  )
}

type HeroLineProps = React.HTMLAttributes<HTMLDivElement>

const HeroLine = ({ className, ...props }: HeroLineProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 h-full border border-transparent bg-origin-border",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 100%) border-box",
      }}
      {...props}
    />
  )
}

export default HeroSection
