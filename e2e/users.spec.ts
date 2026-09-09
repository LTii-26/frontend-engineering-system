import { expect, test } from "@playwright/test"

const usersUrl = "https://api.e2e.test/users"

const users = [
  {
    id: "user-1",
    name: "张三",
    email: "ada@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "user-2",
    name: "李四",
    email: "grace@example.com",
    role: "member",
    status: "disabled",
  },
]

// 创建一个测试用例
// 从home页面跳转到user list页面
test("navigates from home to the user list", async ({ page }) => {
  await page.route(usersUrl, async (route) => {
    // 设置返回给真实浏览器的响应头
    await route.fulfill({
      status: 200,
      headers: {
        "access-control-allow-origin": "*",
      },
      json: users,
    })
  })

  // 先到首页
  await page.goto("/")

  // 因为现在到了首页
  // 首页也可以做一些断言
  await expect(
    page.getByRole("heading", {
      name: "frontend-engineering-system",
    }),
  ).toBeVisible()

  // 点击右上角的 Users 做跳转
  await page.getByRole("link", { name: "Users" }).click()

  // 检查浏览器地址栏是否包含 /users
  await expect(page).toHaveURL(/\/users$/)

  // 用户页面应该有一个标题，标题的内容是【用户】
  await expect(
    page.getByRole("heading", {
      name: "用户",
    }),
  ).toBeVisible()

  await expect(page.getByText("张三")).toBeVisible()

  await expect(page.getByText("ada@example.com")).toBeVisible()

  await expect(page.getByText("李四")).toBeVisible()
})
