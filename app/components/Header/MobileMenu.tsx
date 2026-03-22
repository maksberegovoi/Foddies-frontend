import { NavLink } from "react-router"
import Logo from "../Logo"
import FIcon from "../FIcon"
import { cn } from "../../lib/utils"
import HeroBig from "~/assets/images/hero_big.png"
import HeroSmall from "~/assets/images/hero_small.png"

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { to: "/", label: "HOME" },
  { to: "/recipe/add", label: "ADD RECIPE" },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-dark text-white">
      <div className="relative flex h-full flex-col px-4 py-8">
        <div className="flex items-center justify-between">
          <Logo />

          <button type="button" onClick={onClose} aria-label="Close menu">
            <FIcon iconName="close-x" className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex h-full flex-col">
          <nav className="flex flex-1 flex-col items-center justify-end gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "text-sm",
                    isActive &&
                      "rounded-full border border-gray px-[35px] py-[14px]"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="jus flex flex-1 items-center justify-center gap-9 pt-17 pb-9">
            <img
              src={HeroSmall}
              alt=""
              className="h-[70px] w-[77px] rotate-12"
            />
            <img
              src={HeroBig}
              alt=""
              className="h-[172px] w-[190px] -rotate-11"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
