import { NavLink } from "react-router"
import Logo from "./Logo"
import sprite from "../../assets/icons/sprite.svg"

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-dark text-white">
      <div className="relative flex h-full flex-col px-4 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <Logo variant="dark" />

          <button type="button" onClick={onClose} aria-label="Close menu">
            <svg className="h-6 w-6 text-white">
              <use href={`${sprite}#close`} />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "rounded-full border border-white px-6 py-3 text-xs"
                : "text-xs"
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/recipe/add"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "rounded-full border border-white px-6 py-3 text-xs"
                : "text-xs"
            }
          >
            ADD RECIPE
          </NavLink>
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
