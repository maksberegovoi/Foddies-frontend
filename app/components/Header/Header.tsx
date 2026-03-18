import { useState } from "react"
import { matchPath, useLocation } from "react-router"
import Logo from "../Logo"
import Nav from "./Nav"
import AuthBar from "./AuthBar"
import UserBar from "./UserBar"
import MobileMenu from "./MobileMenu"
import FIcon from "../FIcon"
import { cn } from "../../lib/utils"

type HeaderProps = {
  isAuth?: boolean
}

type HeaderVariant = "dark" | "light"

export default function Header({ isAuth = false }: HeaderProps) {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isHomePage = pathname === "/"
  const isAddRecipePage = !!matchPath("/recipe/add", pathname)
  const isRecipePage = !!matchPath("/recipe/:id", pathname)
  const isUserPage = !!matchPath("/user/:id", pathname)

  const isProtectedPage = isAddRecipePage || isRecipePage || isUserPage
  const isAuthHeader = isAuth || isProtectedPage

  const variant: HeaderVariant =
    isHomePage || (!isAddRecipePage && !isRecipePage && !isUserPage)
      ? "dark"
      : "light"

  const navDisplayClass =
    isHomePage && !isAuthHeader ? "hidden min-[1024px]:flex" : "hidden md:flex"

  return (
    <>
      <div
        className={cn(isHomePage ? "absolute inset-x-0 top-5 z-20" : "mt-5")}
      >
        <div className="container mx-auto px-4 md:px-8">
          <header
            className={cn(
              "w-full",
              isHomePage
                ? "px-5 py-4 text-white lg:px-[60px]"
                : "rounded-[30px] px-5 py-3 md:py-4 lg:px-[60px]",
              !isHomePage &&
                (variant === "dark"
                  ? "bg-dark text-white"
                  : "bg-white text-dark")
            )}
          >
            <div className="relative flex items-center justify-between">
              <Logo variant={variant === "dark" ? "white" : "black"} />

              {(isHomePage || isAuthHeader) && (
                <div className="absolute left-1/2 -translate-x-1/2">
                  <Nav variant={variant} className={navDisplayClass} />
                </div>
              )}

              <div className="flex items-center gap-3">
                {isAuthHeader ? (
                  <UserBar variant={variant} />
                ) : isHomePage ? (
                  <AuthBar />
                ) : null}

                {isAuthHeader && (
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
