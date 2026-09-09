import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import type { ReactElement } from "react"

import { MemoryRouter } from "react-router"

// ui : 就是要渲染的页面
export function renderWithProviders(ui: ReactElement) {
  // QueryClient 的实例化是放在里面的
  // 因为我们就是需要每一次都是全新的状态
  // 每一次测试都是独立的QueryClient实例和缓存
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/users"]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  )
}
