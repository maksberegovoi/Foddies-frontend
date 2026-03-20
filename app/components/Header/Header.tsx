import { useState } from "react"
import { useLocation } from "react-router"

import Nav from "./Nav"
import Logo from "../Logo"
import FIcon from "../FIcon"
import AuthBar from "./AuthBar"
import UserBar from "./UserBar"
import { cn } from "../../lib/utils"
import MobileMenu from "./MobileMenu"
import { useIsSignedIn } from "../auth/sign-in-hooks"

type HeaderProps = {
  isAuth: boolean
}

type HeaderVariant = "dark" | "light"

export default function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isLoggedIn = useIsSignedIn()

  const isPageHasHero = pathname === "/" || pathname.includes("/category/")

  const variant: HeaderVariant = isPageHasHero ? "dark" : "light"

  return (
    <>
      <header
        className={cn("mt-6 md:mt-10 md:px-12!", {
          "absolute inset-x-0 z-20 container": isPageHasHero,
        })}
      >
        <div className="relative flex items-center justify-between gap-2">
          <Logo variant={variant} />

          {isLoggedIn && (
            <Nav
              variant={variant}
              className={cn(
                "absolute left-1/2 -translate-x-1/2",
                "hidden md:flex"
              )}
            />
          )}

          <div className="flex items-center gap-3">
            {isLoggedIn ? <UserBar variant={variant} /> : <AuthBar />}

            {isLoggedIn && (
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center md:hidden",
                  variant === "dark" ? "text-white" : "text-dark"
                )}
                aria-label="Open menu"
              >
                <FIcon iconName="burger" className="h-5 w-6 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
