import { useId, useContext, useCallback, useRef } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { DataGridPro, GridValueFormatterParams } from '@mui/x-data-grid-pro'
import { AppBar, Box, Button, Switch, Toolbar, Typography } from '@mui/material'
import { ThemeContext } from './contexts'
import { latestDataQuery } from './api/table-data'
import { keys } from './api'
import useWebSocket from 'react-use-websocket'

function App() {
  const switchId = useId()

  const client = useQueryClient()
  const ctx = useContext(ThemeContext)

  const { data } = useQuery({
    queryKey: [keys.TABLE_DATA],
    queryFn: latestDataQuery,
  })

  useWebSocket(import.meta.env.VITE_SOCKET_URL, {
    onMessage(e) {
      try {
        const newData = JSON.parse(e.data)

        client.setQueryData(
          [keys.TABLE_DATA],
          (prev: Awaited<ReturnType<typeof latestDataQuery>>) => {
            if (!prev) return prev
            const prevCopy = Array.from(prev)
            const target = prevCopy.find((item) => item.id === newData.id)
            if (!target) return prev
            prevCopy.splice(prevCopy.indexOf(target), 1, newData)
            return prevCopy
          }
        )
      } catch (e) {
        console.log(e)
      }
    },
  })

  const columns = useRef([
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
  ])

  const downloadCsv = useCallback(() => {
    if (!data) return
    
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

  return (
    <div dir='rtl'>
      <AppBar position='static' elevation={2} color='inherit'>
        <Toolbar>
          <Typography component='h1' sx={{ flexGrow: 1 }}>
            تسک
          </Typography>

          <Typography component='label' htmlFor={switchId}>
            تم دارک
          </Typography>
          <Switch
            id={switchId}
            onChange={(event) => ctx?.switchMode(event.target.checked)}
          />
        </Toolbar>
      </AppBar>
      <Box padding={4} maxWidth={1280} width='100%' mx='auto'>
        <DataGridPro
          rowHeight={42}
          disableColumnFilter
          disableRowSelectionOnClick
          disableColumnPinning
          disableColumnMenu
          disableColumnResize
          localeText={{ footerTotalRows: 'مجموع ردیف ها:' }}
          columnHeaderHeight={42}
          className='rm-license'
          columns={columns.current}
          rows={data ? data : []}
        />

        <Button
          sx={{ mx: 'auto', display: 'block', mt: '1rem' }}
          disabled={!data}
          variant='contained'
          onClick={downloadCsv}>
          دانلود به صورت CSV
        </Button>
      </Box>
    </div>
  )
}

export default App
