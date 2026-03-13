import { NavLink } from "react-router"

type NavProps = {
  variant?: "dark" | "light"
}

export default function Nav({ variant = "dark" }: NavProps) {
  const activeClass =
    variant === "dark"
      ? "rounded-full border border-white/20 px-4 py-2 text-white"
      : "rounded-full border border-gray px-4 py-2 text-dark"

  const inactiveClass =
    variant === "dark" ? "px-4 py-2 text-white" : "px-4 py-2 text-dark"

  return (
    <nav className="hidden items-center gap-6 md:flex">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        HOME
      </NavLink>

      <NavLink
        to="/recipe/add"
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        ADD RECIPE
      </NavLink>
    </nav>
  )
}
