import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="mx-auto w-full max-w-360">
      <header></header>

      <Outlet />
    </div>
  )
}
