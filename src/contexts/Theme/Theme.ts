import { createContext } from 'react'
import type { ThemeContextValue } from './Theme.types'

export const ThemeContext = createContext<ThemeContextValue>(null)

export * from './ThemeProvider'
export * from './Theme.types'
