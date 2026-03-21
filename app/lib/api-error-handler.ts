import { isAxiosError } from "axios"

export async function withErrorHandling<T>(
  promise: Promise<T>,
  excludeStatuses: number[] = [401]
): Promise<T> {
  try {
    return await promise
  } catch (error) {
    if (isAxiosError(error)) {
      if (!error.response) {
        throw new Response("Server is unreachable", { status: 500 })
      }

      const status = error.response.status

      if (excludeStatuses.includes(status)) {
        throw error
      }

      throw new Response(error.response.statusText, {
        status: error.response.status,
      })
    }

    throw error
  }
}
