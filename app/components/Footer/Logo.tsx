import { Link } from "react-router"
import sprite from "../../assets/icons/sprite.svg"

export default function Logo() {
  return (
    <Link to="/" aria-label="Foodies homepage">
      <svg className="h-7 w-auto">
        <use href={`${sprite}#logo-black`} />
      </svg>
    </Link>
  )
}
