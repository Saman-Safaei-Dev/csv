import { ThemeProvider, createTheme } from '@mui/material'
import { ReactNode, createContext, useMemo, useState } from 'react'

export const ThemeContext = createContext({
  switchMode: (isDark: boolean) => {
    console.log(isDark)
  },
  mode: 'light',
})

interface ThemeContextProviderProps {
  children?: ReactNode
}

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        typography: { fontFamily: 'inherit' },
      }),
    [mode]
  )

  const switchMode = (isDark: boolean) => {
    setMode(isDark ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ mode, switchMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
