import { Link } from "react-router"
import FIcon from "./FIcon"

export default function Logo({ isDark }: { isDark?: boolean }) {
  return (
    <Link to="/" aria-label="Foodies homepage">
      <FIcon
        iconName={
          `logo-${isDark ? "black" : "white"}` as "logo-white" | "logo-black"
        }
        className="h-[24px] w-[69px] md:h-[28px] md:w-[83px]"
      />
    </Link>
  )
}
