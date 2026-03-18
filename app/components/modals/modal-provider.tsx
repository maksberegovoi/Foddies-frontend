import { useMemo, useSyncExternalStore } from "react"

import {
  ModalContext,
  type ModalContextValue,
} from "~/components/modals/modal-context"
import { useSignInActions } from "~/components/auth/sign-in-hooks"
import { LogOutModal } from "~/components/modals/log-out-modal"
import { SignInModal } from "~/components/modals/sign-in-modal"
import { SignUpModal } from "~/components/modals/sign-up-modal"
import {
  usePostAuthSignin,
  usePostAuthSignup,
  usePostAuthSignout,
} from "~/api/generated/endpoints/auth/auth"

type ModalType = "log-out" | "sign-in" | "sign-up" | null

type ModalStore = {
  getSnapshot: () => ModalType
  subscribe: (listener: () => void) => () => void
  setModal: (nextModal: ModalType) => void
}

function createModalStore(initialState: ModalType = null): ModalStore {
  let currentModal = initialState
  const listeners = new Set<() => void>()

  return {
    getSnapshot: () => currentModal,
    subscribe: (listener) => {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },
    setModal: (nextModal) => {
      if (currentModal === nextModal) {
        return
      }

      currentModal = nextModal

      listeners.forEach((listener) => {
        listener()
      })
    },
  }
}

const modalStore = createModalStore()

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: unknown }).response !== null
  ) {
    const response = (error as { response?: { data?: unknown } }).response

    if (
      response &&
      typeof response.data === "object" &&
      response.data !== null &&
      "message" in response.data &&
      typeof (response.data as { message?: unknown }).message === "string"
    ) {
      return (response.data as { message: string }).message
    }
  }

  return null
}

function ModalHost() {
  const { setSignedIn } = useSignInActions()
  const signInMutation = usePostAuthSignin()
  const signUpMutation = usePostAuthSignup()
  const signOutMutation = usePostAuthSignout()

  const activeModal = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getSnapshot
  )

  return (
    <>
      <SignInModal
        errorMessage={getErrorMessage(signInMutation.error)}
        isLoading={signInMutation.isPending}
        onOpenChange={(open) => {
          if (!open) {
            signInMutation.reset()
            modalStore.setModal(null)
          }
        }}
        onSubmit={async (values) => {
          await signInMutation.mutateAsync({ data: values })
          setSignedIn(true)
          modalStore.setModal(null)
        }}
        onSwitchToSignUp={() => modalStore.setModal("sign-up")}
        open={activeModal === "sign-in"}
      />

      <SignUpModal
        errorMessage={getErrorMessage(signUpMutation.error)}
        isLoading={signUpMutation.isPending}
        onOpenChange={(open) => {
          if (!open) {
            signUpMutation.reset()
            modalStore.setModal(null)
          }
        }}
        onSubmit={async (values) => {
          await signUpMutation.mutateAsync({ data: values })
          setSignedIn(true)
          modalStore.setModal(null)
        }}
        onSwitchToSignIn={() => modalStore.setModal("sign-in")}
        open={activeModal === "sign-up"}
      />

      <LogOutModal
        isLoading={signOutMutation.isPending}
        onConfirm={async () => {
          await signOutMutation.mutateAsync()
          setSignedIn(false)
          modalStore.setModal(null)
        }}
        onOpenChange={(open) => {
          if (!open) {
            signOutMutation.reset()
            modalStore.setModal(null)
          }
        }}
        open={activeModal === "log-out"}
      />
    </>
  )
}

function ModalProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<ModalContextValue>(
    () => ({
      closeModal: () => modalStore.setModal(null),
      openLogOut: () => modalStore.setModal("log-out"),
      openSignIn: () => modalStore.setModal("sign-in"),
      openSignUp: () => modalStore.setModal("sign-up"),
    }),
    []
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalHost />
    </ModalContext.Provider>
  )
}

export { ModalProvider }
