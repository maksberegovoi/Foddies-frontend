import axios, { type AxiosRequestConfig, AxiosError } from "axios"

// Твой базовый URL бэкенда
export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_BASE, // замени на свой
  withCredentials: true,
})

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
