import useSWR from 'swr'
import useWebSocket from 'react-use-websocket'
import { GridValueFormatterParams } from '@mui/x-data-grid-pro'
import { useCallback, useContext, useEffect, useMemo } from 'react'

import { keys } from './api'
import { ThemeContext } from './contexts/Theme'
import { latestDataQuery } from './api/table-data'

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
      { field: 'buyer', headerName: 'خریدار', flex: 1 },
      {
        field: 'price',
        headerName: 'مبلغ',
        flex: 1,
        valueFormatter: (data: GridValueFormatterParams<number>) => {
          return data.value.toLocaleString('en')
        },
      },
      { field: 'vol', headerName: 'تعداد', flex: 1 },
    ],
    []
  )

  const downloadCsv = useCallback(() => {
    const fileContent =
      'id, buyer, price, volumn\n' +
      data?.reduce(
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
