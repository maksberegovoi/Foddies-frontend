import "./lib/env"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "~/api/query-client"
import { Toaster } from "sonner"
import NotFoundPage from "~/routes/not-found/route"
import Title from "~/components/Title"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "notification",
              success: "notification-success",
              error: "notification-error",
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (import.meta.env.DEV) console.log(error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />
    }
    if (error.status === 500) {
      return (
        <main className="mx-auto flex h-screen flex-col items-center justify-center p-4 text-white">
          <p className="mt-4 text-center text-2xl text-dark">
            Server error. We are working on it...
          </p>
        </main>
      )
    }
  }

  return (
    <main className="mx-auto p-4 pt-16">
      <Title className="text-center text-destructive">Critical Error</Title>
    </main>
  )
}
