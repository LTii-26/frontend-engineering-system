import { AppProviders } from "@/app/providers/AppProviders"
import { RouterProvider } from "react-router/dom"
import { router } from "@/app/router/router"

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
