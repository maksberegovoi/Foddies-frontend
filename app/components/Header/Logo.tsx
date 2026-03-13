import { Link } from "react-router"
import sprite from "../../assets/icons/sprite.svg"

type LogoProps = {
  variant?: "dark" | "light"
}

export default function Logo({ variant = "dark" }: LogoProps) {
  const logoId = variant === "dark" ? "logo-white" : "logo-black"

  return (
    <Link to="/" aria-label="Foodies homepage">
      <svg className="h-[28px] w-[83px]">
        <use href={`${sprite}#${logoId}`} />
      </svg>
    </Link>
  )
}
