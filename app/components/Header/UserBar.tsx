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
import Text from "~/components/Text"
import { useGetUsersCurrent } from "~/api/generated/endpoints/user/user"

type UserBarProps = {
  variant?: "dark" | "light"
}

export default function UserBar({ variant = "dark" }: UserBarProps) {
  const { openLogOut } = useModal()
  const { data } = useGetUsersCurrent()
  const user = data?.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex cursor-pointer items-center overflow-hidden rounded-full",
          variant === "dark" ? "bg-light-dark" : "bg-dark"
        )}
      >
        <img
          src={user?.avatarURL || "/fallback_ava.png"}
          alt={user?.name}
          className="h-8 w-8 shrink-0 rounded-full object-cover md:h-12.5 md:w-12.5"
        />

        <div className="md:py-3.9 flex items-center gap-1 p-1.5 md:pr-3.5 md:pl-1.5">
          <Text
            as={"span"}
            className="text-xs leading-4.5 font-bold tracking-[-0.24px] text-white uppercase"
          >
            {user?.name}
          </Text>

          <FIcon
            iconName="chevron-down"
            className="size-4.5 shrink-0 text-white transition-transform"
          />
        </div>
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
              to={`/user/${user?.id}`}
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
