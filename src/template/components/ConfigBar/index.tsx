import { Box } from "@mui/material";
import { Gear, IdentificationCard } from "phosphor-react";

export default function ConfigBar() {
  return (
    <Box
      sx={{
        background: '#9C27B0',
        display: 'flex',
        justifyContent: 'end',
        padding: 2,
        gap: 2
      }}
    >
      <Box sx={{ cursor: 'pointer' }}>
        <IdentificationCard size={32} color="#f1f5f9" />
      </Box>
      <Box sx={{ cursor: 'pointer' }}>
        <Gear size={32} color="#f1f5f9" />
      </Box>
    </Box>
  )
}