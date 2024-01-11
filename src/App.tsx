import { useId } from 'react'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { AppBar, Box, Button, Switch, Toolbar, Typography } from '@mui/material'

import useAppHook from './AppHook'

function App() {
  const switchId = useId()
  const { columns, data, switchThemeMode, downloadCsv } = useAppHook()

  return (
    <div dir='rtl'>
      <AppBar position='static' elevation={2} color='inherit'>
        <Toolbar>
          <Typography
            variant='h1'
            fontSize={16}
            component='div'
            sx={{ flexGrow: 1 }}>
            تسک
          </Typography>

          <Typography component='label' htmlFor={switchId}>
            تم دارک
          </Typography>
          <Switch
            id={switchId}
            onChange={(ev) => switchThemeMode(ev.target.checked)}
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
          columns={columns}
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
