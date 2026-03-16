import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

type ActiveAuthTab = "signin" | "signup"

const tabs: { value: ActiveAuthTab; label: string }[] = [
  { value: "signin", label: "Sign in" },
  { value: "signup", label: "Sign up" },
]

export default function AuthBar() {
  const [activeTab, setActiveTab] = useState<ActiveAuthTab>("signin")

  return (
    <div className="flex items-center rounded-full border border-white bg-white p-[2px]">
      {tabs.map(({ value, label }) => (
        <Button
          key={value}
          type="button"
          onClick={() => setActiveTab(value)}
          className={cn(
            "rounded-full px-7 py-[14px] text-sm font-medium uppercase transition-colors",
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
