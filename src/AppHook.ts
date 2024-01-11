import { useCallback, useContext, useEffect, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'
import { ThemeContext } from './contexts/Theme'
import useSWR from 'swr'
import { latestDataQuery } from './api/table-data'
import { keys } from './api'

export default function useAppHook() {
  const ctx = useContext(ThemeContext)
  const { data, isLoading, mutate } = useSWR(keys.TABLE_DATA, latestDataQuery)

  useWebSocket(import.meta.env.VITE_SOCKET_URL, {
    onMessage(e) {
      try {
        const newData = JSON.parse(e.data)

        mutate((prev) => {
          if (!prev) return prev
          const prevCopy = Array.from(prev)
          const target = prevCopy.find((item) => item.id === newData.id)
          if (!target) return prev
          prevCopy.splice(prevCopy.indexOf(target), 1, newData)
          return prevCopy
        })
      } catch (e) {
        console.log(e)
      }
    },
  })

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'آیدی', flex: 1 },
      { field: 'buyer', headerName: 'خریدار', flex: 1 },
      { field: 'price', headerName: 'قیمت', flex: 1 },
      { field: 'vol', headerName: 'مقدار', flex: 1 },
    ],
    []
  )

  const downloadCsv = useCallback(() => {
    const fileContent = data?.reduce(
      (p, c) => `${p}${c.id}, ${c.buyer}, ${c.price}, ${c.vol}\n`,
      ''
    )
    const link = document.createElement('a')
    const fileBlob = new Blob([fileContent ?? ''], { type: 'text/csv' })

    link.href = URL.createObjectURL(fileBlob)
    link.download = 'output.csv'
    link.click()

    URL.revokeObjectURL(link.href)
  }, [data])

  useEffect(() => {
    console.clear()
  }, [])

  return {
    columns,
    data,
    isLoading,
    switchThemeMode: ctx.switchMode,
    downloadCsv,
  }
}
