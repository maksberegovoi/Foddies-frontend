import { getUsersCurrent } from "~/api/generated/endpoints/user/user"
import { withErrorHandling } from "~/lib/api-error-handler"

export async function getInitialSignedInState() {
  try {
    await withErrorHandling(getUsersCurrent(), [401, 404])

    return true
  } catch {
    return false
  }
}
