// 使用 msw 模拟服务器的行为
import { delay, http, HttpResponse } from "msw"

import type { User } from "@/entities/user"

import { mockUsers } from "./users"

const usersUrl = "https://api.example.test/users"

export const handlers = [
  http.get(usersUrl, () => {
    return HttpResponse.json(mockUsers)
  }),
]

// 模拟请求成功
export function createUsersSuccessHandler(users: User[] = mockUsers) {
  return http.get(usersUrl, () => {
    return HttpResponse.json(users)
  })
}

// 请求出现 Error 的情况
export function createUsersErrorHandler() {
  return http.get(usersUrl, () => {
    return new HttpResponse(null, { status: 500 })
  })
}

// Retry 的情况
export function createUsersRetryHandler() {
  let requestCount = 0 // 请求次数

  return http.get(usersUrl, () => {
    requestCount += 1

    if (requestCount === 1) {
      return new HttpResponse(null, { status: 500 })
    }

    return HttpResponse.json(mockUsers)
  })
}

export function createUsersDelayedHandler() {
  return http.get(usersUrl, async () => {
    await delay(300)

    return HttpResponse.json(mockUsers)
  })
}
