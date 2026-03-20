import { NavLink } from "react-router"
import Logo from "../Logo"
import FIcon from "../FIcon"
import { cn } from "../../lib/utils"

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
      <div className="relative flex h-full flex-col px-4 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <Logo />

          <button type="button" onClick={onClose} aria-label="Close menu">
            <FIcon iconName="close-x" className="h-6 w-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "text-xs",
                  isActive && "rounded-full border border-white px-6 py-3"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <img
          src="/images/mobile-menu-dish.png"
          alt="Dish preview"
          className="mx-auto w-[190px] object-contain"
        />
      </div>
    </div>
  )
}
