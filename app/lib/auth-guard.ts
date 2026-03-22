import {
  getGetUsersCurrentQueryKey,
  getUsersCurrent,
} from "~/api/generated/endpoints/user/user"
import { withErrorHandling } from "~/lib/api-error-handler"
import { queryClient } from "~/api/query-client"

export async function getInitialSignedInState() {
  try {
    await withErrorHandling(
      queryClient.ensureQueryData({
        queryKey: getGetUsersCurrentQueryKey(),
        queryFn: ({ signal }) => getUsersCurrent(signal),
      }),
      [401, 404]
    )

    return true
  } catch {
    return false
  }
}
