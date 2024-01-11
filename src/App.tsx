import { DataGridPro } from '@mui/x-data-grid-pro'
import { AppBar, Box, Switch, Toolbar, Typography } from '@mui/material'
import useAppHook from './AppHook'

function App() {
  const { columns, data, switchThemeMode } = useAppHook()

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

          <Typography>تم دارک</Typography>
          <Switch onChange={(ev) => switchThemeMode(ev.target.checked)} />
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
      </Box>
    </div>
  )
}

export default App
