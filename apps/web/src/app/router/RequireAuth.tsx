import { Navigate, Outlet, useLocation } from "react-router"

// 是否具备权限
// 因为目前是预留一个权限扩展位，因此暂时把这里做一个硬编码
const isAuthenticated = true

export function RequireAuth() {
  const location = useLocation()

  if (!isAuthenticated) {
    // 如果没有权限，会进入此 if
    // 这里面直接导航到首页
    return <Navigate to="/" replace state={{ from: location }} />
  }

  // 代码走到这里，说明有权限，正常跳转
  return <Outlet />
}
