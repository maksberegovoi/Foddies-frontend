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
import { toast } from "sonner"
import type { SignInDto, SignUpDto } from "~/api/generated/model"
import type { ApiErrorHTTP } from "~/api/axios-instance"
import axios from "axios"

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

export function getErrorMessage(error: unknown): string | null {
  if (import.meta.env.DEV) console.log(error)

  if (axios.isAxiosError<ApiErrorHTTP>(error)) {
    const status = error.response?.status
    const errorData = error.response?.data

    if (status === 400) {
      return "Please check the form for errors."
    }

    if (status === 409) {
      return "User with this email already exists."
    }

    if (errorData?.message) {
      return errorData.message
    }
  }

  if (error instanceof Error) {
    return error.message
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

  const onSubmitSignIn = (values: SignInDto) => {
    signInMutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          setSignedIn(true)
          modalStore.setModal(null)
          toast.success("Successfully signed in!")
        },
        onError: (error) => {
          const message =
            getErrorMessage(error) ||
            "Failed to sign in, please try again later"
          toast.error(message)
        },
      }
    )
  }

  const onSubmitSignUp = (values: SignUpDto) => {
    signUpMutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast.success("Registration successful! Please sign in.")
          modalStore.setModal("sign-in")
        },
        onError: (error) => {
          const message = getErrorMessage(error) || "Registration failed"
          toast.error(message)
        },
      }
    )
  }

  return (
    <>
      <SignInModal
        isLoading={signInMutation.isPending}
        isError={signInMutation.isError}
        onResetError={() => signInMutation.reset()}
        onOpenChange={(open) => {
          if (!open) {
            signInMutation.reset()
            modalStore.setModal(null)
          }
        }}
        onSubmit={onSubmitSignIn}
        onSwitchToSignUp={() => modalStore.setModal("sign-up")}
        open={activeModal === "sign-in"}
      />

      <SignUpModal
        isLoading={signUpMutation.isPending}
        isError={signUpMutation.isError}
        onResetError={() => signUpMutation.reset()}
        onOpenChange={(open) => {
          if (!open) {
            signUpMutation.reset()
            modalStore.setModal(null)
          }
        }}
        onSubmit={onSubmitSignUp}
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
