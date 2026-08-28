import { RequireAuth } from "@/app/router/RequireAuth"
import { MainLayout } from "@/app/layouts/MainLayout"
import { createBrowserRouter } from "react-router"
import { NotFoundPage } from "@/pages/not-found"
import { HomePage } from "@/pages/home"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true, // index: true 表示它是父路由 / 的默认页面。
        Component: HomePage,
      },
      {
        // 表示这一组子路由先经过 RequireAuth
        Component: RequireAuth,
        children: [
          {
            path: "users",
            lazy: async () => {
              const { UserListPage } = await import("@/pages/users")

              return { Component: UserListPage }
            },
          },
          {
            path: "settings",
            // 懒加载
            lazy: async () => {
              const { SettingsPage } = await import("@/pages/settings")
              return { Component: SettingsPage }
            },
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
])
