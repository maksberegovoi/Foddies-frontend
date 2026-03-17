import { useMemo, useState } from "react"

import {
  ModalContext,
  type ModalContextValue,
} from "~/components/modals/modal-context"
import { LogOutModal } from "~/components/modals/log-out-modal"
import { SignInModal } from "~/components/modals/sign-in-modal"
import { SignUpModal } from "~/components/modals/sign-up-modal"

type ModalType = "log-out" | "sign-in" | "sign-up" | null

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const value = useMemo<ModalContextValue>(
    () => ({
      closeModal: () => setActiveModal(null),
      openLogOut: () => setActiveModal("log-out"),
      openSignIn: () => setActiveModal("sign-in"),
      openSignUp: () => setActiveModal("sign-up"),
    }),
    []
  )

  return (
    <ModalContext.Provider value={value}>
      {children}

      <SignInModal
        onOpenChange={(open) => {
          if (!open) {
            setActiveModal(null)
          }
        }}
        onSwitchToSignUp={() => setActiveModal("sign-up")}
        open={activeModal === "sign-in"}
      />

      <SignUpModal
        onOpenChange={(open) => {
          if (!open) {
            setActiveModal(null)
          }
        }}
        onSwitchToSignIn={() => setActiveModal("sign-in")}
        open={activeModal === "sign-up"}
      />

      <LogOutModal
        onOpenChange={(open) => {
          if (!open) {
            setActiveModal(null)
          }
        }}
        open={activeModal === "log-out"}
      />
    </ModalContext.Provider>
  )
}

export { ModalProvider }
