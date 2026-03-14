import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

type ActiveAuthTab = "signin" | "signup"

export default function AuthBar() {
  const [activeTab, setActiveTab] = useState<ActiveAuthTab>("signin")

  return (
    <div className="flex items-center rounded-full border border-white bg-white p-[2px]">
      <Button
        type="button"
        onClick={() => setActiveTab("signin")}
        className={cn(
          "rounded-full px-7 py-[14px] text-sm font-medium uppercase transition-colors",
          activeTab === "signin"
            ? "bg-dark text-white hover:bg-dark"
            : "bg-transparent text-dark hover:bg-transparent"
        )}
      >
        Sign in
      </Button>

      <Button
        type="button"
        onClick={() => setActiveTab("signup")}
        className={cn(
          "rounded-full px-7 py-[14px] text-sm font-medium uppercase transition-colors",
          activeTab === "signup"
            ? "bg-dark text-white hover:bg-dark"
            : "bg-transparent text-dark hover:bg-transparent"
        )}
      >
        Sign up
      </Button>
    </div>
  )
}
