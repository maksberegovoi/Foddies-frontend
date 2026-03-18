import { getUsersCurrent } from "~/api/generated/endpoints/user/user"

export async function getInitialSignedInState() {
  try {
    await getUsersCurrent()

    return true
  } catch {
    return false
  }
}
