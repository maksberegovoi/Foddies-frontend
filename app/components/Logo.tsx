import { Link } from "react-router"
import FIcon from "./FIcon"

type LogoProps = {
  variant?: "white" | "black"
}

export default function Logo({ variant = "white" }: LogoProps) {
  return (
    <Link to="/" aria-label="Foodies homepage">
      <FIcon
        iconName={`logo-${variant}` as "logo-white" | "logo-black"}
        className="h-[24px] w-[69px] md:h-[28px] md:w-[83px]"
      />
    </Link>
  )
}
