import { createContext, useState } from "react"

type SignInStore = {
  getSnapshot: () => boolean
  subscribe: (listener: () => void) => () => void
  setSignedIn: (nextValue: boolean) => void
}

const SignInContext = createContext<SignInStore | null>(null)

function createSignInStore(initialState = false): SignInStore {
  let isSignedIn = initialState
  const listeners = new Set<() => void>()

  return {
    getSnapshot: () => isSignedIn,
    subscribe: (listener) => {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },
    setSignedIn: (nextValue) => {
      if (isSignedIn === nextValue) {
        return
      }

      isSignedIn = nextValue

      listeners.forEach((listener) => {
        listener()
      })
    },
  }
}

function SignInProvider({
  children,
  initialSignedIn = false,
}: {
  children: React.ReactNode
  initialSignedIn?: boolean
}) {
  const [store] = useState(() => createSignInStore(initialSignedIn))

  return (
    <SignInContext.Provider value={store}>{children}</SignInContext.Provider>
  )
}

export { SignInContext, SignInProvider }
