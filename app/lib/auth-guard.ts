import { redirect } from "react-router"

import { getUsersCurrent } from "~/api/generated/endpoints/user/user"

async function getInitialSignedInState() {
  try {
    await getUsersCurrent()

    return true
  } catch {
    return false
  }
}

async function requireSignedIn(redirectTo = "/?modal=sign-in") {
  const isSignedIn = await getInitialSignedInState()

  if (!isSignedIn) {
    throw redirect(redirectTo)
  }
}

export { getInitialSignedInState, requireSignedIn }
