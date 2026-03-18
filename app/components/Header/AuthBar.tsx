import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useModal } from "../modals/modal-context"

type ActiveAuthTab = "signin" | "signup"

const tabs: { value: ActiveAuthTab; label: string }[] = [
  { value: "signin", label: "Sign in" },
  { value: "signup", label: "Sign up" },
]

export default function AuthBar() {
  const [activeTab, setActiveTab] = useState<ActiveAuthTab>("signin")
  const { openSignIn, openSignUp } = useModal()

  const handleClick = (value: ActiveAuthTab) => {
    setActiveTab(value)

    if (value === "signin") {
      openSignIn()
    } else {
      openSignUp()
    }
  }

  return (
    <div className="flex items-center gap-[2px] rounded-[30px] border border-white bg-white p-[2px]">
      {tabs.map(({ value, label }) => (
        <Button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          className={cn(
            "h-[38px] min-w-[80px] rounded-[30px] px-4 py-[10px] text-[12px] leading-none font-medium uppercase transition-colors md:h-auto md:min-w-0 md:px-6 md:py-3 md:text-sm",
            activeTab === value
              ? "bg-dark text-white hover:bg-dark"
              : "bg-transparent text-dark hover:bg-transparent"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
