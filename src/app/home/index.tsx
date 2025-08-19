import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box mb={5} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant='h4'>
          Bem-vindo ao Ajudante financeiro!!
        </Typography>
      </Box>
    </Box>
  )
}
