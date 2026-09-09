import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";


// Button组件相关的一组测试用例（多个 it）
describe("Button", () => {
  // 测试按钮组件能够正常渲染，以及 name 是否正确
  it("renders its accessible name", () => {
    render(<Button>这是一个按钮</Button>)

    expect(screen.getByRole("button", { name: "这是一个按钮" })).toBeInTheDocument()
  })

  // 按钮组件的默认 type 值应该是 button
  it("uses button type by default", () => {
    render(<Button>这是一个按钮</Button>)

    expect(screen.getByRole("button", { name: "这是一个按钮" })).toHaveAttribute("type", "button")
  })

  // 测试点击事件
  it("calls onClick when the user clicks", async () => {
    const user = userEvent.setup()

    const handleClick = vi.fn()

    // 渲染 Button 组件，但是挂了点击事件上去的
    render(<Button onClick={handleClick}>Save changes</Button>)

    // 模拟用户点击
    await user.click(screen.getByRole("button", { name: "Save changes" }))

    // 接下来就是做断言
    // 断言内容：handleClick这个函数被调用了1次
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // 测试禁用状态
  it("does not respond when disabled", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    // 渲染组件，但是组件是disabled状态
    render(
      <Button disabled onClick={handleClick}>
        Save changes
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Save changes" })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
