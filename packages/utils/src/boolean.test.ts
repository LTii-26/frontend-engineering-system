import { describe, expect, it } from "vitest";

// describe ： 创建一组测试用例，一个 describe 里面会有多个 it
// expect：做断言
// it ： 描述一个测试用例
// 引入源码中要测试的工具函数
import { readBoolean } from "./boolean.js";


// 一个工具方法对应一个 describe
describe("readBoolean", () => {
  // 一组测试用例
  // 1. 测试用例的描述
  // 2. 回调函数：断言
  it('returns true for "true"', () => {
    expect(readBoolean("true")).toBe(true)
  })

  it('returns false for "false"', () => {
    expect(readBoolean("false")).toBe(false)
  })
})
