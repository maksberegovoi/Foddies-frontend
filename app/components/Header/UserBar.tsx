import { Link } from "react-router"
import FIcon from "../FIcon"
import { cn } from "../../lib/utils"
import { useModal } from "../modals/modal-context"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"

type UserBarProps = {
  variant?: "dark" | "light"
}

export default function UserBar({ variant = "dark" }: UserBarProps) {
  const { openLogOut } = useModal()

  const user = {
    name: "Victoria",
    avatar: "",
  }

  const defaultAvatar = "https://ui-avatars.com/api/?name=User"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full bg-light-dark px-2 py-1 text-white outline-none md:px-3 md:py-2">
        <img
          src={user.avatar || defaultAvatar}
          alt={user.name}
          className="h-6 w-6 rounded-full object-cover md:h-8 md:w-8"
        />

        <span className="text-[10px] font-semibold uppercase md:text-sm">
          {user.name}
        </span>

        <FIcon
          iconName="chevron-down"
          className="h-3 w-3 transition-transform md:h-4 md:w-4"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        className={cn(
          "h-[72px] w-[122px] rounded-[15px] p-4 md:h-[74px] md:w-[148px]",
          variant === "dark"
            ? "border border-[#3E4462] bg-dark text-white xl:border-white"
            : "border border-gray-300 bg-white text-dark"
        )}
      >
        <div className="flex h-full flex-col gap-4">
          <DropdownMenuItem className="p-0">
            <Link
              to="/user/1"
              className={cn(
                "inline-block cursor-pointer text-[12px] leading-[1.2] font-medium uppercase md:text-sm",
                variant === "dark" ? "text-white" : "text-dark"
              )}
            >
              PROFILE
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <button
              type="button"
              onClick={openLogOut}
              className={cn(
                "flex cursor-pointer items-center gap-1 text-[12px] leading-[1.2] font-medium uppercase md:text-sm",
                variant === "dark" ? "text-white" : "text-dark"
              )}
            >
              LOG OUT
              <FIcon
                iconName="arrow-up-right"
                className="h-3 w-3 md:h-4 md:w-4"
              />
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
