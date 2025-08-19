import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import Sidebar from './components/Sidebar'

export function Template() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      <Sidebar />
      <Box
        component={'main'}
        sx={{
          flex: 1,
          height: '100vh',
          overflow: 'auto',
          p: 4, //padding mais convencional (32px)
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
