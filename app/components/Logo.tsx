import { Link } from "react-router"
import sprite from "../assets/icons/sprite.svg"

type LogoProps = {
  variant?: "white" | "black"
}

export default function Logo({ variant = "white" }: LogoProps) {
  return (
    <Link to="/" aria-label="Foodies homepage">
      <svg className="h-[28px] w-[83px]">
        <use href={`${sprite}#logo-${variant}`} />
      </svg>
    </Link>
  )
}
