import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

import { ThemeContext } from './Theme'

import type { ThemeContextProviderProps, ThemeMode } from './Theme.types'

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light')
  
  const theme = createTheme({
    palette: { mode },
    typography: { fontFamily: 'inherit' },
  })

  const switchMode = (isDark: boolean) => {
    setMode(isDark ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ mode, switchMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
