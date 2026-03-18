import { useEffect } from "react"
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router"

import { getInitialSignedInState } from "~/lib/auth-guard"
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"
import { SignInProvider } from "~/components/auth/sign-in-context"
import { useModal } from "~/components/modals/modal-context"
import { ModalProvider } from "~/components/modals/modal-provider"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export async function clientLoader() {
  const isSignedIn = await getInitialSignedInState()

  return { isSignedIn }
}

export default function Layout() {
  const { isSignedIn } = useLoaderData<typeof clientLoader>()

  return (
    <SignInProvider initialSignedIn={isSignedIn}>
      <ModalProvider>
        <ModalSearchBridge />
        <div className="container mx-auto">
          <Header />

          <main>
            <Outlet />
          </main>

          <Footer />
        </div>
      </ModalProvider>
    </SignInProvider>
  )
}

function ModalSearchBridge() {
  const isSignedIn = useIsSignedIn()
  const location = useLocation()
  const navigate = useNavigate()
  const { openSignIn } = useModal()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("modal") !== "sign-in") {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.delete("modal")

    if (!isSignedIn) {
      openSignIn()
    }

    const nextSearch = nextSearchParams.toString()
    void navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true }
    )
  }, [isSignedIn, location.pathname, navigate, openSignIn, searchParams])

  return null
}
