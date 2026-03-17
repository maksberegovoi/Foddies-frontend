import { Outlet } from "react-router"

import { ModalProvider } from "~/components/modals/modal-provider"

export default function Layout() {
  return (
    <ModalProvider>
      <div className="mx-auto w-full max-w-360">
        <header></header>

        <Outlet />
      </div>
    </ModalProvider>
  )
}
