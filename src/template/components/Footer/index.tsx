import { Box, Typography } from "@mui/material";
import { GithubLogo } from "phosphor-react";

export default function Footer() {
  return (
    <Box
      sx={{
        background: '#9C27B0',
        width: '100%',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>
          Desenvolvido por: João Pedro Leite Marotinho
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
          color: 'inherit',
        }}
        component={'a'}
        href='https://github.com/tuorjp'
        target='_blank'
      >
        <Typography>
          Clique para ver mais projetos!
        </Typography>
        <GithubLogo size={24} />
      </Box>
    </Box>
  )
}