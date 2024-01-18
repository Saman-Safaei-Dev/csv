import type { ReactNode } from 'react'

export type ThemeContextValue = {
  switchMode: (isDark: boolean) => void
  mode: ThemeMode
} | null

export type ThemeContextProviderProps = {
  children?: ReactNode
}

export type ThemeMode = 'light' | 'dark'
