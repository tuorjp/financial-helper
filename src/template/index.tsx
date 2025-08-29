import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import BreadcrumbsComponent from '../components/Breadcrumbs'
import Sidebar from './components/Sidebar'
import ConfigBar from './components/ConfigBar'

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
          overflow: 'auto'
        }}
      >
        <ConfigBar />
        <Box sx={{ padding: 4 }}>
          <BreadcrumbsComponent />
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
