import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import RouterDecider from './routes'
import { CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <RouterDecider />
      <CssBaseline />
    </BrowserRouter>
  // </StrictMode>,
)
