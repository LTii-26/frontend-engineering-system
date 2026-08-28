import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"

import { getUsers } from "@/entities/user"
import type { UserListScenario } from "@/entities/user"
import { PageTitle } from "@/shared/ui"

// 这个是一个工具方法
// 保证 value 必须是 Scenario 里面的 3 个值之一
function readScenario(value: string | null): UserListScenario {
  if (value === "empty" || value === "error") {
    return value
  }

  return "success"
}

export function UserListPage() {
  // 就是读取 parmas
  // 读取当前 URL 的查询参数，例如 /users?scenario=empty → { scenario: "empty" }
  const [searchParams] = useSearchParams()
  // 保证 scenario 一定是一个合法值
  const scenario = readScenario(searchParams.get("scenario"))

  // 这里就是利用 tanstack query
  // 1. queryFn -> 负责调用请求方法
  // 2. queryKey -> 缓存服务器状态数据
  const usersQuery = useQuery({
    queryKey: ["users", scenario],
    queryFn: () => getUsers(scenario),
    retry: false,
  })

  return (
    <main>
      <PageTitle title="用户" subtitle="Users are loaded through the shared request layer." />

      <nav aria-label="User list scenarios">
        {/* 模拟了三个场景：成功、数据为空、错误 */}
        {/* 通过传递不同的 url 查询参数来做的 */}
        <Link to="/users">成功</Link> <Link to="/users?scenario=empty">数据为空</Link>{" "}
        <Link to="/users?scenario=error">错误</Link>
      </nav>

      {/* 根据 usersQuery 的不同状态来做不同的事情 */}

      {usersQuery.isPending ? <p>加载用户列表中...</p> : null}

      {usersQuery.isError ? (
        <section>
          <p>加载用户列表失败</p>
          <button type="button" onClick={() => usersQuery.refetch()}>
            重试
          </button>
        </section>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length === 0 ? <p>未找到相关用户</p> : null}

      {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
        <ul>
          {usersQuery.data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} - {user.role} - {user.status}
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
