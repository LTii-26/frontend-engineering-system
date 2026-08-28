import { env } from "@/shared/config"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type HttpRequestOptions = {
  method?: HttpMethod
  signal?: AbortSignal
}

export class HttpError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "HttpError"
    this.status = status
  }
}

function createUrl(path: string) {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${baseUrl}${normalizedPath}`
}

// Get 方法
export async function httpGet<TData>(path: string, options: HttpRequestOptions = {}) {
  const response = await fetch(createUrl(path), {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
    },
    signal: options.signal,
  })

  // 非正常响应
  if (!response.ok) {
    throw new HttpError("Request failed", response.status)
  }

  return (await response.json()) as TData
}
