import { NavLink, Outlet } from "react-router"

export function MainLayout() {
  return (
    <div>
      {/* header这一块儿相当于所有页面都有的内容，因此单独抽取到layout组件里面 */}
      <header>
        <strong>frontend-engineering-system2</strong>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>
      {/* outlet用于渲染pages里面具体的页面内容 */}
      <Outlet />
    </div>
  )
}
