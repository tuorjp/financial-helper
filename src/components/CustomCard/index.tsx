import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import * as motion from 'motion/react-client'

type CustomCardProps = {
  title?: string,
  text: string,
  route?: string
}

export function CustomCard({ text, route, title }: CustomCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <Box
        sx={{
          boxShadow: 4,
          borderRadius: 1.5,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          cursor: route ? 'pointer' : 'auto',
          background:'#fff'
        }}
        onClick={() => {
          if (route) {
            navigate(route)
          }
        }}
      >
        <Typography variant='h6' mb={2} sx={{ borderBottom: '1px dashed', borderColor: '#94a3b8' }}>
          {title}
        </Typography>
        <Box>
          <Typography variant='body1'>
            {text}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  )
}