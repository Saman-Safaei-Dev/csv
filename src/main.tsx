import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import { ThemeContextProvider } from './contexts'

import './styles/global.css'
import '@fontsource/vazirmatn/400.css'

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
