import { useState } from "react"
import { Link } from "react-router"
import sprite from "../../assets/icons/sprite.svg"
import { cn } from "../../lib/utils"

type UserBarProps = {
  variant?: "dark" | "light"
}

export default function UserBar({ variant = "dark" }: UserBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const user = {
    name: "Victoria",
    avatar: "",
  }

  const defaultAvatar = "https://ui-avatars.com/api/?name=User"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-light-dark px-2 py-1 text-white md:px-3 md:py-2"
      >
        <img
          src={user.avatar || defaultAvatar}
          className="h-6 w-6 rounded-full md:h-8 md:w-8"
        />

        <span className="text-[10px] font-semibold uppercase md:text-sm">
          {user.name}
        </span>

        <svg
          className={cn(
            "h-3 w-3 transition-transform md:h-4 md:w-4",
            isOpen && "rotate-180"
          )}
        >
          <use href={`${sprite}#chevron-down`} />
        </svg>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-3 w-[180px] rounded-xl border p-3 shadow-lg",
            variant === "dark"
              ? "border-gray bg-dark text-white"
              : "border-gray bg-white text-dark"
          )}
        >
          <Link to="/user/1" className="block py-2 text-sm hover:opacity-70">
            PROFILE
          </Link>

          <button className="flex items-center gap-2 py-2 text-sm hover:opacity-70">
            LOG OUT
            <svg className="h-4 w-4">
              <use href={`${sprite}#arrow-up-right`} />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
