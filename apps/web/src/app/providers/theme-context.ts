import { createContext } from "react"

// 主题只有这3个值
export type Theme = "light" | "dark" | "brand"

export type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// 这个字符串充当 localStorage 里面的 key
// 主题是要保存在用户本地，方便用户下次进来的时候还是上次选择的主题
export const themeStorageKey = "frontend-engineering-system:theme"

// 创建一个主题相关的上下文，导出出去
export const ThemeContext = createContext<ThemeContextValue | null>(null)

// 工具方法，判断传入的 value 是否是主题值
export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "brand"
}

// 从本地读取存储的主题值
export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)

  return isTheme(storedTheme) ? storedTheme : "light"
}

// 应用主题：将传入的主题挂到自定义属性上面，相当于设置 data-theme 的值
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
