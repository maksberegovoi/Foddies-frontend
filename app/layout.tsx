import { Outlet } from "react-router"
import { ModalProvider } from "~/components/modals/modal-provider"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export default function Layout() {
  return (
    <ModalProvider>
      <div className="mx-auto w-full max-w-360">
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </ModalProvider>
  )
}
