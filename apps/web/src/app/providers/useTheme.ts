import { useContext } from "react"

import { ThemeContext } from "@/app/providers/theme-context"

export function useTheme() {
  // 从上下文里面去拿主题值
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return value
}
