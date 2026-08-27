import { PageTitle } from "@/shared/ui"
import { env } from "@/shared/config"

export function HomePage() {
  return (
    <main>
      <PageTitle title="frontend-engineering-system" subtitle="工程管理实战" />
      <p>路径别名已生效</p>
      <dl>
        <dt>环境变量信息</dt>
        <dd>{env.appEnv}</dd>
        <dt>API Base URL</dt>
        <dd>{env.apiBaseUrl}</dd>
        <dt>Mock Enabled</dt>
        <dd>{env.enableMock ? "yes" : "no"}</dd>
      </dl>
    </main>
  )
}
