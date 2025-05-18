import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'

export function Template() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <Header />
      <Box
        sx={{
          px: 6,
          py: 4,
          width: '100%',
          height: '100vh',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
