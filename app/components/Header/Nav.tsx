import { NavLink } from "react-router"
import { cn } from "../../lib/utils"

type NavProps = {
  variant?: "dark" | "light"
}

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/recipe/add", label: "ADD RECIPE" },
]

export default function Nav({ variant = "dark" }: NavProps) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "px-4 py-2",
              variant === "dark" ? "text-white" : "text-dark",
              isActive &&
                cn(
                  "rounded-full border",
                  variant === "dark" ? "border-white/20" : "border-gray"
                )
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
