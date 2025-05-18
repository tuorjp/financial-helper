import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router"

export default function Header() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        background: '#5b21b6',
        width: '100%',
        height: 100,
        color: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        px: 4,
      }}
    >
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h3' fontWeight={'bold'}>
          Ajudante Financeiro
        </Typography>
      </Box>

      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flex: 1,
        }}
      >
        <Typography
          variant='h6'
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Entradas/Saídas
        </Typography>
        <Typography
          variant='h6'
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Relatórios
        </Typography>
        <Typography
          variant='h6'
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Categorias
        </Typography>
        <Typography
          variant='h6'
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Conta
        </Typography>
      </Box>
    </Box>
  )
}