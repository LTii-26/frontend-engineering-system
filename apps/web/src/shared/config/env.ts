import { readBoolean } from "@frontend-engineering-system/utils"

type AppEnv = "development" | "staging" | "production"

type EnvConfig = {
  appEnv: AppEnv
  apiBaseUrl: string
  enableMock: boolean
  enableMonitoring: boolean
  isDevelopment: boolean
  isStaging: boolean
  isProduction: boolean
}

// 导出了一个 env 环境对象
// 该对象就会通过 import.meta.env 去读取环境配置文件里面的环境变量
// 后面的业务代码直接使用 env 这个对象来拿到环境变量的值
export const env: EnvConfig = {
  appEnv: import.meta.env.VITE_APP_ENV,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  enableMock: readBoolean(import.meta.env.VITE_ENABLE_MOCK),
  enableMonitoring: readBoolean(import.meta.env.VITE_ENABLE_MONITORING),
  isDevelopment: import.meta.env.VITE_APP_ENV === "development",
  isStaging: import.meta.env.VITE_APP_ENV === "staging",
  isProduction: import.meta.env.VITE_APP_ENV === "production",
}
