import { useContext, useSyncExternalStore } from "react"

import { SignInContext } from "~/components/auth/sign-in-context"

function useSignInStore() {
  const context = useContext(SignInContext)

  if (!context) {
    throw new Error("useIsSignedIn must be used within a SignInProvider")
  }

  return context
}

function useIsSignedIn() {
  const store = useSignInStore()

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  )
}

function useSignInActions() {
  const store = useSignInStore()

  return {
    setSignedIn: store.setSignedIn,
  }
}

export { useIsSignedIn, useSignInActions }
