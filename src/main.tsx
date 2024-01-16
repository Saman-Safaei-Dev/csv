import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/vazirmatn/400.css'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import './styles/global.css'
import { ThemeContextProvider } from './contexts/Theme.tsx'

const queryClient = new QueryClient()
const rootEl = document.getElementById('root')!

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
