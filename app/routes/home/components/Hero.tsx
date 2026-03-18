import type { HTMLAttributes } from "react"

import { useMediaQuery } from "@uidotdev/usehooks"
import { useNavigate } from "react-router"

import { useModal } from "~/components/modals/modal-context"
import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"

const HeroSection = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const { openSignIn } = useModal()
  const navigate = useNavigate()
  const isSignedIn = useIsSignedIn()

  return (
    <div
      className={cn(
        "relative mx-2 mt-2 flex flex-col items-center rounded-[20px] bg-foreground md:mx-4 md:mt-4 md:rounded-4xl lg:mx-5 lg:mt-5"
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

        <button
          className={cn(
            buttonVariants({ variant: "outlineWhite" }),
            "px-8 text-base font-bold uppercase"
          )}
          type="button"
          onClick={() => {
            if (isSignedIn) {
              navigate("/recipe/add")
            } else {
              openSignIn()
            }
          }}
        >
          Add recipe
        </button>

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

type HeroLineProps = HTMLAttributes<HTMLDivElement>

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
