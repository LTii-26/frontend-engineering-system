import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";


// Card 组件相关的一组测试用例（多个 it）
describe("Card", () => {
  // 测试卡片能够正常渲染为 section，并展示 children
  it("renders children inside a section", () => {
    const { container } = render(
      <Card>
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(container.querySelector("section")).toBeInTheDocument()
    expect(screen.getByText("All checks have passed.")).toBeInTheDocument()
  })

  // 有 title / description 时，应该渲染对应的标题和描述
  it("renders title and description when provided", () => {
    render(
      <Card title="Project status" description="View the latest status of the current project.">
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(screen.getByRole("heading", { level: 2, name: "Project status" })).toBeInTheDocument()
    expect(screen.getByText("View the latest status of the current project.")).toBeInTheDocument()
  })

  // 没有 title / description 时，不应该渲染 header
  it("does not render a header without title or description", () => {
    const { container } = render(
      <Card>
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(container.querySelector("header")).toBeNull()
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  // 有 footer 时，应该渲染 footer 内容
  it("renders footer content when provided", () => {
    render(
      <Card footer={<button type="button">View details</button>}>
        <p>The package is ready to publish.</p>
      </Card>,
    )

    expect(screen.getByRole("button", { name: "View details" })).toBeInTheDocument()
    expect(screen.getByText("The package is ready to publish.")).toBeInTheDocument()
  })

  // 没有 footer 时，不应该渲染 footer 元素
  it("does not render a footer when none is provided", () => {
    const { container } = render(
      <Card title="Project status">
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(container.querySelector("footer")).toBeNull()
  })

  // 自定义 className 和原生属性应该能够透传
  it("merges className and forwards section props", () => {
    render(
      <Card aria-label="Status card" className="custom-card" data-testid="status-card">
        <p>All checks have passed.</p>
      </Card>,
    )

    const card = screen.getByRole("region", { name: "Status card" })

    expect(card).toHaveAttribute("data-testid", "status-card")
    expect(card).toHaveClass("custom-card")
  })
})
