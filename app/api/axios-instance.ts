import axios, { type AxiosRequestConfig, AxiosError } from "axios"
import { env } from "~/lib/env"
import type {
  ApiErrorSchema,
  ApiValidationErrorSchema,
} from "~/api/generated/model"

export const AXIOS_INSTANCE = axios.create({
  baseURL: env.VITE_BASE_API_URL,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
})

export type ApiErrorHTTP = ApiErrorSchema | ApiValidationErrorSchema
export type ApiError = AxiosError<ApiErrorHTTP>

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  })
    .then(({ data }) => data)
    .catch((error: AxiosError<ApiErrorHTTP>) => {
      throw error
    })

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
