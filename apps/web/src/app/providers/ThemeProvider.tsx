import { useEffect, useMemo, useState, type ReactNode } from "react"

import {
  applyTheme,
  readStoredTheme,
  ThemeContext,
  themeStorageKey,
  type Theme,
  type ThemeContextValue,
} from "@/app/providers/theme-context"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // theme： 是主题
  // setTheme：用于设置主题
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme())

  useEffect(() => {
    // 先应用主题，然后存储到本地
    applyTheme(theme)
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
