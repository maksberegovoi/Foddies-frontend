import { useState } from "react"
import { matchPath, useLocation } from "react-router"
import Logo from "../Logo"
import Nav from "./Nav"
import AuthBar from "./AuthBar"
import UserBar from "./UserBar"
import MobileMenu from "./MobileMenu"
import sprite from "../../assets/icons/sprite.svg"
import { cn } from "../../lib/utils"

type HeaderProps = {
  isAuthenticated?: boolean
}

type HeaderVariant = "dark" | "light"

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const variant = getHeaderVariant(pathname)
  const isHomePage = pathname === "/"
  const burgerId = variant === "dark" ? "burger-white" : "burger-black"
  const showNav = isAuthenticated || isHomePage
  const navBreakpoint = isAuthenticated ? "md:block" : "lg:block"

  return (
    <>
      <div
        className={cn(
          isHomePage ? "absolute inset-x-5 top-5 z-20" : "mx-5 mt-5"
        )}
      >
        <header
          className={cn(
            "w-full",
            isHomePage
              ? "px-5 py-4 text-white md:px-8 lg:px-[60px]"
              : "rounded-[30px] px-5 py-3 md:px-8 md:py-4 lg:px-[60px]",
            !isHomePage &&
              (variant === "dark" ? "bg-dark text-white" : "bg-white text-dark")
          )}
        >
          <div className="relative flex items-center justify-between">
            <Logo variant={variant === "dark" ? "white" : "black"} />

            {showNav && (
              <div
                className={cn(
                  "absolute left-1/2 hidden -translate-x-1/2",
                  navBreakpoint
                )}
              >
                <Nav variant={variant} />
              </div>
            )}

            <div className="flex items-center gap-3">
              {isAuthenticated ? <UserBar variant={variant} /> : <AuthBar />}

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <svg className="h-6 w-6">
                    <use href={`${sprite}#${burgerId}`} />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

function getHeaderVariant(pathname: string): HeaderVariant {
  if (pathname === "/") return "dark"
  if (matchPath("/recipe/add", pathname)) return "light"
  if (matchPath("/recipe/:id", pathname)) return "light"
  if (matchPath("/user/:id", pathname)) return "light"
  return "dark"
}
