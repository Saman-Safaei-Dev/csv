import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/vazirmatn/400.css'
import { CssBaseline } from '@mui/material'

import App from './App.tsx'
import './styles/global.css'
import { ThemeContextProvider } from './contexts/Theme.tsx'

const rootEl = document.getElementById('root')!

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CssBaseline />
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
)
