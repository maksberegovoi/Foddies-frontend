import { Outlet } from "react-router"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export default function Layout() {
  return (
    <div className="mx-auto w-full max-w-360">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
