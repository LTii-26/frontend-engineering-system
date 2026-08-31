import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/app/providers/ThemeProvider"
import type { ReactNode } from "react"

// 创建一个 QueryClient 的实例
const queryClient = new QueryClient()

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
