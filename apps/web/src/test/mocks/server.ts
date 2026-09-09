// 创建一个虚拟的服务器，客户端那边过来的请求，直接走该虚拟服务器的 handler 进行处理
import { setupServer } from "msw/node"

import { handlers } from "./handlers"

export const server = setupServer(...handlers)
