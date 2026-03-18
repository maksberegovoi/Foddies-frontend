import { useState } from "react"
import { useLocation } from "react-router"
import Logo from "../Logo"
import Nav from "./Nav"
import AuthBar from "./AuthBar"
import UserBar from "./UserBar"
import MobileMenu from "./MobileMenu"
import FIcon from "../FIcon"
import { cn } from "../../lib/utils"
import { useIsSignedIn } from "../auth/sign-in-hooks"

type HeaderVariant = "dark" | "light"

export default function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isSignedIn = useIsSignedIn()

  const isHomePage = pathname === "/"

  const variant: HeaderVariant = isHomePage ? "dark" : "light"

  const navDisplayClass =
    isHomePage && !isSignedIn ? "hidden min-[1024px]:flex" : "hidden md:flex"

  return (
    <>
      <div
        className={cn(
          isHomePage ? "absolute top-2 z-20 container md:top-5" : "mt-5"
        )}
      >
        <div className="mx-auto px-4 md:px-8 lg:px-20">
          <header
            className={cn(
              "w-full",
              isHomePage
                ? "px-2 py-4 text-white md:px-5"
                : "rounded-[30px] py-3 md:py-4",
              !isHomePage &&
                (variant === "dark"
                  ? "bg-dark text-white"
                  : "bg-white text-dark")
            )}
          >
            <div className="relative flex items-center justify-between">
              <Logo variant={variant === "dark" ? "white" : "black"} />

              {(isHomePage || isSignedIn) && (
                <div className="absolute left-1/2 -translate-x-1/2">
                  <Nav variant={variant} className={navDisplayClass} />
                </div>
              )}

              <div className="flex items-center gap-3">
                {isSignedIn ? (
                  <UserBar variant={variant} />
                ) : isHomePage ? (
                  <AuthBar />
                ) : null}

                {isSignedIn && (
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
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
