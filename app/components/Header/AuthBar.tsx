import { useState } from "react"
import { Button } from "../ui/button"

type AuthBarProps = {
  variant?: "dark" | "light"
}

type ActiveAuthTab = "signin" | "signup"

export default function AuthBar({ variant = "dark" }: AuthBarProps) {
  const [activeTab, setActiveTab] = useState<ActiveAuthTab>("signin")

  const wrapperClass =
    variant === "dark"
      ? "flex items-center rounded-full bg-light-dark p-1"
      : "flex items-center rounded-full bg-light-dark p-1"

  const getButtonClass = (tab: ActiveAuthTab) => {
    const isActive = activeTab === tab

    if (isActive) {
      return "h-11 rounded-full bg-white px-6 text-sm font-medium uppercase text-dark hover:bg-white"
    }

    return "h-11 rounded-full bg-transparent px-6 text-sm font-medium uppercase text-white hover:bg-transparent"
  }

  const handleSignInClick = () => {
    setActiveTab("signin")
    console.log("Open SignInModal")
  }

  const handleSignUpClick = () => {
    setActiveTab("signup")
    console.log("Open SignUpModal")
  }

  return (
    <div className={wrapperClass}>
      <Button
        type="button"
        onClick={handleSignInClick}
        className={getButtonClass("signin")}
      >
        Sign in
      </Button>

      <Button
        type="button"
        onClick={handleSignUpClick}
        className={getButtonClass("signup")}
      >
        Sign up
      </Button>
    </div>
  )
}
