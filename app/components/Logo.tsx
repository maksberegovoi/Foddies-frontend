import { Link } from "react-router"
import FIcon from "./FIcon"

type LogoProps = {
  variant: "light" | "dark"
}

export default function Logo({ variant = "light" }: LogoProps) {
  return (
    <Link to="/" aria-label="Foodies homepage">
      <FIcon
        iconName={
          `logo-${variant === "dark" ? "white" : "black"}` as
            | "logo-white"
            | "logo-black"
        }
        className="h-[24px] w-[69px] md:h-[28px] md:w-[83px]"
      />
    </Link>
  )
}
