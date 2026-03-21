import { useNavigate } from "react-router"
import type { HTMLAttributes } from "react"
import { useMediaQuery } from "@uidotdev/usehooks"

import { cn } from "~/lib/utils"
import Text from "~/components/Text"
import Title from "~/components/Title"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"
import { buttonVariants } from "~/components/ui/button"
import { useModal } from "~/components/modals/modal-context"
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"

const HeroSection = () => {
  const navigate = useNavigate()
  const { openSignIn } = useModal()
  const isSignedIn = useIsSignedIn()

  const isMobile = useMediaQuery("only screen and (max-width : 767px)")

  const handleAddRecipe = () => {
    if (isSignedIn) {
      navigate("/recipe/add")
    } else {
      openSignIn()
    }
  }

  return (
    <div
      className={cn(
        "relative mt-2 flex flex-col items-center rounded-[20px] bg-foreground md:mt-4 md:rounded-4xl lg:mt-5",
        "-mx-[8px] w-[calc(100%+16px)] md:-mx-[16px] md:w-[calc(100%+32px)] lg:-mx-[60px] lg:w-[calc(100%+120px)]"
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
        <Title className="text-center text-white">
          Improve Your Culinary Talents
        </Title>

        <Text
          as="span"
          className="max-w-xl px-4 text-center text-sm leading-[20px] font-light text-white sm:text-base sm:leading-6 md:px-0"
        >
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </Text>

        <button
          className={cn(
            buttonVariants({ variant: "outlineWhite" }),
            "px-8 text-base font-bold uppercase"
          )}
          type="button"
          onClick={handleAddRecipe}
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
