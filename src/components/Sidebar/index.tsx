import { Box } from "@mui/material"
import { LinkComponent, type LinkElement } from "./LinkComponent"
import { Article, CreditCard, HouseLine, SignOut, Wallet } from "phosphor-react"
import { useAuthenticationService } from "../../service/AuthenticationService"
import { useUserStore } from "../../context/userStore"
import { useNavigate } from "react-router"

export default function Sidebar() {
  const authService = useAuthenticationService()
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  const links: LinkElement[] = [
    { name: 'Início', route: '/', icon: <HouseLine size={32} color="#f1f5f9" /> },
    { name: 'Entradas', route: 'receipt', icon: <Wallet size={32} color="#f1f5f9" /> },
    { name: 'Saídas', route: 'payment', icon: <CreditCard size={32} color="#f1f5f9" /> },
    { name: 'Categorias', route: 'category', icon: <Article size={32} color="#f1f5f9" /> },
    { name: 'Sair', icon: <SignOut size={32} color="#f1f5f9" />, function: () => authService.logout(setUser, navigate)},
  ]

  return (
    <Box
      component="aside" //semântica de barra lateral
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#9C27B0',
        width: 240,
        flexShrink: 0,
        height: '100vh',
        color: '#f1f5f9',
        p: 2,
      }}
    >
      <LinkComponent links={links} />
    </Box>
  )
}