import { createContext, useContext } from "react"

type ModalContextValue = {
  closeModal: () => void
  openLogOut: () => void
  openSignIn: () => void
  openSignUp: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }

  return context
}

export { ModalContext, useModal }
export type { ModalContextValue }
